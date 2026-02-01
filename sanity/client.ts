import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './config'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published', // Only fetch published documents
})

export async function sanityFetch<T>({
  query,
  tags,
}: {
  query: string
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, {}, { 
    next: { 
      tags,
      revalidate: 60 // Revalidate every 60 seconds
    } 
  })
}
