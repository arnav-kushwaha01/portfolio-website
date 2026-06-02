'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { contactLinks } from '@/data/contact'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

// Helper component for the typewriter effect
function RoleTypewriter() {
  const roles = profile.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // If we finished typing a word, pause for 2.2 seconds before starting deletion
    if (subIndex === roles[roleIndex].length + 1 && !isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2200)
    } 
    // If we finished deleting a word, pause for 300ms before starting the next word
    else if (subIndex === 0 && isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 300)
    } 
    // Otherwise, type or delete the next character
    else {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
        setText(roles[roleIndex].substring(0, subIndex + (isDeleting ? -1 : 1)))
      }, isDeleting ? 30 : 65)
    }

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, roleIndex, roles])

  return (
    <span className="inline-flex items-center text-[#22d3ee] font-mono text-lg md:text-xl lg:text-2xl font-bold tracking-wide h-[1.8em]">
      {text}
      <span className="ml-1.5 inline-block w-[3px] h-[0.9em] bg-[#22d3ee] animate-pulse" />
    </span>
  )
}

// Helper component for the HUD elapsed mission timer
function HUDMissionTimer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
    const secs = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  }

  return <span>T+{formatTime(elapsed)}</span>
}

export function HeroSection() {
  // Smooth scroll handler to scroll to About section
  const handleScrollToMission = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const resumeLink = contactLinks.find((l) => l.label === 'Resume')?.href || '/RESUME.pdf'

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-start overflow-hidden px-6 md:px-16 lg:px-24">
      {/* HUD Telemetry Corner Elements */}
      
      {/* Top Left: System Status */}
      <div className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-mono text-[10px] tracking-widest text-[#94a3b8] pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[#22d3ee]">ORBIT STABLE</span>
        </div>
        <div>SYS_VER // 2026.06.02</div>
      </div>

      {/* Top Right: Coordinates (Kanpur, India) */}
      <div className="absolute top-8 right-8 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest text-[#94a3b8] pointer-events-none select-none">
        <div>SECTOR // PROJ_ORBIT</div>
        <div className="text-[#8b5cf6]">LOC // 26.4499° N, 80.3319° E</div>
      </div>

      {/* Bottom Left: Navigation Telemetry */}
      <div className="absolute bottom-8 left-8 hidden md:flex flex-col gap-1 font-mono text-[10px] tracking-widest text-[#94a3b8] pointer-events-none select-none">
        <div>THRUSTERS // ACTIVE (ION_DRIVE)</div>
        <div>VECTOR // INTERCEPTING_ABOUT_PLANET</div>
      </div>

      {/* Bottom Right: Mission Clock */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest text-[#94a3b8] pointer-events-none select-none">
        <div>MISSION_ELAPSED</div>
        <div className="text-[#facc15] font-semibold">
          <HUDMissionTimer />
        </div>
      </div>

      {/* Main Overlay Content */}
      <div className="container-page relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Section Indicator Badge */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(5,7,15,0.45)] backdrop-blur-md mb-6 shadow-glow-plasma/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
              MISSION CONTROL // DEPLOYMENT_ACTIVE
            </span>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-gradient-cosmic tracking-tight font-extrabold pb-3"
          >
            {profile.name}
          </motion.h1>

          {/* Typewriter Subheading */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="mb-4 min-h-[3.2rem]"
          >
            <RoleTypewriter />
          </motion.div>

          {/* Tagline / Subtitle */}
          <motion.p
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-base md:text-lg text-[#cbd5e1] max-w-xl mb-10 text-pretty leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Explore Mission Button */}
            <button
              onClick={handleScrollToMission}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#22d3ee] text-[#05070f] font-semibold text-sm tracking-wide overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] cursor-pointer"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span>Explore Mission</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transform group-hover:translate-y-1 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Download Resume Button */}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel hover:bg-[rgba(255,255,255,0.06)] hover:border-[#67e8f9]/50 text-white font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full flex items-center gap-2.5 transition-all duration-300"
            >
              <span>Download Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="transform group-hover:-translate-y-0.5 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Space on the right side: left empty on purpose so the 3D Hero Planet is fully visible and unobscured */}
        <div className="lg:col-span-5 h-[1px]" />
      </div>

      {/* Mouse / Scroll Wheel Floating Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#94a3b8] uppercase">
          Scroll Down
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#cbd5e1]/40 flex justify-center p-1">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-[#22d3ee]"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </section>
  )
}

