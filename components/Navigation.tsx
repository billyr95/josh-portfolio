'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/videos', label: 'Videos' },
    { href: '/photos', label: 'Photos' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/videos"
            className="text-3xl font-light tracking-tight hover:opacity-70 transition-opacity"
          >
            Josh Gutie
          </Link>
          <div className="flex gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-wide transition-opacity hover:opacity-70"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
