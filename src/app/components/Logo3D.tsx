'use client'

import React, { useRef, useEffect, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model for better performance
useGLTF.preload('/assets/logo-optimized.glb')

// Custom hook to get responsive FOV and DPR based on screen size
function useResponsiveSettings() {
  const [settings, setSettings] = useState({ fov: 50, dpr: 1, isMobile: false });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      
      // Adjust FOV and DPR based on screen width
      if (width < 480) {
        // Mobile phones - wider FOV, lower DPR for performance
        setSettings({ fov: 70, dpr: 1, isMobile: true });
      } else if (width < 768) {
        // Tablets - medium FOV, lower DPR
        setSettings({ fov: 60, dpr: 1, isMobile: true });
      } else if (width < 1200) {
        // Small desktops - standard FOV, moderate DPR
        setSettings({ fov: 50, dpr: 1.5, isMobile: false });
      } else {
        // Large screens - narrower FOV, higher DPR but capped
        setSettings({ fov: 45, dpr: 1.5, isMobile: false });
      }
    };

    // Set initial settings
    updateSettings()

    // Listen for window resize
    window.addEventListener('resize', updateSettings)
    
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  return settings
}

function Model({ onLoad }: { onLoad?: () => void }) {
  // Use useGLTF instead of useLoader for better caching and performance
  const { scene } = useGLTF('/assets/logo-optimized.glb')
  const modelRef = useRef<THREE.Group>(null!)
  
  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => scene.clone(), [scene])

  // Enhanced purple material - optimized for performance
  const optimizedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.2, // Slightly less rough for a bit more shine
      metalness: 0.8, // Slightly more metallic
      color: new THREE.Color(0x7e57c2), // A richer, slightly lighter purple
      envMapIntensity: 1.8, // Increased environment map intensity for more reflection
      emissive: new THREE.Color(0x4a148c), // Deeper purple glow
      emissiveIntensity: 0.15, // Slightly stronger glow
      // Consider adding a normal map here if you have one for more detail
      // normalMap: textureLoader.load('/path/to/your-normal-map.png'), 
      // normalScale: new THREE.Vector2(0.5, 0.5),
    });
  }, []);

  useEffect(() => {
    if (clonedScene) {
      // Optimize geometry and materials
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Apply optimized material
          child.material = optimizedMaterial
          
          // Optimize geometry
          if (child.geometry) {
            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
            
            // Remove unnecessary vertex attributes if present
            if (child.geometry.attributes.uv2) {
              child.geometry.deleteAttribute('uv2')
            }
          }
          
          // Enable frustum culling
          child.frustumCulled = true
          
          // Cast and receive shadows for better performance
          child.castShadow = false
          child.receiveShadow = false
        }
      })
      
      // Scale and position
      clonedScene.scale.set(1.8, 1.8, 0.9) // Slightly reduced scale
      
      const box = new THREE.Box3().setFromObject(clonedScene)
      const center = box.getCenter(new THREE.Vector3())
      clonedScene.position.sub(center)
      
      // Set initial rotation and a slight bend
      // Applying a shear might be too complex without a geometry modifier or direct vertex manipulation.
      // Instead, we'll adjust rotation to give a sense of being slightly off-axis or 'bended'.
      clonedScene.rotation.x = 0.25; // Slightly more tilt on X
      clonedScene.rotation.y = 0.3;
      clonedScene.rotation.z = 0.15; // Add a slight Z rotation for a 'bended' feel

      // For a more pronounced bend, you would typically use a Bend modifier (e.g., from Drei or custom)
      // or directly manipulate vertices, which is more involved.
      // Example of a slight shear if you were to manipulate the matrix directly (more advanced):
      // const shearMatrix = new THREE.Matrix4().makeShear(0.1, 0, 0, 0, 0, 0);
      // clonedScene.applyMatrix4(shearMatrix);
      // Ensure to recompute bounding box if using matrix manipulations that affect it significantly.
      // box.setFromObject(clonedScene); // Recompute box if needed
      // center = box.getCenter(new THREE.Vector3()); // Recenter if needed
      // clonedScene.position.sub(center); // Reapply centering if needed
    }
  }, [clonedScene, optimizedMaterial])

  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const moveThreshold = 16; // roughly 60fps, throttle move events
  const rotationVelocity = useRef({ x: 0, y: 0 }); // To store velocity for inertia
  const dampingFactor = 0.97; // Increased for smoother slowdown

  // Optimize animation with delta time, manual override, and inertia
  useFrame((state, delta) => {
    if (modelRef.current) {
      if (!isDragging) {
        // Apply inertia if there's velocity
        if (Math.abs(rotationVelocity.current.x) > 0.0001 || Math.abs(rotationVelocity.current.y) > 0.0001) {
          modelRef.current.rotation.x += rotationVelocity.current.x;
          modelRef.current.rotation.y += rotationVelocity.current.y;
          rotationVelocity.current.x *= dampingFactor;
          rotationVelocity.current.y *= dampingFactor;
        } else {
          // If velocity is negligible, reset it and apply default rotation
          rotationVelocity.current.x = 0;
          rotationVelocity.current.y = 0;
          modelRef.current.rotation.y += delta * 0.1; // Default slow rotation
        }
      } 
      // Note: Velocity is now set in handlePointerMove and reset in handlePointerDown.
      // This ensures the last drag velocity is used for inertia when dragging stops.
    }
  });

  const handlePointerDown = (event: React.PointerEvent<THREE.Object3D>) => {
    setIsDragging(true);
    previousMousePosition.current = { x: event.clientX, y: event.clientY };
    // Reset velocity when a new drag starts to stop any ongoing inertia
    rotationVelocity.current = { x: 0, y: 0 }; 
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<THREE.Object3D>) => {
    const now = performance.now();
    if (isDragging && modelRef.current && now - lastMoveTime.current > moveThreshold) {
      const timeDelta = now - lastMoveTime.current;
      lastMoveTime.current = now;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;

      const rotationAmountX = deltaY * 0.005;
      const rotationAmountY = deltaX * 0.005;

      modelRef.current.rotation.x += rotationAmountX;
      modelRef.current.rotation.y += rotationAmountY;

      // Calculate velocity for inertia: (change in rotation) / (change in time)
      // Normalize timeDelta to avoid extreme velocities if frames skip
      const normalizedTimeDelta = Math.max(1, timeDelta); // Avoid division by zero or very small numbers
      // Reduced multiplier for less fast initial inertia
      rotationVelocity.current.x = rotationAmountX / normalizedTimeDelta * 10; 
      rotationVelocity.current.y = rotationAmountY / normalizedTimeDelta * 10;

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerUpOrOut = (event: React.PointerEvent<THREE.Object3D>) => {
    if (isDragging) {
      setIsDragging(false);
      (event.target as HTMLElement).releasePointerCapture(event.pointerId);
      // Velocity is already set during pointer move, so inertia will take over
    }
  };

  useEffect(() => {
    if (clonedScene && modelRef.current && typeof onLoad === 'function') {
      // A simple way to check if the model is somewhat ready
      // More robust checks might involve checking if geometry is available
      // or if specific textures are loaded, depending on the model complexity.
      if (modelRef.current.children.length > 0) {
        onLoad();
      }
    }
  }, [clonedScene, onLoad]);

  return (
    <primitive 
      ref={modelRef} 
      object={clonedScene} 
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrOut} // Use combined handler
      onPointerOut={handlePointerUpOrOut} // Use combined handler
      onLostPointerCapture={handlePointerUpOrOut} // Also handle lost pointer capture
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // Change cursor on drag
    />
  );
}

interface Logo3DProps {
  onLoad?: () => void;
}

const Logo3D: React.FC<Logo3DProps> = ({ onLoad }) => {
  const { fov, dpr, isMobile } = useResponsiveSettings();
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: fov }}
        gl={{
          alpha: true,
          antialias: isMobile, // Use isMobile state from hook
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
         dpr={dpr}
         onCreated={({ gl }) => {
           // Limit frame rate for better performance
           gl.setAnimationLoop = (callback) => {
             const fps = 30 // Limit to 30 FPS for smoother performance
             let then = 0
             const animate = (now: number) => {
               if (now - then >= 1000 / fps) {
                 then = now
                 callback?.(now)
               }
               requestAnimationFrame(animate)
             }
             requestAnimationFrame(animate)
           }
         }}
      >
        {/* Optimized lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          castShadow={false} // Disable shadows for better performance
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.3} 
          color="lightblue"
          castShadow={false}
        />

        <Suspense fallback={null}>
          <Environment 
            preset="sunset" 
            background={false}
            resolution={128} // Further reduced for better performance
          />
          <Model onLoad={onLoad} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Logo3D