'use client'

import { motion } from 'framer-motion'
import { certifications } from '@/data/certifications'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(11,16,32,0.45)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
            <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
              CRED_VAULT // ACCESS_GRANTED
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="text-pretty tracking-tight mb-16 text-center"
          >
            Certification <span className="text-gradient-cosmic">Vault</span>
          </motion.h2>

          {/* Grid of Decrypted Credential Keys */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={fadeInUp}
                transition={motionTransitions.smooth}
                className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] hover:border-[#22d3ee]/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.06)] transition-all duration-300 relative group overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between min-h-[220px]"
              >
                {/* Visual horizontal lock beam */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent group-hover:via-[#22d3ee]/55 transition-all duration-300" />

                {/* Card Header Telemetry */}
                <div className="flex items-center justify-between mb-6 font-mono text-[9px] tracking-widest text-[#94a3b8]">
                  <span>VAULT_KEY // CRED_0{index + 1}</span>
                  <span className="text-[#22d3ee] font-semibold">DECRYPTED</span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-[9px] tracking-wider text-[#94a3b8] uppercase flex items-center gap-1.5 mt-2">
                    <span className="h-1 w-1 rounded-full bg-[#22d3ee] animate-ping" />
                    <span>Access: Authorized // verified</span>
                  </div>
                </div>

                {/* Lock/Unlock SVG Icon detail */}
                <div className="flex items-center justify-end mt-6">
                  <div className="p-2 rounded-full border border-white/5 bg-white/[0.02] group-hover:border-[#22d3ee]/30 group-hover:bg-[#22d3ee]/5 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#22d3ee] transform group-hover:scale-110 transition-transform duration-300"
                    >
                      {/* Open lock representing verified access */}
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
