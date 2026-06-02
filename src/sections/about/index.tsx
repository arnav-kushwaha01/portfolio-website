'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Cockpit Biography Log */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(11,16,32,0.45)] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#a78bfa] uppercase">
                LOG_ENTRY // BIOGRAPHY_LOG
              </span>
            </div>

            <h2 className="text-pretty tracking-tight mb-6">
              About the <span className="text-gradient-cosmic">Pilot</span>
            </h2>

            {/* Biographical Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8 font-mono text-[10px] tracking-widest text-[#94a3b8]">
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="text-[#a78bfa] mb-1">STATUS</div>
                <div className="text-white font-bold">ACTIVE // ORBITING</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="text-[#a78bfa] mb-1">QUALIFICATION</div>
                <div className="text-white font-bold">B.TECH STUDENT</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="text-[#a78bfa] mb-1">LOCATION</div>
                <div className="text-white font-bold text-ellipsis overflow-hidden whitespace-nowrap">KANPUR, IND</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="text-[#a78bfa] mb-1">SPECIALIZATION</div>
                <div className="text-white font-bold">FULLSTACK / AI</div>
              </div>
            </div>

            {/* Glassmorphic Biography Box */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.07] bg-[rgba(15,23,42,0.45)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent" />
              
              <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed mb-4 text-pretty">
                I am a Final Year B.Tech student passionate about Full Stack Development, Data Science, Artificial Intelligence, Cybersecurity, and Research.
              </p>
              <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed mb-4 text-pretty">
                I enjoy building scalable web applications, data-driven solutions, and innovative software products that solve real-world problems. My interests include modern web technologies, machine learning, research projects, and interactive user experiences.
              </p>
              <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed text-pretty">
                I am constantly learning and experimenting with new technologies while working on projects that combine creativity with technical excellence.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Animated Biometric Telemetry Scanner */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="w-full max-w-sm aspect-square rounded-2xl border border-white/5 bg-black/20 relative flex items-center justify-center p-6 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Telemetry background grids */}
              <div className="absolute inset-0 opacity-[0.07]" 
                   style={{
                     backgroundImage: 'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }} 
              />
              
              <svg className="w-full h-full relative" viewBox="0 0 200 200">
                {/* 1. Radar Circular Telemetry */}
                <circle cx="100" cy="100" r="80" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="3 3" fill="none" opacity="0.3" />
                <circle cx="100" cy="100" r="60" stroke="#22d3ee" strokeWidth="0.5" fill="none" opacity="0.15" />
                <circle cx="100" cy="100" r="40" stroke="#8b5cf6" strokeWidth="0.5" fill="none" opacity="0.2" />

                {/* 2. Rotating Scanner Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  strokeDasharray="40 180"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />

                {/* 3. Fast Telemetry Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke="#8b5cf6"
                  strokeWidth="0.8"
                  strokeDasharray="10 90"
                  fill="none"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />

                {/* 4. Center pulsing core */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="6"
                  fill="#22d3ee"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* 5. Telemetry text labels */}
                <text x="100" y="32" textAnchor="middle" fill="#22d3ee" fontSize="5" fontFamily="monospace" letterSpacing="1" opacity="0.7">PILOT_BRAIN_WAVES</text>
                <text x="100" y="174" textAnchor="middle" fill="#a78bfa" fontSize="5" fontFamily="monospace" letterSpacing="1" opacity="0.7">STATUS: OPTIMAL</text>
                
                {/* 6. Dynamic Oscilloscope wave inside radar */}
                <motion.path
                  d="M 40 100 Q 55 70 70 100 T 100 100 T 130 100 T 160 100"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  opacity="0.85"
                  animate={{
                    d: [
                      "M 40 100 Q 55 60 70 100 T 100 100 T 130 140 T 160 100",
                      "M 40 100 Q 55 130 70 100 T 100 100 T 130 60 T 160 100",
                      "M 40 100 Q 55 60 70 100 T 100 100 T 130 140 T 160 100"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
              
              {/* Corner HUD Telemetry lines */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
