import { useState } from 'react';
import { Box } from '@react-three/drei';
import { volumeToCubeSize, getCategoryColor } from '../../utils/scaling';
import { VolumeTooltip } from './VolumeTooltip';

/**
 * Energy consumption visualization as cube
 * Renders as an orange cube with equal dimensions
 */
export function EnergyBattery({ volume, position = [-2, 0, 0] }) {
  const [hovered, setHovered] = useState(false);

  if (!volume || volume <= 0) return null;

  // Cube: all dimensions equal
  const size = volumeToCubeSize(volume);
  const color = getCategoryColor('energy');
  
  // Position so bottom of cube is at y=0 (floor level)
  // Cube center needs to be at size/2 to have bottom at y=0
  const floorPosition = [position[0], size / 2, position[2]];
  
  // Tooltip position: above the cube
  const tooltipPosition = [position[0], size + 0.5, position[2]];

  return (
    <group>
      <Box
        position={floorPosition}
        args={[size, size, size]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.8}
          metalness={0.3}
          roughness={0.2}
        />
      </Box>
      
      <VolumeTooltip
        category="energy"
        volume={volume}
        position={tooltipPosition}
        visible={hovered}
      />
    </group>
  );
}

