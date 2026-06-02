'use client'

import { motion } from 'framer-motion'
import { skillsByCategory } from '@/data/skills'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent"
    >
      {/* Background radial nebula highlight */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#22d3ee]/5 blur-[130px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="flex flex-col items-start w-full"
        >
          {/* Section Indicator */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(11,16,32,0.45)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
            <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
              SYS_CHECK // CAPABILITY_CLUSTERS
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-pretty tracking-tight mb-12"
          >
            Systems <span className="text-gradient-cosmic">Capability</span>
          </motion.h2>

          {/* Grid of skill categories */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {skillsByCategory.map((category) => (
              <motion.div
                key={category.label}
                variants={fadeInUp}
                transition={motionTransitions.smooth}
                className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] hover:border-[#22d3ee]/40 transition-all duration-300 relative group overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
              >
                {/* Visual horizontal energy bar */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent transition-all duration-300 group-hover:via-[#22d3ee]/70" />
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 font-mono">
                  <span className="text-[10px] tracking-widest text-[#94a3b8]">
                    SYS_MOD // {category.label.toUpperCase().replace(' ', '_')}
                  </span>
                  <span className="text-[8px] text-[#22d3ee] tracking-widest bg-[#22d3ee]/10 border border-[#22d3ee]/20 px-2 py-0.5 rounded uppercase">
                    online
                  </span>
                </div>

                <h3 className="text-lg font-bold font-sans text-white mb-4 tracking-wide group-hover:text-white">
                  {category.label}
                </h3>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-[#22d3ee]/35 hover:bg-[#22d3ee]/5 text-xs text-[#cbd5e1] hover:text-white font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 select-none"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#22d3ee]/50" />
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
