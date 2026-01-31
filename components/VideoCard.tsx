'use client'

import { useEffect, useRef, useState } from 'react'
import { Video } from '@/lib/types'
import { useInView } from 'react-intersection-observer'

interface VideoCardProps {
  video: Video
  onClick: () => void
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [inView])

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="group relative h-full w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
    >
      <video
        ref={videoRef}
        src={video.previewVideoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!isLoaded && video.thumbnailUrl && (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-light text-sm">{video.title}</h3>
      </div>
    </div>
  )
}
