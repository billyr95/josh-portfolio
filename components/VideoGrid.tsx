'use client'

import { useState, useEffect, useCallback } from 'react'
import { Video } from '@/lib/types'
import VideoCard from './VideoCard'
import VideoModal from './VideoModal'
import { motion } from 'framer-motion'

interface VideoGridProps {
  videos: Video[]
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [displayedCount, setDisplayedCount] = useState(18)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const itemsPerLoad = 6

  // Create infinite looping array
  const getInfiniteVideos = (count: number) => {
    if (videos.length === 0) return []
    const result = []
    for (let i = 0; i < count; i++) {
      result.push(videos[i % videos.length])
    }
    return result
  }

  const displayedVideos = getInfiniteVideos(displayedCount)

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

  // Three different patterns that rotate every 6 items
  const getItemClass = (index: number) => {
    const patternCycle = Math.floor(index / 6) % 3
    const positionInPattern = index % 6

    // Pattern 1: Tall on left
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
    
    // Pattern 2: Tall on right
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
    
    // Pattern 3: Wide on top, tall on left
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
        {displayedVideos.map((video, index) => (
          <motion.div
            key={`${video._id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
            className={getItemClass(index)}
          >
            <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}
