'use client'

import { useEffect, useState } from 'react'
import { Photo } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PhotoModalProps {
  photo: Photo | null
  photos: Photo[]
  onClose: () => void
}

export default function PhotoModal({ photo, photos, onClose }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (photo) {
      const index = photos.findIndex(p => p._id === photo._id)
      setCurrentIndex(index)
      // Mark first image as loaded
      setLoadedImages(new Set([photos[index].imageUrl]))
    }
  }, [photo, photos])

  // Preload adjacent images
  useEffect(() => {
    if (photos.length === 0) return
    
    const preloadImage = (index: number) => {
      const imageUrl = photos[index].imageUrl
      if (loadedImages.has(imageUrl)) return
      
      const img = new window.Image()
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, imageUrl]))
      }
      img.src = imageUrl
    }

    const nextIndex = (currentIndex + 1) % photos.length
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    
    preloadImage(nextIndex)
    preloadImage(prevIndex)
  }, [currentIndex, photos, loadedImages])

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

  const handleNext = () => {
    if (isLoading) return
    
    const nextIndex = (currentIndex + 1) % photos.length
    const nextImageUrl = photos[nextIndex].imageUrl
    
    // If already loaded, transition immediately
    if (loadedImages.has(nextImageUrl)) {
      setDirection(1)
      setCurrentIndex(nextIndex)
      return
    }
    
    // Otherwise show loading spinner and wait
    setIsLoading(true)
    
    const img = new window.Image()
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, nextImageUrl]))
      setDirection(1)
      setCurrentIndex(nextIndex)
      setIsLoading(false)
    }
    img.onerror = () => {
      setDirection(1)
      setCurrentIndex(nextIndex)
      setIsLoading(false)
    }
    img.src = nextImageUrl
  }

  const handlePrevious = () => {
    if (isLoading) return
    
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    const prevImageUrl = photos[prevIndex].imageUrl
    
    // If already loaded, transition immediately
    if (loadedImages.has(prevImageUrl)) {
      setDirection(-1)
      setCurrentIndex(prevIndex)
      return
    }
    
    // Otherwise show loading spinner and wait
    setIsLoading(true)
    
    const img = new window.Image()
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, prevImageUrl]))
      setDirection(-1)
      setCurrentIndex(prevIndex)
      setIsLoading(false)
    }
    img.onerror = () => {
      setDirection(-1)
      setCurrentIndex(prevIndex)
      setIsLoading(false)
    }
    img.src = prevImageUrl
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

          {/* Simple Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

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
                className="absolute max-w-full max-h-full"
              >
                <Image
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.alt || currentPhoto.title}
                  width={3840}
                  height={2160}
                  className="max-w-full max-h-[85vh] md:max-h-[90vh] w-auto h-auto object-contain"
                  quality={100}
                  priority
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
