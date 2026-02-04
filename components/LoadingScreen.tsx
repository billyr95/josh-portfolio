'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const loaded = sessionStorage.getItem('hasLoadedOnce')
    
    if (loaded) {
      setIsLoading(false)
      setHasLoaded(true)
      return
    }

    // Wait for minimum time to show animation (2 seconds) or until page is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('hasLoadedOnce', 'true')
      setTimeout(() => setHasLoaded(true), 1000) // Remove component after fade out
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (hasLoaded) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="relative">
            {/* Main text with stagger animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tight"
            >
              {'Josh Gutie'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.05,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.33, 1, 0.68, 1]
              }}
              className="h-1 bg-black mt-4 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
