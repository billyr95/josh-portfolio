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
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const itemsPerLoad = 12

  useEffect(() => {
    if (videos.length > 0) {
      setDisplayedVideos(videos.slice(0, itemsPerLoad))
    }
  }, [videos])

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
  }, [displayedVideos, videos])

  const loadMore = useCallback(() => {
    if (displayedVideos.length < videos.length) {
      const nextBatch = videos.slice(
        displayedVideos.length,
        displayedVideos.length + itemsPerLoad
      )
      setDisplayedVideos((prev) => [...prev, ...nextBatch])
    }
  }, [displayedVideos, videos])

  // Pattern repeats every 6 videos
  const getItemClass = (index: number) => {
    const pattern = index % 6
    switch (pattern) {
      case 0: // 1ab - tall (col 1, spans 2 rows)
        return 'md:col-span-1 md:row-span-2'
      case 1: // 2a - regular (col 2, row a)
        return 'md:col-span-1 md:row-span-1'
      case 2: // 3a - regular (col 3, row a)
        return 'md:col-span-1 md:row-span-1'
      case 3: // 4a - regular (col 4, row a)
        return 'md:col-span-1 md:row-span-1'
      case 4: // 23b - wide (cols 2-3, row b)
        return 'md:col-span-2 md:row-span-1'
      case 5: // 4b - regular (col 4, row b)
        return 'md:col-span-1 md:row-span-1'
      default:
        return 'md:col-span-1 md:row-span-1'
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4">
        {displayedVideos.map((video, index) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={getItemClass(index)}
          >
            <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
          </motion.div>
        ))}
      </div>

      {displayedVideos.length < videos.length && (
        <div className="text-center mt-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}
