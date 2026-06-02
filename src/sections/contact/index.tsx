'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactLinks } from '@/data/contact'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    // Trigger high-tech simulated signal transmission
    setStatus('transmitting')
    setTimeout(() => {
      setStatus('sent')
      setFormState({ name: '', email: '', message: '' })
      
      // Reset after 4 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 400)
    }, 2000)
  }

  return (
    <section
      id="contact"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Comms coordinates */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Section Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(11,16,32,0.45)] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
                COMMS_DECK // BROADCAST_STATION
              </span>
            </div>

            <h2 className="text-pretty tracking-tight mb-6">
              Mission <span className="text-gradient-cosmic">Control</span>
            </h2>

            <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed mb-8 text-pretty">
              Establish a secure coordinate bridge. Submit your transmission signal via the communications console, or connect directly through active external channels.
            </p>

            {/* Social Transmitter Nodes */}
            <div className="flex flex-col gap-3.5 w-full">
              {contactLinks.map((link) => {
                if (link.label === 'Resume') return null // Skip resume link as it is already in the main hero and navbar CTAs

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:border-[#22d3ee]/40 hover:bg-[#22d3ee]/5 transition-all duration-300 flex items-center justify-between group shadow-[0_4px_18px_rgba(0,0,0,0.15)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]/40 group-hover:bg-[#22d3ee] transition-all" />
                      <span className="font-mono text-[10px] tracking-widest text-[#94a3b8] group-hover:text-white transition-colors uppercase">
                        CHANNEL // {link.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-[#22d3ee] group-hover:underline">
                      CONNECT_LINK
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Transmitter Console Form */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {/* Visual neon outline line */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#22d3ee]/35 to-transparent" />

              <div className="flex items-center justify-between mb-6 font-mono text-[9px] tracking-widest text-[#94a3b8]">
                <span>CONSOLE // SIGNAL_TRANSMITTER</span>
                <span className="text-[#22d3ee] uppercase">
                  STATUS: {status === 'idle' ? 'ready' : status === 'transmitting' ? 'broadcasting' : 'delivered'}
                </span>
              </div>

              {/* Simulated form screen overlay */}
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] tracking-widest text-[#94a3b8] uppercase">
                        Return Identity (Name)
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="ENTER NAME..."
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-[#22d3ee]/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-[#64748b] outline-none transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] tracking-widest text-[#94a3b8] uppercase">
                        Return Vector (Email)
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="ENTER EMAIL COORDINATES..."
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-[#22d3ee]/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-[#64748b] outline-none transition-all"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] tracking-widest text-[#94a3b8] uppercase">
                        Signal Payload (Message)
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="ENTER SIGNAL DATA..."
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-[#22d3ee]/50 focus:bg-white/[0.04] rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-[#64748b] outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full font-mono text-[10px] tracking-[0.2em] font-semibold text-[#05070f] bg-[#22d3ee] border border-transparent py-3.5 rounded-xl hover:bg-transparent hover:text-[#22d3ee] hover:border-[#22d3ee] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
                    >
                      TRANSMIT_SIGNAL
                    </button>
                  </motion.form>
                )}

                {status === 'transmitting' && (
                  <motion.div
                    key="transmitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 font-mono text-center"
                  >
                    {/* Spinning loader */}
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#22d3ee] animate-spin border-t-transparent mb-6" />
                    <div className="text-[#22d3ee] text-xs tracking-widest animate-pulse font-semibold">
                      BROADCASTING_SIGNAL_DECK...
                    </div>
                    <div className="text-[9px] text-[#94a3b8] tracking-widest mt-2 uppercase">
                      Syncing satellite uplink channels
                    </div>
                  </motion.div>
                )}

                {status === 'sent' && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 font-mono text-center"
                  >
                    {/* Pulsing check circle */}
                    <div className="w-12 h-12 rounded-full border border-[#22d3ee] bg-[#22d3ee]/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 h-6 text-[#22d3ee]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-[#22d3ee] text-xs tracking-widest font-semibold mb-2">
                      [ OK ] SIGNAL_TRANSMITTED
                    </div>
                    <div className="text-[9px] text-[#cbd5e1] tracking-widest uppercase">
                      Transmission successfully registered on mission log
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
