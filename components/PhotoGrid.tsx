'use client'

import { useState, useEffect, useCallback } from 'react'
import { Photo } from '@/lib/types'
import PhotoCard from './PhotoCard'
import PhotoModal from './PhotoModal'

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [displayedCount, setDisplayedCount] = useState(18)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const itemsPerLoad = 6

  const getInfinitePhotos = (count: number) => {
    if (photos.length === 0) return []
    const result = []
    for (let i = 0; i < count; i++) {
      result.push(photos[i % photos.length])
    }
    return result
  }

  const displayedPhotos = getInfinitePhotos(displayedCount)

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
  }, [])

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => prev + itemsPerLoad)
  }, [])

  const getItemClass = (index: number) => {
    const patternCycle = Math.floor(index / 6) % 3
    const positionInPattern = index % 6

    if (patternCycle === 0) {
      switch (positionInPattern) {
        case 0: return 'md:col-span-1 md:row-span-2'
        case 1: return 'md:col-span-1 md:row-span-1'
        case 2: return 'md:col-span-1 md:row-span-1'
        case 3: return 'md:col-span-1 md:row-span-1'
        case 4: return 'md:col-span-2 md:row-span-1'
        case 5: return 'md:col-span-1 md:row-span-1'
      }
    }
    
    if (patternCycle === 1) {
      switch (positionInPattern) {
        case 0: return 'md:col-span-1 md:row-span-1'
        case 1: return 'md:col-span-1 md:row-span-1'
        case 2: return 'md:col-span-1 md:row-span-1'
        case 3: return 'md:col-span-1 md:row-span-2'
        case 4: return 'md:col-span-1 md:row-span-1'
        case 5: return 'md:col-span-2 md:row-span-1'
      }
    }
    
    if (patternCycle === 2) {
      switch (positionInPattern) {
        case 0: return 'md:col-span-1 md:row-span-1'
        case 1: return 'md:col-span-2 md:row-span-1'
        case 2: return 'md:col-span-1 md:row-span-1'
        case 3: return 'md:col-span-1 md:row-span-2'
        case 4: return 'md:col-span-1 md:row-span-1'
        case 5: return 'md:col-span-1 md:row-span-1'
      }
    }

    return 'md:col-span-1 md:row-span-1'
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-[5px]">
        {displayedPhotos.map((photo, index) => (
          <div
            key={`${photo._id}-${index}`}
            className={getItemClass(index)}
          >
            <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  )
}
