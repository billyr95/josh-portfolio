import { sanityFetch } from '@/sanity/client'
import { videosQuery } from '@/lib/sanity-queries'
import { Video } from '@/lib/types'
import VideoGrid from '@/components/VideoGrid'

export default async function VideosPage() {
  const videos = await sanityFetch<Video[]>({
    query: videosQuery,
    tags: ['video'],
  })

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <VideoGrid videos={videos} />
      </div>
    </main>
  )
}
