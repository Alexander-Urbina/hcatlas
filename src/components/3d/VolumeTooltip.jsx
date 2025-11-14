import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Tooltip component that displays category name and volume
 * Positioned above the volume on hover
 * Always faces the camera (billboard effect)
 */
export function VolumeTooltip({ category, volume, position, visible }) {
  const groupRef = useRef();

  // Make tooltip always face the camera (billboard effect)
  useFrame((state) => {
    if (groupRef.current && visible) {
      // Get camera position
      const camera = state.camera;
      
      // Get tooltip world position
      const tooltipPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(tooltipPosition);
      
      // Get camera world position
      const cameraPosition = new THREE.Vector3();
      camera.getWorldPosition(cameraPosition);
      
      // Calculate direction from tooltip to camera
      const direction = new THREE.Vector3();
      direction.subVectors(cameraPosition, tooltipPosition).normalize();
      
      // Rotate tooltip to face camera (billboard effect)
      // Only rotate around Y axis to keep it upright
      const yRotation = Math.atan2(direction.x, direction.z);
      groupRef.current.rotation.y = yRotation;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  if (!visible) return null;

  // Format volume value
  const formatVolume = (vol) => {
    if (vol >= 1000) {
      return `${(vol / 1000).toFixed(2)}k m³/year`;
    }
    return `${vol.toFixed(2)} m³/year`;
  };

  // Get category display name
  const categoryNames = {
    water: 'Water',
    energy: 'Energy',
    concrete: 'Concrete',
    food: 'Food',
    waste: 'Waste',
  };

  const categoryName = categoryNames[category] || category;
  const volumeText = formatVolume(volume);

  return (
    <group ref={groupRef} position={position}>
      {/* Background rectangle using a plane - larger size */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[5.0, 1.4]} />
        <meshBasicMaterial color="#000000" opacity={0.8} transparent />
      </mesh>
      
      {/* Category name - larger font */}
      <Text
        position={[0, 0.25, 0.01]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {categoryName}
      </Text>
      
      {/* Volume value - larger font */}
      <Text
        position={[0, -0.25, 0.01]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {volumeText}
      </Text>
    </group>
  );
}

