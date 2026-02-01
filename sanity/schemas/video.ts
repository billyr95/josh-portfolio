export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'previewVideo',
      title: 'Preview Video (3-4 seconds)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Short preview video for the grid (hosted on Sanity)',
    },
    {
      name: 'fullVideoUrl',
      title: 'Full Video Embed URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
      description: 'YouTube or Vimeo embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID or https://player.vimeo.com/video/VIDEO_ID)',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail (fallback)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'byline',
      title: 'Byline',
      type: 'string',
      description: 'Short description or tagline',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Full description or paragraph',
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Upload as many images as you want',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
