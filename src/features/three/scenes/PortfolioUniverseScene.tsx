'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { HeroPlanet } from '@/features/three/objects/HeroPlanet'
import { Spaceship } from '@/features/three/objects/Spaceship'

export function PortfolioUniverseScene() {
  const { viewport } = useThree()
  const dustRef = useRef<THREE.Points>(null)

  // Determine if we are on a smaller screen (tablet / mobile)
  const isMobile = viewport.width < 9.5

  // Generate random space dust particles
  const dustCount = 250
  const dustPositions = useMemo(() => {
    // Deterministic seeded random number generator to ensure purity in render path
    let seed = 42
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    const arr = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      arr[i] = (random() - 0.5) * 25 // X
      arr[i + 1] = (random() - 0.5) * 18 // Y
      arr[i + 2] = (random() - 0.5) * 15 // Z
    }
    return arr
  }, [])

  // Animation frame loop: handles camera entrance, camera parallax, and dust drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { pointer, camera } = state

    // 1. Dust drift animation
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.015
      dustRef.current.rotation.x = t * 0.008
    }

    // 2. Camera entrance + mouse parallax interpolation
    // If we've just mounted, the camera starts at Z = 15 (defined in SceneCanvas)
    // We want to glide it to Z = defaultZ (8.5 on desktop, 10.5 on mobile)
    const targetZ = isMobile ? 11.5 : 8.5
    
    // Parallax intensities (larger scale = more camera movement)
    const parallaxX = pointer.x * (isMobile ? 1.0 : 1.8)
    const parallaxY = pointer.y * (isMobile ? 0.8 : 1.2)

    // Lerp camera position towards the parallax target
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, parallaxY, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03) // slower zoom-in

    // Ensure the camera always looks at the center of our universe
    camera.lookAt(0, 0, 0)
  })

  // Responsive positions and scales for the main 3D objects
  const planetPos: [number, number, number] = isMobile ? [0, -2.6, 0] : [3.4, -0.2, 0]
  const planetScale = isMobile ? 0.85 : 1.1

  const spaceshipPos: [number, number, number] = isMobile ? [0, 2.3, 0] : [-3.5, 0.5, 0]
  const spaceshipScale = isMobile ? 0.7 : 0.95

  return (
    <>
      {/* Background space fog to smoothly fade items in the distance */}
      <fog attach="fog" args={['#05070f', 5, 28]} />

      {/* Ambient Cosmic Light (base exposure) */}
      <ambientLight intensity={0.45} />

      {/* Main Star (Key Light) - Warm yellow sun rays from upper right */}
      <directionalLight
        position={[8, 5, 5]}
        intensity={3.0}
        color="#fde68a"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light - Deep nebula purple light from lower left */}
      <directionalLight
        position={[-6, -4, -3]}
        intensity={2.2}
        color="#a78bfa"
      />

      {/* Backlight / Rim Light - Cyan plasma glow highlighting edges from behind */}
      <directionalLight
        position={[0, 4, -8]}
        intensity={1.8}
        color="#22d3ee"
      />

      {/* 3D Objects */}
      <HeroPlanet position={planetPos} scale={planetScale} />
      <Spaceship position={spaceshipPos} scale={spaceshipScale} />

      {/* Far Background Stars */}
      <Stars
        radius={120}
        depth={60}
        count={3000}
        factor={5}
        saturation={0.6}
        fade
        speed={1.2}
      />

      {/* Close-up drifting space dust for interactive depth */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#22d3ee"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

