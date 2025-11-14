# Quick Start - Deploy to GitHub Pages

## Repository Location
```
~/edu/hcatlas
```

## Steps to Deploy

### 1. Create GitHub Repository
- Name: `hcatlas` (or update base path in `vite.config.js`)
- Public repository (required for free GitHub Pages)
- Don't initialize with README

### 2. Push Code
```bash
cd ~/edu/hcatlas
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[YOUR-USERNAME]/hcatlas.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Repository → Settings → Pages
- Source: **GitHub Actions**
- Save

### 4. Wait for Deployment
- Check Actions tab
- Site will be at: `https://[YOUR-USERNAME].github.io/hcatlas/`

## Done! 🎉

Your visualization will be live in ~3 minutes.

