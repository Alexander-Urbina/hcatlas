import { useState } from 'react';
import { Box } from '@react-three/drei';
import { volumeToCubeSize, getCategoryColor } from '../../utils/scaling';
import { VolumeTooltip } from './VolumeTooltip';

/**
 * Water consumption volume visualization
 * Renders as a blue transparent cube with equal dimensions
 */
export function WaterVolume({ volume, position = [0, 0, 0] }) {
  const [hovered, setHovered] = useState(false);

  if (!volume || volume <= 0) return null;

  // Cube: all dimensions equal
  const size = volumeToCubeSize(volume);
  const color = getCategoryColor('water');
  
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
          opacity={hovered ? 0.9 : 0.7}
          metalness={0.1}
          roughness={0.3}
        />
      </Box>
      
      <VolumeTooltip
        category="water"
        volume={volume}
        position={tooltipPosition}
        visible={hovered}
      />
    </group>
  );
}

