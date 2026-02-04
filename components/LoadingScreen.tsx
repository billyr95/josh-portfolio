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
      setTimeout(() => setHasLoaded(true), 800) // Remove component after fade out
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
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden"
        >
          <div className="relative">
            {/* Text that gets eaten by the circle */}
            <div className="relative overflow-hidden">
              {/* Black text (default state) */}
              <motion.div
                initial={{ opacity: 1 }}
                className="text-5xl md:text-8xl font-extrabold tracking-tight text-black"
              >
                Josh Gutie
              </motion.div>

              {/* White text revealed by expanding black circle */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 15 }}
                  transition={{
                    duration: 2,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.3
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black flex items-center justify-center"
                  style={{
                    filter: 'blur(1px)'
                  }}
                >
                  <div className="text-5xl md:text-8xl font-extrabold tracking-tight text-white whitespace-nowrap">
                    Josh Gutie
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Subtle pulse on the outer edge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 3],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.5,
                times: [0, 0.5, 1]
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-black pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
