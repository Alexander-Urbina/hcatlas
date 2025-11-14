import { WaterVolume } from './WaterVolume';
import { EnergyBattery } from './EnergyBattery';
import { ConcreteBlock } from './ConcreteBlock';
import { FoodStack } from './FoodStack';
import { WastePile } from './WastePile';
import { HumanFigure } from './HumanFigure';
import { volumeToCubeSize } from '../../utils/scaling';

/**
 * Complete consumption visualization for a single country
 * Includes human figure and all material volumes
 * 
 * @param {object} countryData - Country consumption data
 * @param {number} index - Index for comparison mode positioning (0 = center)
 * @param {boolean} isComparison - Whether in comparison mode
 * @param {number} startX - X position offset (for internal volume arrangement)
 * @param {number} startZ - Z position offset (for country depth positioning in comparison mode)
 */
export function ConsumptionGroup({ countryData, index = 0, isComparison = false, startX = 0, startZ = 0 }) {
  if (!countryData || !countryData.volumes) return null;

  const volumes = countryData.volumes;
  
  // Arrange all volumes in a line on the same plane (floor)
  // Order: human, food, waste, concrete, energy, water
  const minSpacing = 0.3; // Minimum gap between objects
  
  // Base widths:
  // Food & Waste: baseWidth = 0.50, half-width = 0.25
  // Concrete: baseWidth = 1.0, half-width = 0.5
  // Energy & Water: cubes (size varies by volume)
  const foodWasteHalfWidth = 0.50 / 2; // 0.25
  const concreteHalfWidth = 1.0 / 2; // 0.5
  const humanHalfWidth = 0.25; // Human figure half-width
  
  // Calculate cube sizes for energy and water
  const energySize = volumes.energy ? volumeToCubeSize(volumes.energy) : 0;
  const waterSize = volumes.water ? volumeToCubeSize(volumes.water) : 0;
  const energyHalfWidth = energySize / 2;
  const waterHalfWidth = waterSize / 2;
  
  // Calculate cumulative X positions (all on same Z plane)
  // Start with human at origin, then place each volume to the right
  let currentX = 0;
  
  // Human at origin
  const humanX = currentX;
  currentX += humanHalfWidth;
  
  // Food: after human (baseWidth = 0.50)
  let foodX = null;
  if (volumes.food) {
    currentX += minSpacing;
    foodX = currentX + foodWasteHalfWidth;
    currentX = foodX + foodWasteHalfWidth;
  }
  
  // Waste: after food (baseWidth = 0.50)
  let wasteX = null;
  if (volumes.waste) {
    currentX += minSpacing;
    wasteX = currentX + foodWasteHalfWidth;
    currentX = wasteX + foodWasteHalfWidth;
  }
  
  // Concrete: after waste (baseWidth = 1.0)
  let concreteX = null;
  if (volumes.concrete) {
    currentX += minSpacing;
    concreteX = currentX + concreteHalfWidth;
    currentX = concreteX + concreteHalfWidth;
  }
  
  // Energy: after concrete (cube, size varies)
  let energyX = null;
  if (volumes.energy) {
    currentX += minSpacing;
    energyX = currentX + energyHalfWidth;
    currentX = energyX + energyHalfWidth;
  }
  
  // Water: after energy (last) (cube, size varies)
  let waterX = null;
  if (volumes.water) {
    currentX += minSpacing;
    waterX = currentX + waterHalfWidth;
  }
  
  // Calculate position offset
  // In comparison mode, countries are positioned along Z-axis (one behind the other)
  // Internal volumes are still arranged along X-axis within each country
  const basePosition = [startX, 0, startZ];
  
  // Debug log for comparison mode
  if (isComparison) {
    const totalWidth = currentX + (volumes.water ? waterHalfWidth : 0);
    console.log(`ConsumptionGroup ${countryData.code}: startX=${startX.toFixed(2)}, startZ=${startZ.toFixed(2)}, totalWidth=${totalWidth.toFixed(2)}`);
  }

  return (
    <group position={basePosition}>
      {/* Human figure */}
      <HumanFigure 
        position={[humanX, 0, 0]} 
        label={countryData.code}
      />

      {/* Consumption volumes in line: human, food, waste, concrete, energy, water */}
      {foodX !== null && (
        <FoodStack 
          volume={volumes.food}
          position={[foodX, 0, 0]}
        />
      )}

      {wasteX !== null && (
        <WastePile 
          volume={volumes.waste}
          position={[wasteX, 0, 0]}
        />
      )}

      {concreteX !== null && (
        <ConcreteBlock 
          volume={volumes.concrete}
          position={[concreteX, 0, 0]}
        />
      )}

      {energyX !== null && (
        <EnergyBattery 
          volume={volumes.energy}
          position={[energyX, 0, 0]}
        />
      )}

      {waterX !== null && (
        <WaterVolume 
          volume={volumes.water}
          position={[waterX, 0, 0]}
        />
      )}
    </group>
  );
}

