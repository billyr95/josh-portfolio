'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/videos', label: 'Videos' },
    { href: '/photos', label: 'Photos' },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 p-8 z-50 hidden md:flex flex-col"
      >
        <Link
          href="/videos"
          className="text-2xl font-light tracking-tight hover:opacity-70 transition-opacity mb-12"
        >
          Josh Gutie
        </Link>

        <div className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-base font-light tracking-wide transition-opacity hover:opacity-70 ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-6 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/videos"
            className="text-xl font-light tracking-tight"
            onClick={closeMenu}
          >
            Josh Gutie
          </Link>

          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-black block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-black block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-black block"
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`text-lg font-light tracking-wide transition-opacity hover:opacity-70 ${
                        isActive ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
