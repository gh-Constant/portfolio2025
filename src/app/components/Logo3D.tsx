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
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef({ x: 0, y: 0 }); // Changed to 2D for more complex scroll effects
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const dampingFactor = 0.98; // Increased for stronger inertia
  const scrollDampingFactor = 0.97; // Stronger scroll inertia
  const velocityMultiplier = useRef(1); // Dynamic multiplier for enhanced effects

  // Enhanced scroll event listener with stronger inertia
  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const timeDelta = now - lastScrollTime.current;
      
      // Calculate enhanced scroll velocity with momentum
      const instantVelocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;
      const velocityScale = 0.003; // Increased for stronger effect
      
      // Apply momentum with stronger inertia
      const newVelocityY = instantVelocity * velocityScale;
      const newVelocityX = instantVelocity * velocityScale * 0.3; // Cross-axis effect
      
      // Preserve momentum with less smoothing for stronger inertia
      scrollVelocity.current.y = scrollVelocity.current.y * 0.9 + newVelocityY * 0.1;
      scrollVelocity.current.x = scrollVelocity.current.x * 0.9 + newVelocityX * 0.1;
      
      // Dynamic velocity multiplier based on scroll speed
      const scrollSpeed = Math.abs(scrollDelta);
      velocityMultiplier.current = Math.min(3, 1 + scrollSpeed * 0.01);
      
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced animation with stronger inertia and momentum physics
  useFrame((state, delta) => {
    if (modelRef.current) {
      const baseRotationSpeed = 0.8; // Increased base speed
      const dynamicSpeed = baseRotationSpeed * velocityMultiplier.current;
      
      if (!isDragging) {
        // Apply enhanced scroll-based rotation with stronger inertia
        const scrollThreshold = 0.00005; // Lower threshold for more sensitive detection
        if (Math.abs(scrollVelocity.current.y) > scrollThreshold || Math.abs(scrollVelocity.current.x) > scrollThreshold) {
          // Primary Y-axis rotation from vertical scroll
          modelRef.current.rotation.y += scrollVelocity.current.y * dynamicSpeed;
          // Secondary X-axis rotation for more dynamic movement
          modelRef.current.rotation.x += scrollVelocity.current.y * dynamicSpeed * 0.4;
          // Cross-axis rotation for complex movement
          modelRef.current.rotation.z += scrollVelocity.current.x * dynamicSpeed * 0.2;
          
          // Apply stronger damping for longer-lasting inertia
          scrollVelocity.current.y *= scrollDampingFactor;
          scrollVelocity.current.x *= scrollDampingFactor;
        }
        
        // Apply enhanced mouse drag inertia with momentum preservation
        const dragThreshold = 0.00005;
        if (Math.abs(rotationVelocity.current.x) > dragThreshold || Math.abs(rotationVelocity.current.y) > dragThreshold) {
          // Apply rotation with enhanced momentum
          modelRef.current.rotation.x += rotationVelocity.current.x * dynamicSpeed * 1.5;
          modelRef.current.rotation.y += rotationVelocity.current.y * dynamicSpeed * 1.5;
          
          // Add subtle secondary rotations for more natural movement
          modelRef.current.rotation.z += (rotationVelocity.current.x + rotationVelocity.current.y) * 0.1;
          
          // Stronger damping for longer inertia
          rotationVelocity.current.x *= dampingFactor;
          rotationVelocity.current.y *= dampingFactor;
        } else if (Math.abs(scrollVelocity.current.y) <= scrollThreshold && Math.abs(scrollVelocity.current.x) <= scrollThreshold) {
          // Gentle auto-rotation when no inertia is active
          rotationVelocity.current.x = 0;
          rotationVelocity.current.y = 0;
          modelRef.current.rotation.y += delta * baseRotationSpeed * 0.3; // Slower auto-rotation
        }
        
        // Gradually reduce velocity multiplier
        velocityMultiplier.current = Math.max(1, velocityMultiplier.current * 0.99);
      }
    }
  });

  const handlePointerDown = (event: React.PointerEvent<THREE.Object3D>) => {
    setIsDragging(true);
    previousMousePosition.current = { x: event.clientX, y: event.clientY };
    // Preserve some existing velocity for smoother transitions
    rotationVelocity.current.x *= 0.3; // Reduce but don't completely reset
    rotationVelocity.current.y *= 0.3;
    scrollVelocity.current.x *= 0.3; // Reduce scroll velocity but maintain some momentum
    scrollVelocity.current.y *= 0.3;
    velocityMultiplier.current = Math.max(1.5, velocityMultiplier.current); // Boost for interaction
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<THREE.Object3D>) => {
    if (isDragging && modelRef.current) {
      // Calculate mouse movement delta
      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;
      
      // Calculate time since last move for velocity
      const now = performance.now();
      const timeDelta = now - lastScrollTime.current;
      const timeMultiplier = Math.min(1, timeDelta / 16); // Normalize to 60fps
      
      // Enhanced sensitivity with dynamic scaling
      const sensitivity = 0.003 * velocityMultiplier.current;
      const rotationAmountX = deltaY * sensitivity;
      const rotationAmountY = deltaX * sensitivity;
      
      // Apply immediate rotation
      modelRef.current.rotation.x += rotationAmountX;
      modelRef.current.rotation.y += rotationAmountY;
      
      // Calculate velocity with momentum accumulation
      // Blend previous velocity with new velocity for smoother transitions
      const momentumFactor = 0.8; // Higher value = more momentum preservation
      rotationVelocity.current.x = rotationVelocity.current.x * momentumFactor + 
                                  (rotationAmountX / timeMultiplier) * (1 - momentumFactor);
      rotationVelocity.current.y = rotationVelocity.current.y * momentumFactor + 
                                  (rotationAmountY / timeMultiplier) * (1 - momentumFactor);
      
      // Add subtle cross-axis effect for more natural movement
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement dominates - add subtle vertical component
        rotationVelocity.current.x += rotationAmountY * 0.2;
      } else {
        // Vertical movement dominates - add subtle horizontal component
        rotationVelocity.current.y += rotationAmountX * 0.2;
      }
      
      // Boost velocity multiplier based on movement speed
      const moveSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      velocityMultiplier.current = Math.min(3, velocityMultiplier.current + moveSpeed * 0.005);
      
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
      lastScrollTime.current = now; // Reuse the scroll time ref for mouse movement timing
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
        frameloop="always"
        gl={{
          alpha: true,
          antialias: isMobile,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        dpr={dpr}
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