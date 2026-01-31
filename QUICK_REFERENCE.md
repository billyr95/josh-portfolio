# Quick Reference Guide

## 📍 Location
```
/Users/billy/Documents/GitHub/josh-portfolio
```

## ⚡ Quick Commands
```bash
# Install everything
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Deploy to Vercel
vercel

# Run linter
npm run lint
```

## 🔑 Environment Variables

Create `.env.local` in root:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 📝 File Locations

### Pages
- Videos: `app/videos/page.tsx`
- Photos: `app/photos/page.tsx`
- Contact: `app/contact/page.tsx`

### Components
- All in `components/` folder
- Navigation: `components/Navigation.tsx`
- Modals: `components/VideoModal.tsx`, `components/PhotoModal.tsx`

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`

### Sanity
- Config: `sanity/config.ts`
- Client: `sanity/client.ts`
- Schemas: `sanity/schemas/`

## 🎨 Common Customizations

### Change grid columns
```tsx
// In VideoGrid.tsx or PhotoGrid.tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                         ↑ tablet  ↑ desktop
```

### Change animation speed
```tsx
// In any component with Framer Motion
transition={{ duration: 0.3 }}
//                       ↑ change this
```

### Change items loaded per batch
```tsx
// In VideoGrid.tsx or PhotoGrid.tsx
const itemsPerLoad = 12  // ← change this
```

### Change nav links
```tsx
// In Navigation.tsx
const links = [
  { href: '/videos', label: 'Videos' },
  { href: '/photos', label: 'Photos' },
  { href: '/contact', label: 'Contact' },
]
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)
```

### Dependencies issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

### Sanity connection issues
1. Check `.env.local` exists and has correct values
2. Restart dev server after adding env vars
3. Check CORS settings in Sanity dashboard

## 📊 Project Stats

- **Total Files**: ~30 TypeScript/TSX files
- **Components**: 9 reusable React components
- **Pages**: 3 main pages + home redirect
- **Dependencies**: 15 main packages
- **TypeScript**: Fully typed
- **Lines of Code**: ~1500+

## 🚀 Deployment Steps

1. **Push to GitHub**:
```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to vercel.com
   - Import repository
   - Add environment variables
   - Deploy

3. **Post-Deployment**:
   - Test all pages
   - Check mobile responsiveness
   - Verify videos and images load
   - Test contact form

## 📱 Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Video previews autoplay
- [ ] Videos open in modal
- [ ] Photos open in modal
- [ ] Infinite scroll works
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] No console errors

## 🔗 Important URLs

- **Local dev**: http://localhost:3000
- **Sanity manage**: https://sanity.io/manage
- **Vercel dashboard**: https://vercel.com/dashboard
- **GitHub repo**: (your repo URL)

## 💾 Backup Strategy
```bash
# Create a backup
cd /Users/billy/Documents/GitHub
tar -czf josh-portfolio-backup-$(date +%Y%m%d).tar.gz josh-portfolio/

# Restore from backup
tar -xzf josh-portfolio-backup-YYYYMMDD.tar.gz
```

## 📞 Support Resources

- Next.js: https://nextjs.org/docs
- Sanity: https://sanity.io/docs
- Framer Motion: https://framer.com/motion
- Tailwind: https://tailwindcss.com/docs
- Vercel: https://vercel.com/docs

## 🎯 Success Checklist

- [ ] Project created in correct location
- [ ] Dependencies installed
- [ ] Sanity project set up
- [ ] Environment variables configured
- [ ] Content added to Sanity
- [ ] Local development working
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Custom domain configured (if applicable)
- [ ] Tested all features

You're all set! 🎉
