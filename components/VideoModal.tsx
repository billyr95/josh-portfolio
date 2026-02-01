'use client'

import { useEffect, useRef } from 'react'
import { Video } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="sticky top-0 float-right z-10 text-white hover:text-gray-300 transition-colors text-4xl font-light leading-none bg-black/50 rounded-full w-10 h-10 flex items-center justify-center -mr-2 -mt-2"
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Video */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={video.fullVideoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">{video.title}</h1>

                {/* Byline */}
                {video.byline && (
                  <p className="text-gray-600 text-lg font-light mb-6">
                    {video.byline}
                  </p>
                )}

                {/* Description */}
                {video.description && (
                  <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
                    {video.description}
                  </p>
                )}

                {/* Images */}
                {video.images && video.images.length > 0 && (
                  <div className="space-y-6">
                    {video.images.map((image, index) => (
                      <div key={index} className="relative w-full">
                        <Image
                          src={image.url}
                          alt={image.alt || `Image ${index + 1}`}
                          width={1200}
                          height={800}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
