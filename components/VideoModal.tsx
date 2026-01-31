'use client'

import { useEffect, useRef } from 'react'
import { Video } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoModalProps {
  video: Video | null
  onClose: () => void
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.play()
    }
  }, [video])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (video) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-4xl font-light leading-none"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={video.fullVideoUrl}
                controls
                controlsList="nodownload"
                className="w-full h-full"
              />
            </div>
            <h2 className="text-white text-center mt-4 text-lg font-light">
              {video.title}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
