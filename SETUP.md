# Quick Setup Guide

## Repository Location

The repository is located at: `~/edu/hcatlas`

## Next Steps to Deploy

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `hcatlas`
   - Description: "Human Consumption Atlas - 3D Visualization"
   - Visibility: Public (required for free GitHub Pages)
   - **Don't** initialize with README, .gitignore, or license

2. **Push to GitHub**
   ```bash
   cd ~/edu/hcatlas
   git add .
   git commit -m "Initial commit: Human Consumption Atlas"
   git branch -M main
   git remote add origin https://github.com/[YOUR-USERNAME]/hcatlas.git
   git push -u origin main
   ```
   Replace `[YOUR-USERNAME]` with your GitHub username.

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - Click **Save**

4. **Wait for Deployment**
   - Go to **Actions** tab
   - Wait for workflow to complete (usually 2-3 minutes)
   - Your site will be live at: `https://[YOUR-USERNAME].github.io/hcatlas/`

## If Repository Name is Different

If you use a different repository name (not `hcatlas`):

1. Edit `vite.config.js`
2. Change `/hcatlas/` to `/[your-repo-name]/`
3. Save and commit

## Testing Locally

Before deploying, test locally:

```bash
cd ~/edu/hcatlas
npm install
npm run dev
```

Visit http://localhost:5173 to test.

## Files Included

- ✅ All source code
- ✅ Consumption data (242 countries)
- ✅ 3D models
- ✅ GitHub Actions workflow
- ✅ Configuration files

## Need Help?

See `DEPLOYMENT.md` for detailed deployment instructions.

