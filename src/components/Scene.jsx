import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import { ConsumptionGroup } from './3d/ConsumptionGroup';
import { volumeToCubeSize } from '../utils/scaling';

/**
 * Calculate maximum depth (Z-axis extent) of a country's volumes
 * This accounts for cubes (water, energy) which extend in all directions
 */
function calculateCountryMaxDepth(volumes) {
  if (!volumes) return 0;
  
  // Calculate cube sizes
  const waterSize = volumes.water ? volumeToCubeSize(volumes.water) : 0;
  const energySize = volumes.energy ? volumeToCubeSize(volumes.energy) : 0;
  
  // Fixed depths for other volumes
  const foodWasteDepth = 0.25; // baseDepth for food/waste
  const concreteDepth = 0.25; // baseDepth for concrete
  
  // Maximum depth is the largest cube size (since cubes extend equally in all directions)
  // or the fixed depths for rectangular volumes
  const maxCubeSize = Math.max(waterSize, energySize);
  const maxFixedDepth = Math.max(foodWasteDepth, concreteDepth);
  
  return Math.max(maxCubeSize, maxFixedDepth);
}

/**
 * Main 3D scene component
 * Supports both single country view and comparison mode (multiple countries in same scene)
 * 
 * @param {object|Array} countryData - Single country object or array of countries for comparison
 */
export function Scene({ countryData }) {
  // Determine if we're in comparison mode
  const isComparison = Array.isArray(countryData) && countryData.length > 1;
  const countries = isComparison ? countryData : [countryData].filter(Boolean);
  
  // Calculate Z positions for depth stacking
  // Countries are placed one behind the other along the Z-axis
  // Gap must account for the maximum depth of volumes (especially water cubes)
  const minGap = 1.0; // Minimum gap between countries
  const countryZPositions = [];
  
  if (isComparison && countries.length > 0) {
    let currentZ = 0;
    
    countries.forEach((country, idx) => {
      countryZPositions.push(currentZ);
      
      // Calculate maximum depth of this country's volumes
      // This represents how far the volumes extend backward (negative Z) from the country center
      const maxDepth = calculateCountryMaxDepth(country.volumes);
      
      // Calculate gap for next country (if exists)
      // Gap must account for:
      // 1. How far back the current country's volumes extend (maxDepth/2, since cubes are centered)
      // 2. How far forward the next country's volumes extend (nextMaxDepth/2)
      // 3. Minimum gap between them
      if (idx < countries.length - 1) {
        const nextMaxDepth = calculateCountryMaxDepth(countries[idx + 1].volumes);
        // Gap = minGap + half of current country's max depth + half of next country's max depth
        // This ensures no overlap between the back edge of current and front edge of next
        const gap = minGap + (maxDepth / 2) + (nextMaxDepth / 2);
        currentZ -= gap;
      }
      
      // Debug log
      console.log(`Country ${idx} (${country.code}): startZ=${countryZPositions[idx].toFixed(2)}, maxDepth=${maxDepth.toFixed(2)}`);
    });
  }

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: '#f0f0f0' }}
      camera={{ position: [0, 1.6, 8], fov: 50 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />

      {/* Grid floor for reference - positioned at y=0 (floor level) */}
      <Grid
        args={[20, 20]}
        cellColor="#cccccc"
        sectionColor="#888888"
        cellThickness={0.5}
        sectionThickness={1}
        fadeDistance={25}
        fadeStrength={1}
        position={[0, 0, 0]}
      />

      {/* Render consumption groups */}
      {countries.map((country, index) => (
        <ConsumptionGroup
          key={country.code || index}
          countryData={country}
          index={index}
          isComparison={isComparison}
          startX={0}
          startZ={isComparison ? countryZPositions[index] : 0}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

