export interface Video {
  _id: string
  title: string
  slug: { current: string }
  previewVideoUrl: string
  fullVideoUrl: string
  thumbnailUrl?: string
  order: number
}

export interface Photo {
  _id: string
  title: string
  slug: { current: string }
  imageUrl: string
  alt?: string
  order: number
}
