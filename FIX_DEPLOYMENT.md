# Fix: GitHub Pages Serving Wrong Files

## Issue
The browser is loading `/src/main.jsx` (source file) instead of `/hcatlas/assets/index-*.js` (built file).

## Root Cause
GitHub Pages might be configured to serve from a branch instead of GitHub Actions, or the workflow hasn't completed successfully.

## Solution

### Step 1: Verify GitHub Pages Settings

1. Go to: https://github.com/Alexander-Urbina/hcatlas/settings/pages
2. Check the **Source** setting:
   - ✅ Should be: **"GitHub Actions"**
   - ❌ If it says: **"Deploy from a branch"** → Change it!

3. If you need to change it:
   - Click the dropdown under "Source"
   - Select **"GitHub Actions"**
   - Click **Save**

### Step 2: Check GitHub Actions Status

1. Go to: https://github.com/Alexander-Urbina/hcatlas/actions
2. Check the latest workflow run:
   - Should show: ✅ Green checkmark (success)
   - If ❌ Red X: Click on it to see errors
   - If ⏳ Yellow circle: Still running, wait for completion

### Step 3: Manually Trigger Rebuild (if needed)

1. Go to: https://github.com/Alexander-Urbina/hcatlas/actions
2. Click on "Deploy to GitHub Pages" workflow
3. Click **"Run workflow"** button (top right)
4. Select branch: **main**
5. Click **"Run workflow"**
6. Wait 2-3 minutes for completion

### Step 4: Clear Browser Cache

After deployment completes:
- **Hard refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or use **Incognito/Private** window
- Or clear browser cache completely

## Verification

After fixing, check the page source:
1. Right-click on the page → **View Page Source**
2. Look for the script tag:
   - ✅ **Correct**: `<script src="/hcatlas/assets/index-*.js"></script>`
   - ❌ **Wrong**: `<script src="/src/main.jsx"></script>`

## Expected Files Structure

When correctly deployed, GitHub Pages should serve:
```
/hcatlas/
  ├── index.html          (built, with /hcatlas/assets/ paths)
  ├── assets/
  │   ├── index-*.js      (compiled JavaScript)
  │   └── index-*.css     (compiled CSS)
  ├── models/
  │   └── low_poly_male_base.glb
  └── vite.svg
```

## If Still Not Working

1. Check GitHub Actions logs for build errors
2. Verify Node.js version (should be 18+)
3. Check if `dist` folder is being created correctly in the workflow
4. Verify the workflow is uploading the correct `dist` folder

