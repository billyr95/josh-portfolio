# Setup Instructions for Josh Gutie Portfolio

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Sanity CMS

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in
3. Create a new project
4. Choose a name (e.g., "Josh Portfolio")
5. Copy your Project ID

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Set Up Sanity Studio (Optional but Recommended)

To manage your content, you can set up Sanity Studio:
```bash
npm install -g @sanity/cli
cd ..
sanity init
```

Follow the prompts and use the schemas from `sanity/schemas/` folder.

Or use Sanity's web-based Studio at [sanity.io/manage](https://www.sanity.io/manage)

### 5. Add Content

In your Sanity Studio (web or local):

**For Videos:**
1. Create a new Video document
2. Add title, slug
3. Upload preview video (3-4 seconds, small file size)
4. Upload full video (complete version)
5. Optional: Add thumbnail
6. Set order number

**For Photos:**
1. Create a new Photo document
2. Add title, slug
3. Upload image
4. Add alt text
5. Set order number

### 6. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 7. Deploy to Vercel

#### Option A: Via GitHub
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

#### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Video Format Recommendations

**Preview Videos:**
- Duration: 3-4 seconds
- Format: MP4 (H.264)
- Resolution: 1920x1080 or 1280x720
- File size: < 2MB
- Optimize for web (use tools like HandBrake)

**Full Videos:**
- Format: MP4 (H.264)
- Resolution: 1920x1080 recommended
- Optimize for web

## Troubleshooting

### Videos Not Loading
- Check Sanity CORS settings
- Verify video URLs in Sanity
- Check browser console for errors

### Images Not Displaying
- Verify `next.config.js` has correct Sanity domain
- Check image URLs in Sanity

### Environment Variables Not Working
- Ensure `.env.local` is in root directory
- Restart development server after changes
- Don't commit `.env.local` to Git

## Contact Form Setup

The contact form is currently set up with a simulated submission. To connect it to a real backend:

1. **Use a service like:**
   - Formspree
   - SendGrid
   - Resend
   - Netlify Forms

2. **Update `components/ContactForm.tsx`** with your chosen service's API

## Customization Tips

### Change Colors
Edit `tailwind.config.ts` to customize your color scheme

### Adjust Animation Speed
Edit timing values in Framer Motion components

### Modify Grid Layout
Change grid columns in `VideoGrid.tsx` and `PhotoGrid.tsx`:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Change Items Per Load
In `VideoGrid.tsx` and `PhotoGrid.tsx`, modify:
```tsx
const itemsPerLoad = 12
```

## Need Help?

- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Sanity Docs: [sanity.io/docs](https://www.sanity.io/docs)
- Framer Motion Docs: [framer.com/motion](https://www.framer.com/motion/)
- Tailwind CSS Docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)
