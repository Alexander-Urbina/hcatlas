# Deployment Guide - GitHub Pages

This guide will help you deploy the Human Consumption Atlas to GitHub Pages.

## Quick Start

1. **Create GitHub Repository**
   ```bash
   # On GitHub, create a new repository named "hcatlas"
   # Don't initialize with README, .gitignore, or license
   ```

2. **Push Code to GitHub**
   ```bash
   cd ~/edu/hcatlas
   git add .
   git commit -m "Initial commit: Human Consumption Atlas"
   git branch -M main
   git remote add origin https://github.com/[YOUR-USERNAME]/hcatlas.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - Save

4. **Wait for Deployment**
   - Go to **Actions** tab in your repository
   - Wait for the "Deploy to GitHub Pages" workflow to complete
   - Your site will be available at: `https://[YOUR-USERNAME].github.io/hcatlas/`

## Important: Update Base Path

If your repository name is **NOT** `hcatlas`, you need to update the base path:

1. Edit `vite.config.js`
2. Change `/hcatlas/` to match your repository name
3. For example, if your repo is `consumption-atlas`, change it to `/consumption-atlas/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

## Troubleshooting

### Assets Not Loading

- Check that `vite.config.js` has the correct base path
- Make sure it matches your repository name exactly
- Clear browser cache and try again

### 404 Errors

- Verify GitHub Pages is enabled in repository settings
- Check that the workflow completed successfully
- Ensure the base path in `vite.config.js` matches your repo name

### Build Fails

- Check Node.js version (needs 18+)
- Run `npm install` to ensure dependencies are installed
- Check GitHub Actions logs for specific errors

## Repository Structure

```
hcatlas/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── data/
│   │   └── consumption-data.json  # Consumption data (242 countries)
│   └── ...
├── public/
│   └── models/
│       └── low_poly_male_base.glb  # 3D human figure model
├── vite.config.js              # Vite config with base path
└── package.json                # Dependencies and scripts
```

## After Deployment

Once deployed, your visualization will be accessible at:
- **URL**: `https://[YOUR-USERNAME].github.io/hcatlas/`
- **Calculations Page**: `https://[YOUR-USERNAME].github.io/hcatlas/calculations`

## Updating the Site

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update: [description]"
git push
```

GitHub Actions will automatically rebuild and redeploy the site.

