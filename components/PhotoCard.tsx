'use client'

import { useState } from 'react'
import { Photo } from '@/lib/types'
import Image from 'next/image'

interface PhotoCardProps {
  photo: Photo
  onClick: () => void
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      onClick={onClick}
      className="group relative h-full w-full bg-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Image
        src={photo.imageUrl}
        alt={photo.alt || photo.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
    </div>
  )
}
