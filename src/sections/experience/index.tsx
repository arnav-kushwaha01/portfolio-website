'use client'

import { motion } from 'framer-motion'
import { experienceTimeline } from '@/data/experience'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[140px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="flex flex-col items-center w-full"
        >
          {/* Section Indicator */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(11,16,32,0.45)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#a78bfa] uppercase">
              CHRON_LOG // FLIGHT_RECORD
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-pretty tracking-tight mb-16 text-center"
          >
            Experience <span className="text-gradient-cosmic">Tunnel</span>
          </motion.h2>

          {/* Timeline Tunnel Container */}
          <div className="relative w-full max-w-4xl min-h-[400px]">
            {/* Center Timeline neon line */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#22d3ee] via-[#8b5cf6] to-transparent pointer-events-none" />

            {/* Timeline Items */}
            <div className="flex flex-col gap-12 w-full">
              {experienceTimeline.map((item, index) => {
                const isLeft = index % 2 === 0

                return (
                  <div
                    key={item.company}
                    className={`relative flex flex-col md:flex-row w-full ${
                      isLeft ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Glowing Timeline Connector Node */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#05070f] border-2 border-[#22d3ee] -translate-x-1/2 z-10 flex items-center justify-center top-6 shadow-[0_0_12px_#22d3ee]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                    </div>

                    {/* Staggered Content Card wrapper */}
                    <motion.div
                      variants={fadeInUp}
                      transition={motionTransitions.smooth}
                      className={`w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0 ${
                        isLeft ? 'md:mr-8 md:text-right' : 'md:ml-8 md:text-left'
                      }`}
                    >
                      {/* Experience Glassmorphic Card */}
                      <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] hover:border-[#8b5cf6]/40 transition-all duration-300 relative group shadow-[0_6px_30px_rgba(0,0,0,0.3)]">
                        {/* Decorative side energy marker */}
                        <div
                          className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8b5cf6] to-transparent ${
                            isLeft ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'
                          }`}
                        />

                        {/* Telemetry Header */}
                        <div className={`flex flex-col mb-4 font-mono text-[9px] tracking-widest text-[#94a3b8] ${
                          isLeft ? 'md:items-end' : 'items-start'
                        }`}>
                          <div>LOG // INTERNSHIP_RECORD_0{index + 1}</div>
                          <div className="text-[#a78bfa] font-semibold mt-1">{item.period}</div>
                        </div>

                        {/* Title and Company */}
                        <h3 className="text-lg font-bold text-white mb-1">{item.role}</h3>
                        <h4 className="text-sm font-semibold text-[#22d3ee] mb-4 tracking-wide">{item.company}</h4>

                        {/* Highlights List */}
                        <ul className={`flex flex-col gap-2.5 text-xs text-[#cbd5e1] leading-relaxed text-left list-none p-0 m-0 ${
                          isLeft ? 'md:items-end' : 'items-start'
                        }`}>
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2">
                              <span className="text-[#22d3ee] font-bold font-mono shrink-0 select-none">[OK]</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
