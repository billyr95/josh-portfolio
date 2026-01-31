import { sanityFetch } from '@/sanity/client'
import { videosQuery } from '@/lib/sanity-queries'
import { Video } from '@/lib/types'
import VideoGrid from '@/components/VideoGrid'

export default async function VideosPage() {
  const videos = await sanityFetch<Video[]>({
    query: videosQuery,
    tags: ['video'],
  })

  console.log('Videos fetched:', videos.length)
  console.log('Videos data:', JSON.stringify(videos, null, 2))

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-light text-center mb-12 animate-fade-in">
          Video Portfolio
        </h1>
        {videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos found. Add some in the Studio!</p>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </main>
  )
}
