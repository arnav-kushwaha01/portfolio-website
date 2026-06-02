'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationItems } from '@/config/navigation'

export function Navbar() {
  const [activeId, setActiveId] = useState<string>('#hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // 1. Scroll observer to highlight the active section
  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.replace('#', ''))
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't update active state from observer if we are currently mid-click-scroll
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`)
        }
      })
    }

    const observerOptions = {
      root: null,
      // Target the middle band of the screen for active calculations
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      observer.disconnect()
    }
  }, [])

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Handle smooth scroll clicks manually to disable observer during transit
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      isScrollingRef.current = true
      setActiveId(href)
      setIsMenuOpen(false)

      targetElement.scrollIntoView({
        behavior: 'smooth',
      })

      // Re-enable observer calculations once smooth scroll ends
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false
      }, 900)
    }
  }

  // Animation variants for the mobile menu links
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const

  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 25 } },
  } as const

  return (
    <>
      {/* Floating Desktop & Mobile Header wrapper */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(90vw,1100px)]">
        <nav className="w-full h-16 rounded-full glass-panel flex items-center justify-between px-6 md:px-8 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(34,211,238,0.06)] relative overflow-visible">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group z-10"
          >
            <span className="font-mono text-xs tracking-[0.25em] font-extrabold text-white transition-all group-hover:text-[#22d3ee]">
              AK // ORBIT
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
          </a>

          {/* Desktop Navigation Links (Middle Pill) */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 border border-white/5 py-1 px-1.5 rounded-full relative z-10">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 rounded-full select-none cursor-pointer ${
                  activeId === item.href
                    ? 'text-white font-bold'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {/* Smooth sliding active indicator */}
                {activeId === item.href && (
                  <motion.span
                    layoutId="activePillBubble"
                    className="absolute inset-0 bg-[#22d3ee]/10 border border-[#22d3ee]/30 rounded-full -z-10 shadow-[0_0_12px_rgba(34,211,238,0.12)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Right CTA Button (Desktop only) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:flex font-mono text-[9px] tracking-widest text-[#22d3ee] border border-[#22d3ee]/30 hover:border-[#22d3ee] hover:bg-[#22d3ee]/10 px-4 py-2.5 rounded-full transition-all duration-300 z-10 shadow-[0_0_15px_rgba(34,211,238,0.06)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            ESTABLISH_LINK
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex md:hidden flex-col items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 cursor-pointer relative z-50 focus:outline-none transition-colors hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            <div className="w-4 h-4 flex flex-col justify-between items-center relative">
              <span
                className={`w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white rounded-full transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#05070f]/96 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 relative overflow-hidden"
          >
            {/* Background Decorative Neon Glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#22d3ee]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

            {/* Mobile Navigation Links */}
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 max-w-sm"
            >
              {navigationItems.map((item) => (
                <motion.div key={item.label} variants={menuItemVariants}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-4 group"
                  >
                    <span className="font-mono text-[10px] tracking-widest text-[#94a3b8] transition-colors group-hover:text-[#22d3ee]">
                      0{(navigationItems.indexOf(item) + 1).toString()}
                    </span>
                    <span
                      className={`text-2xl font-bold tracking-wider font-display uppercase transition-colors duration-300 ${
                        activeId === item.href ? 'text-[#22d3ee]' : 'text-white hover:text-[#22d3ee]'
                      }`}
                    >
                      {item.label}
                    </span>
                    {activeId === item.href && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                    )}
                  </a>
                </motion.div>
              ))}

              {/* Mobile Link Resume / Contact button */}
              <motion.div variants={menuItemVariants} className="pt-4 border-t border-white/5 mt-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-flex font-mono text-[10px] tracking-widest text-[#22d3ee] border border-[#22d3ee]/40 bg-[#22d3ee]/5 px-6 py-3 rounded-full transition-all duration-300"
                >
                  ESTABLISH_MISSION_LINK
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
