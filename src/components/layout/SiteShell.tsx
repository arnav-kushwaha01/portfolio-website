'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThreeStage } from '@/components/three/ThreeStage'
import { Navbar } from '@/components/navigation/Navbar'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Immersive Spaceship Systems Boot sequence loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 3D fixed canvas backdrop */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <ThreeStage />
      </div>
      
      {/* Floating navigation system */}
      <Navbar />

      <main className="relative z-10 w-full">{children}</main>
    </div>
  )
}

