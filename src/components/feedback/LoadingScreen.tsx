'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  // 1. Smooth, deterministic progress calculation based on time elapsed
  useEffect(() => {
    const startTime = Date.now()
    const duration = 2800 // 2.8 seconds boot sequence duration
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      
      setProgress(Math.floor(pct))
      
      if (pct >= 100) {
        clearInterval(timer)
      }
    }, 25)

    return () => clearInterval(timer)
  }, [])

  // 2. Trigger onComplete callback shortly after reaching 100%
  useEffect(() => {
    if (progress === 100 && onComplete) {
      const timeout = setTimeout(() => {
        onComplete()
      }, 700) // Pause for readability of the final status and "Welcome Aboard"
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  // Spaceship Systems check logs configuration
  const LOGS = [
    { id: 1, text: 'Initializing Systems...', threshold: 25 },
    { id: 2, text: 'Loading Mission Data...', threshold: 55 },
    { id: 3, text: 'Preparing Navigation...', threshold: 85 },
    { id: 4, text: 'Welcome Aboard', threshold: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(15px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070f] select-none overflow-hidden"
    >
      {/* Background Telemetry Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(34, 211, 238, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial shade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#05070f_100%)] pointer-events-none" />

      {/* 3D Telemetry Radar / Rotating HUD rings */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Outer slow dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-52 h-52 rounded-full border border-dashed border-[#22d3ee]/15"
        />
        {/* Middle counter-rotating segment */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute w-44 h-44 rounded-full border-2 border-dashed border-[#8b5cf6]/25 border-t-transparent border-b-transparent"
        />
        {/* Inner radar scanner sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute w-36 h-36 rounded-full border border-transparent border-r-[#22d3ee]/40"
        />

        {/* Digital Counter Panel */}
        <div className="flex flex-col items-center justify-center font-mono z-10">
          <span className="text-4xl font-extrabold text-[#22d3ee] tracking-widest drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
            {progress.toString().padStart(3, '0')}
          </span>
          <span className="text-[8px] text-[#94a3b8] tracking-[0.25em] uppercase mt-1">
            SEC_BOOT
          </span>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="flex flex-col gap-3 font-mono text-[10px] md:text-[11px] tracking-wider w-72 md:w-80 text-left z-10">
        {LOGS.map((log, idx) => {
          const isCompleted = progress >= log.threshold
          const prevThreshold = idx === 0 ? 0 : LOGS[idx - 1].threshold
          const isActive = progress >= prevThreshold && progress < log.threshold

          let statusSymbol = '[ -- ]'
          let textColor = 'text-[#64748b]' // dim gray
          let statusColor = 'text-[#64748b]'

          if (isCompleted) {
            statusSymbol = '[ OK ]'
            textColor = 'text-[#cbd5e1]'
            statusColor = 'text-[#22d3ee] font-semibold'
          } else if (isActive) {
            statusSymbol = '[ >> ]'
            textColor = 'text-white font-semibold'
            statusColor = 'text-[#facc15] animate-pulse font-semibold'
          }

          return (
            <div
              key={log.id}
              className={`flex items-center gap-3 transition-colors duration-200 ${textColor}`}
            >
              <span className={`w-10 ${statusColor}`}>{statusSymbol}</span>
              <span>{log.text}</span>
            </div>
          )
        })}
      </div>

      {/* Sleek Horizontal Progress Bar */}
      <div className="w-72 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mt-8 relative z-10">
        <div
          className="h-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
