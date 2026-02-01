import { sanityFetch } from '@/sanity/client'
import { photosQuery } from '@/lib/sanity-queries'
import { Photo } from '@/lib/types'
import PhotoGrid from '@/components/PhotoGrid'

export default async function PhotosPage() {
  const photos = await sanityFetch<Photo[]>({
    query: photosQuery,
    tags: ['photo'],
  })

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <PhotoGrid photos={photos} />
      </div>
    </main>
  )
}
