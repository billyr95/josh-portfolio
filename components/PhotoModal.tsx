'use client'

import { useEffect } from 'react'
import { Photo } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PhotoModalProps {
  photo: Photo | null
  onClose: () => void
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (photo) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo && (
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
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-4xl font-light leading-none z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={photo.imageUrl}
                alt={photo.alt || photo.title}
                width={1920}
                height={1080}
                className="max-h-[85vh] w-auto h-auto mx-auto rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h2 className="text-white text-center mt-4 text-lg font-light">
              {photo.title}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
