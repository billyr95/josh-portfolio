export const videosQuery = `*[_type == "video"] | order(order asc) {
  _id,
  title,
  slug,
  "previewVideoUrl": previewVideo.asset->url,
  fullVideoUrl,
  "thumbnailUrl": thumbnail.asset->url,
  byline,
  description,
  "images": images[]{
    "url": asset->url,
    alt
  },
  order
}`

export const photosQuery = `*[_type == "photo"] | order(order asc) {
  _id,
  title,
  slug,
  "imageUrl": image.asset->url,
  alt, 
  order
}`
