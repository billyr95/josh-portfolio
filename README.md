# Josh Gutie Portfolio

A modern, elegant portfolio website built with Next.js 14, Sanity CMS, and Framer Motion.

## Features

- 📹 Video portfolio with autoplay previews and full-screen modal playback
- 📸 Photo gallery with lightbox modal
- 📧 Contact form
- ♾️ Infinite scroll for seamless content browsing
- ✨ Smooth page transitions and animations
- 📱 Fully responsive design
- 🎨 Clean, minimalist UI with soft shadows

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Sanity account and project set up

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd josh-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sanity Setup

### Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Note your Project ID
3. Add it to your `.env.local` file

### Set Up Schemas

The project includes two content types:
- **Video**: For video content with preview and full videos
- **Photo**: For photo gallery images

Import the schemas from `sanity/schemas/` into your Sanity Studio.

### Content Structure

**Videos:**
- Title
- Slug
- Preview Video (3-4 seconds, auto-looping)
- Full Video (complete video for modal)
- Thumbnail (optional fallback)
- Order (for sorting)

**Photos:**
- Title
- Slug
- Image
- Alt Text
- Order (for sorting)

## Deployment to Vercel

### Via GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add your environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
6. Click "Deploy"

## Customization

### Styling

The project uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.ts`.

### Animations

Page transitions and component animations are configured in:
- `components/PageTransition.tsx`
- Individual component files using Framer Motion

### Content Loading

Adjust the number of items loaded per batch in:
- `components/VideoGrid.tsx` (line 14: `itemsPerLoad`)
- `components/PhotoGrid.tsx` (line 14: `itemsPerLoad`)

## Features Breakdown

### Infinite Scroll
- Automatically loads more content as you scroll
- Smooth loading animations
- Performance optimized with intersection observers

### Video Previews
- Auto-play when in viewport
- Pause when out of view
- Click to open full-screen modal

### Modal System
- Elegant fade and scale animations
- Keyboard navigation (ESC to close)
- Click outside to close
- Prevents body scroll when open

### Page Transitions
- Smooth fade and slide effects
- Consistent across all pages
- No layout shift during navigation

## Project Structure
```
josh-portfolio/
├── app/
│   ├── videos/          # Video portfolio page
│   ├── photos/          # Photo gallery page
│   ├── contact/         # Contact form page
│   ├── layout.tsx       # Root layout with navigation
│   ├── page.tsx         # Home page (redirects to videos)
│   └── globals.css      # Global styles
├── components/
│   ├── Navigation.tsx   # Main navigation
│   ├── PageTransition.tsx
│   ├── VideoGrid.tsx
│   ├── VideoCard.tsx
│   ├── VideoModal.tsx
│   ├── PhotoGrid.tsx
│   ├── PhotoCard.tsx
│   ├── PhotoModal.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── types.ts         # TypeScript interfaces
│   └── sanity-queries.ts # GROQ queries
├── sanity/
│   ├── config.ts        # Sanity configuration
│   ├── client.ts        # Sanity client
│   └── schemas/         # Content schemas
└── public/              # Static assets
```

## Performance Optimizations

- Image optimization with Next.js Image component
- Video lazy loading with intersection observer
- Code splitting with Next.js App Router
- Sanity CDN for fast content delivery

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For questions or issues, please open an issue on GitHub or contact Josh directly through the contact form.
