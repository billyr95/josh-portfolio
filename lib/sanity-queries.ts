export const videosQuery = `*[_type == "video"] | order(order asc) {
  _id,
  title,
  slug,
  "previewVideoUrl": previewVideo.asset->url,
  "fullVideoUrl": fullVideo.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
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
