# Netlify Deployment Guide for Sony Headphones

## ✅ Build Completed Successfully!

Your static export has been created in the `sony-headphones/out` folder, optimized for Netlify deployment.

---

## 🚀 Deployment Steps

### Option 1: Manual Deployment (Drag & Drop)

1. **Go to Netlify**: Visit [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. **Drag the `out` folder**: Drag the entire `sony-headphones/out` folder to the drop zone
3. **Wait for deployment**: Netlify will automatically deploy your site
4. **Get your URL**: You'll receive a URL like `https://random-name-123456.netlify.app`

### Option 2: Netlify CLI Deployment

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Navigate to your project
cd sony-headphones

# Deploy to Netlify
netlify deploy --prod --dir=out
```

### Option 3: Connect to Git Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - **Base directory**: `sony-headphones`
   - **Build command**: `NETLIFY=true npm run build`
   - **Publish directory**: `sony-headphones/out`
   - **Environment variables**: `NETLIFY=true`

---

## 📦 What's Included in the Build

✅ **Static HTML/CSS/JS** - Fully optimized production build  
✅ **240 scroll sequence images** - `/sequence/` folder  
✅ **160 lifestyle images** - `/sequence2/` folder  
✅ **All assets** - Fonts, icons, and static files  
✅ **No base path** - Works at root domain (unlike GitHub Pages)  
✅ **Redirects configured** - SPA routing handled by `_redirects` file

---

## 🔧 Build Configuration

The build was created with:
- **Environment**: `NETLIFY=true`
- **Output mode**: Static export
- **Base path**: None (root domain)
- **Images**: Unoptimized (for static hosting)
- **Trailing slash**: Enabled

---

## 🐛 Troubleshooting

### If you see a blank page:

1. **Check browser console** (F12) for errors
2. **Verify images are loading**: Check Network tab for 404 errors
3. **Clear cache**: Hard refresh with Ctrl+Shift+R (or Cmd+Shift+R on Mac)
4. **Check file paths**: Ensure all paths start with `/` not `/AirpodMax/`

### Common Issues:

**Issue**: Images not loading  
**Solution**: Make sure you uploaded the entire `out` folder, including `sequence/` and `sequence2/` subdirectories

**Issue**: Blank page on refresh  
**Solution**: The `_redirects` file should handle this. Verify it exists in the deployed folder.

**Issue**: Styles not loading  
**Solution**: Check that the `_next/` folder was uploaded with all CSS and JS files

---

## 🎨 What Your Site Contains

- **Scrollytelling Experience**: 1200vh of scroll-based animations
- **Two Scroll Sequences**: 
  - Sequence 1: 240 frames (explosion/disassembly)
  - Sequence 2: 160 frames (lifestyle shots)
- **Interactive Elements**:
  - Audio experience component
  - Hotspot interactions
  - Bento grid section
  - Smooth scroll animations
- **Responsive Design**: Works on mobile, tablet, and desktop

---

## 📊 Performance Tips

For optimal performance on Netlify:

1. **Enable Asset Optimization** in Netlify settings
2. **Use Netlify CDN** (automatic)
3. **Enable HTTP/2** (automatic)
4. **Consider image optimization** for faster loading

---

## 🔄 Updating Your Site

To update your deployed site:

1. Make changes to your code
2. Rebuild with: `$env:NETLIFY='true'; npm run build`
3. Re-upload the `out` folder to Netlify

Or set up continuous deployment from Git for automatic updates!

---

## 📝 Next Steps

1. ✅ Upload the `out` folder to Netlify
2. ✅ Test your site on the Netlify URL
3. ✅ Configure a custom domain (optional)
4. ✅ Set up continuous deployment from Git (recommended)

---

**Your build is ready to deploy! 🎉**

The `sony-headphones/out` folder contains everything you need.
