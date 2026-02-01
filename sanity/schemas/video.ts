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
    },
    {
      name: 'fullVideo',
      title: 'Full Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule: any) => Rule.required(),
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
