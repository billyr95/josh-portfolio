export interface Video {
  _id: string
  title: string
  slug: { current: string }
  previewVideoUrl: string
  fullVideoUrl: string
  thumbnailUrl?: string
  byline?: string
  description?: string
  images?: Array<{
    url: string
    alt?: string
  }>
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
