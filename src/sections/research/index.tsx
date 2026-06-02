'use client'

import { motion } from 'framer-motion'
import { researchItems } from '@/data/research'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ResearchSection() {
  const item = researchItems[0] // Single main research area

  return (
    <section
      id="research"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 border-t border-white/[0.04] bg-transparent overflow-hidden"
    >
      {/* Background radial nebula highlight */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Research Specs */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(11,16,32,0.45)] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#a78bfa] uppercase">
                RESRCH_DECK // INTEL_STATION
              </span>
            </div>

            <h2 className="text-pretty tracking-tight mb-6">
              Academic <span className="text-gradient-cosmic">Research</span>
            </h2>

            {/* Research Station Card */}
            {item && (
              <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-[rgba(15,23,42,0.45)] hover:border-[#8b5cf6]/40 transition-all duration-300 relative w-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                {/* Visual horizontal guide */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />

                <div className="flex items-center justify-between mb-4 font-mono text-[9px] tracking-widest text-[#94a3b8]">
                  <span>STATION_MOD // EMOTION_AI</span>
                  <span className="text-[#8b5cf6]">STATUS: PUBLISHING_PIPELINE</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed mb-6 text-pretty">
                  An AI-based research system designed to detect, analyze, and process human emotions dynamically by extracting and fusing features from multimodal inputs (facial expressions and speech signals).
                </p>

                {/* Focus areas tags */}
                <h4 className="font-mono text-[9px] tracking-widest text-[#94a3b8] uppercase mb-3">Research Vectors</h4>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {item.areas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white font-mono text-[10px] tracking-wider transition-colors hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                    >
                      {area.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Mission Objective Section */}
                <div className="p-4 rounded-xl border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.03)] font-mono">
                  <div className="text-[9px] tracking-widest text-[#a78bfa] mb-1 font-semibold">MISSION_OBJECTIVE</div>
                  <div className="text-xs text-white leading-relaxed">{item.goal}</div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: AI Emotion Recognition Scan SVG (Computer Vision Mock) */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="w-full max-w-sm aspect-square rounded-2xl border border-white/5 bg-black/20 relative flex items-center justify-center p-6 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Telemetry coordinate grids */}
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{
                     backgroundImage: 'linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }} 
              />
              
              <svg className="w-full h-full relative" viewBox="0 0 200 200">
                {/* Target crosshair rings */}
                <circle cx="100" cy="100" r="85" stroke="#8b5cf6" strokeWidth="0.5" fill="none" opacity="0.15" />
                <circle cx="100" cy="100" r="75" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="5 15" fill="none" opacity="0.3" />
                
                {/* 1. Stylized face mesh wireframe */}
                {/* Head contour outline */}
                <path d="M 60 70 C 60 40, 140 40, 140 70 C 140 110, 125 150, 100 170 C 75 150, 60 110, 60 70 Z" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.25" />
                
                {/* Eye and eyebrow guides */}
                <path d="M 75 75 Q 85 70 95 75" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
                <path d="M 105 75 Q 115 70 125 75" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
                
                {/* Mouth contour */}
                <motion.path
                  d="M 80 130 Q 100 138 120 130 Q 100 148 80 130"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.2"
                  opacity="0.7"
                  animate={{
                    d: [
                      "M 80 130 Q 100 138 120 130 Q 100 148 80 130", // neutral
                      "M 80 130 Q 100 148 120 130 Q 100 134 80 130", // smile
                      "M 80 130 Q 100 122 120 130 Q 100 142 80 130"  // surprise
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Nose bridge */}
                <path d="M 100 75 L 100 110 L 92 118 L 100 120 L 108 118 L 100 110" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.3" />

                {/* 2. Interactive landmark points (pulsing check nodes) */}
                {/* Left Eye Node */}
                <motion.circle cx="85" cy="80" r="3" fill="#8b5cf6" animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                {/* Right Eye Node */}
                <motion.circle cx="115" cy="80" r="3" fill="#8b5cf6" animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                {/* Nose Tip Node */}
                <motion.circle cx="100" cy="112" r="3" fill="#22d3ee" animate={{ r: [2.5, 3.8, 2.5] }} transition={{ duration: 2, repeat: Infinity }} />
                {/* Mouth corner Left */}
                <motion.circle cx="80" cy="130" r="2.5" fill="#22d3ee" />
                {/* Mouth corner Right */}
                <motion.circle cx="120" cy="130" r="2.5" fill="#22d3ee" />
                {/* Chin Point */}
                <motion.circle cx="100" cy="170" r="2.5" fill="#8b5cf6" />
                
                {/* Wireframe connecting meshes (dotted vectors) */}
                <line x1="85" y1="80" x2="100" y2="112" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <line x1="115" y1="80" x2="100" y2="112" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <line x1="80" y1="130" x2="100" y2="112" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <line x1="120" y1="130" x2="100" y2="112" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <line x1="80" y1="130" x2="100" y2="170" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <line x1="120" y1="130" x2="100" y2="170" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

                {/* Sweep scan bar overlay */}
                <motion.line
                  x1="30"
                  y1="35"
                  x2="170"
                  y2="35"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  opacity="0.6"
                  animate={{ y: [35, 175, 35] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
              
              {/* Telemetry Corner indicators */}
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
