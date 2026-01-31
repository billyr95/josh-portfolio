'use client'

import { useState, useEffect, useCallback } from 'react'
import { Photo } from '@/lib/types'
import PhotoCard from './PhotoCard'
import PhotoModal from './PhotoModal'
import { motion } from 'framer-motion'

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const itemsPerLoad = 12

  useEffect(() => {
    if (photos.length > 0) {
      setDisplayedPhotos(photos.slice(0, itemsPerLoad))
    }
  }, [photos])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedPhotos, photos])

  const loadMore = useCallback(() => {
    if (displayedPhotos.length < photos.length) {
      const nextBatch = photos.slice(
        displayedPhotos.length,
        displayedPhotos.length + itemsPerLoad
      )
      setDisplayedPhotos((prev) => [...prev, ...nextBatch])
    }
  }, [displayedPhotos, photos])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPhotos.map((photo, index) => (
          <motion.div
            key={photo._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
          </motion.div>
        ))}
      </div>

      {displayedPhotos.length < photos.length && (
        <div className="text-center mt-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  )
}
