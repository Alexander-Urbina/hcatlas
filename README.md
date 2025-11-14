# Human Consumption Atlas

Interactive 3D web application visualizing human material consumption patterns across countries.

🌐 **Live Demo**: [View on GitHub Pages](https://[your-username].github.io/hcatlas/)

## Features

- **3D Visualization**: Human figure with proportional consumption volumes
- **5 Consumption Categories**: Water, Energy (battery), Concrete, Food, Waste
- **Country Selection**: Browse 242 countries with consumption data
- **Comparison Mode**: View multiple countries side-by-side in the same scene
- **Interactive Controls**: Rotate, zoom, and pan the 3D scene
- **Data Transparency**: Calculations page showing data sources and methods

## Tech Stack

- **React** - UI framework
- **React Three Fiber** - 3D rendering (Three.js + React)
- **Three.js** - 3D graphics library
- **React Router** - Navigation
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment using GitHub Actions.

### Setup Instructions

1. **Create a GitHub repository** named `hcatlas` (or update the base path in `vite.config.js`)

2. **Push the code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[your-username]/hcatlas.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"
   - The workflow will automatically deploy on push to `main` branch

4. **Update base path** (if repo name is different):
   - Edit `vite.config.js`
   - Change `/hcatlas/` to match your repository name

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Project Structure

```
hcatlas/
├── src/
│   ├── components/      # React components
│   │   ├── 3d/         # 3D visualization components
│   │   ├── ui/         # UI components
│   │   └── Scene.jsx   # Main 3D scene
│   ├── pages/          # Page components
│   ├── hooks/          # React hooks
│   ├── utils/          # Utilities
│   └── data/           # JSON consumption data
├── public/             # Static assets
└── .github/workflows/  # GitHub Actions workflows
```

## Data

Consumption data is loaded from `src/data/consumption-data.json`:
- 242 countries
- 5 consumption categories
- All volumes in m³/capita/year
- Year: 2023

## License

MIT
