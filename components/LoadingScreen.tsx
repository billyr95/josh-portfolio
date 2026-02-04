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

    // Wait for minimum time to show animation (2.5 seconds) or until page is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('hasLoadedOnce', 'true')
      setTimeout(() => setHasLoaded(true), 1000) // Remove component after fade out
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (hasLoaded) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="relative">
            {/* Main text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="text-6xl md:text-9xl font-extrabold tracking-tight"
            >
              {'Josh Gutie'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.08,
                    ease: 'easeOut'
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated line sweep */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                times: [0, 0.3, 0.7, 1],
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 1.2
              }}
              className="absolute -bottom-4 left-0 right-0 h-0.5 bg-black origin-left"
            />

            {/* Minimal dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 1.5 + i * 0.15,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  className="w-2 h-2 rounded-full bg-black"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
