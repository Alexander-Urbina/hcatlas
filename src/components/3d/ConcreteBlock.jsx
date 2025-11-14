import { useState } from 'react';
import { Box } from '@react-three/drei';
import { volumeToHeight, getCategoryColor } from '../../utils/scaling';
import { VolumeTooltip } from './VolumeTooltip';

/**
 * Concrete consumption visualization
 * Renders as gray box with fixed base (1.0 x 0.25) and variable height
 */
export function ConcreteBlock({ volume, position = [2, 0, 0] }) {
  const [hovered, setHovered] = useState(false);

  if (!volume || volume <= 0) return null;

  // Base: 1.0 (width) x 0.25 (depth) - swapped orientation
  const baseWidth = 1.0;
  const baseDepth = 0.25;
  const height = volumeToHeight(volume, baseWidth, baseDepth);
  const color = getCategoryColor('concrete');
  
  // Position so bottom of box is at y=0 (floor level)
  // Box center needs to be at height/2 to have bottom at y=0
  const floorPosition = [position[0], height / 2, position[2]];
  
  // Tooltip position: above the box
  const tooltipPosition = [position[0], height + 0.5, position[2]];

  return (
    <group>
      <Box
        position={floorPosition}
        args={[baseWidth, height, baseDepth]}
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
          opacity={hovered ? 1.0 : 0.9}
          metalness={0.1}
          roughness={0.8}
        />
      </Box>
      
      <VolumeTooltip
        category="concrete"
        volume={volume}
        position={tooltipPosition}
        visible={hovered}
      />
    </group>
  );
}

