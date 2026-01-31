# Sanity Studio Setup Guide

This guide will help you set up Sanity Studio to manage your portfolio content.

## Option 1: Use Sanity's Web Studio (Easiest)

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click your project
3. Navigate to "Desk" in the left sidebar
4. You'll need to manually create the schema in your Sanity project

## Option 2: Local Sanity Studio Setup

### Step 1: Create Sanity Studio Project

In a separate folder (not inside josh-portfolio):
```bash
cd ~/Documents/GitHub
npm create sanity@latest
```

Follow the prompts:
- Project name: `Josh Portfolio Studio`
- Use default dataset: `production`
- Project output path: `josh-portfolio-studio`
- Select project template: `Clean project with no predefined schemas`

### Step 2: Add Schemas

Copy the schema files from `josh-portfolio/sanity/schemas/` to your new studio:
```bash
cp josh-portfolio/sanity/schemas/*.ts josh-portfolio-studio/schemas/
```

### Step 3: Update Studio Configuration

Edit `josh-portfolio-studio/sanity.config.ts`:
```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import video from './schemas/video'
import photo from './schemas/photo'

export default defineConfig({
  name: 'default',
  title: 'Josh Portfolio',
  projectId: 'your_project_id',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [video, photo],
  },
})
```

### Step 4: Run Studio
```bash
cd josh-portfolio-studio
npm run dev
```

Studio will be available at [http://localhost:3333](http://localhost:3333)

## Schema Details

### Video Schema Fields

- **Title**: Display name for the video
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Preview Video**: 3-4 second looping preview (shown in grid)
- **Full Video**: Complete video (shown in modal)
- **Thumbnail**: Optional fallback image
- **Order**: Number for sorting (1, 2, 3, etc.)

### Photo Schema Fields

- **Title**: Display name for the photo
- **Slug**: URL-friendly identifier
- **Image**: The photo file
- **Alt Text**: Accessibility description
- **Order**: Number for sorting

## CORS Configuration

Make sure to add your domain to Sanity's CORS origins:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS Origins"
4. Add:
   - `http://localhost:3000` (for development)
   - Your Vercel domain (for production)

## Content Best Practices

### Videos
- Keep preview videos under 2MB for fast loading
- Use MP4 format with H.264 codec
- Recommended resolution: 1920x1080 or 1280x720
- Number your order fields: 1, 2, 3, 4...

### Photos
- Use high-quality images (Sanity will optimize them)
- Recommended size: 1920x1080 or larger
- Use descriptive alt text for accessibility
- Maintain consistent numbering in order fields

## Querying Content

The portfolio uses these GROQ queries (already set up):
```groq
// Videos
*[_type == "video"] | order(order asc) {
  _id,
  title,
  slug,
  "previewVideoUrl": previewVideo.asset->url,
  "fullVideoUrl": fullVideo.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  order
}

// Photos
*[_type == "photo"] | order(order asc) {
  _id,
  title,
  slug,
  "imageUrl": image.asset->url,
  alt,
  order
}
```

## Troubleshooting

### Can't access Studio
- Check if it's running on port 3333
- Clear browser cache
- Check console for errors

### Content not showing on website
- Verify environment variables in `.env.local`
- Check CORS settings in Sanity
- Restart Next.js dev server

### Upload failures
- Check file sizes (Sanity has limits on free tier)
- Verify file formats (MP4 for video, JPG/PNG for images)
- Check your Sanity plan's usage limits

## Need More Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
