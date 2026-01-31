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
      className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-light text-sm">{photo.title}</h3>
      </div>
    </div>
  )
}
