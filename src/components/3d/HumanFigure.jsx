import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Human figure component using GLB model
 * Loads low-poly male base model from public/models/
 */
export function HumanFigure({ position = [0, 0, 0], label }) {
  const groupRef = useRef();
  const modelRef = useRef();
  
  // Load the GLB model (hooks must be called unconditionally)
  // Use import.meta.env.BASE_URL to handle GitHub Pages base path
  const modelPath = `${import.meta.env.BASE_URL}models/low_poly_male_base.glb`;
  const { scene } = useGLTF(modelPath);

  // Clone and adjust the scene once using useMemo
  const adjustedScene = useMemo(() => {
    if (!scene) return null;
    
    const clonedScene = scene.clone();
    
    // Calculate bounding box to scale and position the model
    try {
      // Update matrix world to ensure bounding box calculation works
      clonedScene.updateMatrixWorld(true);
      
      const box = new THREE.Box3().setFromObject(clonedScene);
      
      if (!box.isEmpty()) {
        const size = box.getSize(new THREE.Vector3());
        
        // Scale to average human height (1.70 meters / 170 cm)
        // Global average: ~1.70m for males, ~1.60m for females
        // Using 1.70m as standard average human height
        const targetHeight = 1.70;
        if (size.y > 0.001) { // Avoid division by zero
          const scaleFactor = targetHeight / size.y;
          clonedScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
          
          // Recalculate bounding box AFTER scaling
          clonedScene.updateMatrixWorld(true);
          const scaledBox = new THREE.Box3().setFromObject(clonedScene);
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
          
          // Position model so feet are at y=0 (after scaling)
          clonedScene.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);
          
          // Log for debugging
          console.log('Model scaled and positioned:', {
            originalHeight: size.y,
            targetHeight,
            scaleFactor,
            finalHeight: scaledBox.getSize(new THREE.Vector3()).y,
            position: clonedScene.position.toArray()
          });
        } else {
          // If size calculation fails, use a reasonable default scale
          clonedScene.scale.set(0.01, 0.01, 0.01);
          console.warn('Model size calculation failed, using default scale');
        }
      } else {
        console.warn('Model bounding box is empty');
        // Use a small default scale
        clonedScene.scale.set(0.01, 0.01, 0.01);
      }
    } catch (error) {
      console.error('Error adjusting model:', error);
      // Use default scale if calculation fails
      clonedScene.scale.set(0.01, 0.01, 0.01);
    }
    
    return clonedScene;
  }, [scene]);

  // Verify model is visible after render
  useEffect(() => {
    if (adjustedScene) {
      // Log model info after render for debugging
      const timer = setTimeout(() => {
        try {
          adjustedScene.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(adjustedScene);
          if (!box.isEmpty()) {
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            console.log('Model after render:', {
              size: size.toArray(),
              center: center.toArray(),
              position: adjustedScene.position.toArray(),
              scale: adjustedScene.scale.toArray(),
              visible: size.y > 0.1 && size.y < 10
            });
          }
        } catch (error) {
          console.error('Error checking model after render:', error);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [adjustedScene]);

  // Simple animation (optional)
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  if (!adjustedScene) {
    return null;
  }

  return (
    <group ref={groupRef} position={position}>
      {/* GLB Model */}
      <primitive 
        ref={modelRef}
        object={adjustedScene}
      />

      {/* Country label (if provided) */}
      {label && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

// Preload the model for better performance
// Note: Preload happens at module level, so we need to handle base path
// import.meta.env.BASE_URL is available at build time
useGLTF.preload(`${import.meta.env.BASE_URL}models/low_poly_male_base.glb`);

