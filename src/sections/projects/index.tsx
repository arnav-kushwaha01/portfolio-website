'use client'

import { motion } from 'framer-motion'
import { featuredProjects } from '@/data/projects'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent"
    >
      {/* Background radial highlight */}
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#22d3ee]/5 blur-[130px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
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
              DEPL_GALAXY // MISSION_FILES
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-pretty tracking-tight mb-12"
          >
            Featured <span className="text-gradient-cosmic">Projects</span>
          </motion.h2>

          {/* Staggered Grid of Project Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={fadeInUp}
                transition={motionTransitions.smooth}
                className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] hover:border-[#22d3ee]/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.08)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {/* Glowing neon corner detail */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] w-12 h-12 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/20 scale-50 group-hover:scale-100 transition-transform duration-500" />
                </div>

                <div>
                  {/* Telemetry Header */}
                  <div className="flex items-center justify-between mb-4 font-mono text-[9px] tracking-widest text-[#94a3b8]">
                    <span>MISSION // {project.slug.toUpperCase().replace('-', '_')}</span>
                    <span className="text-[#22d3ee]">LEVEL_1_VERIFIED</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6 text-pretty">
                    {project.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#22d3ee]/5 border border-[#22d3ee]/15 text-[#22d3ee] font-mono text-[9px] tracking-wider uppercase select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-[1px] bg-white/5 mb-6" />

                  {/* Features Bullet List */}
                  <h4 className="font-mono text-[9px] tracking-widest text-[#94a3b8] uppercase mb-3">Objective Checklist</h4>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0 text-xs text-[#cbd5e1] mb-6">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-[#22d3ee] shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
