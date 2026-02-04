'use client'

import { useEffect, useState } from 'react'
import { Photo } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotoModalProps {
  photo: Photo | null
  photos: Photo[]
  onClose: () => void
}

export default function PhotoModal({ photo, photos, onClose }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (photo) {
      const index = photos.findIndex(p => p._id === photo._id)
      setCurrentIndex(index)
    }
  }, [photo, photos])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && !isLoading) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && !isLoading) {
        handleNext()
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
  }, [photo, isLoading])

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject()
      img.src = url
    })
  }

  const handleNext = async () => {
    if (isLoading) return
    
    const nextIndex = (currentIndex + 1) % photos.length
    const nextImageUrl = photos[nextIndex].imageUrl
    
    // Show loading immediately
    setIsLoading(true)
    
    try {
      // Wait for the next image to fully load
      await preloadImage(nextImageUrl)
      
      // Only AFTER it's loaded, trigger the animation
      setDirection(1)
      setCurrentIndex(nextIndex)
      
      // Small delay for the animation to start, then hide spinner
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
    } catch (error) {
      // Even if image fails, transition anyway
      setDirection(1)
      setCurrentIndex(nextIndex)
      setIsLoading(false)
    }
  }

  const handlePrevious = async () => {
    if (isLoading) return
    
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    const prevImageUrl = photos[prevIndex].imageUrl
    
    // Show loading immediately
    setIsLoading(true)
    
    try {
      // Wait for the previous image to fully load
      await preloadImage(prevImageUrl)
      
      // Only AFTER it's loaded, trigger the animation
      setDirection(-1)
      setCurrentIndex(prevIndex)
      
      // Small delay for the animation to start, then hide spinner
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
    } catch (error) {
      // Even if image fails, transition anyway
      setDirection(-1)
      setCurrentIndex(prevIndex)
      setIsLoading(false)
    }
  }

  const currentPhoto = photos[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <AnimatePresence>
      {photo && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors text-4xl font-light leading-none z-20 w-12 h-12 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            disabled={isLoading}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-20 w-12 h-12 flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-20 w-12 h-12 flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Loading Spinner */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/70"
              >
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPhoto._id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute max-w-full max-h-full flex items-center justify-center"
              >
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.alt || currentPhoto.title}
                  className="max-w-full max-h-[85vh] md:max-h-[90vh] w-auto h-auto object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Title & Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center z-20">
            <h2 className="text-lg font-light mb-1">{currentPhoto.title}</h2>
            <p className="text-sm text-gray-400">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
