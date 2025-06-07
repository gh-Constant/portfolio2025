'use client'

import React, { useRef, useEffect, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model for better performance
useGLTF.preload('/assets/logo-optimized.glb')

// Custom hook to get responsive FOV and DPR based on screen size
function useResponsiveSettings() {
  const [settings, setSettings] = useState({ fov: 50, dpr: 1 })

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      
      // Adjust FOV and DPR based on screen width
      if (width < 480) {
        // Mobile phones - wider FOV, lower DPR for performance
        setSettings({ fov: 70, dpr: 1 })
      } else if (width < 768) {
        // Tablets - medium FOV, lower DPR
        setSettings({ fov: 60, dpr: 1 })
      } else if (width < 1200) {
        // Small desktops - standard FOV, moderate DPR
        setSettings({ fov: 50, dpr: 1.5 })
      } else {
        // Large screens - narrower FOV, higher DPR but capped
        setSettings({ fov: 45, dpr: 1.5 })
      }
    }

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

  // Lightweight purple material - optimized for performance
  const optimizedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.7,
      color: new THREE.Color(0x6a1b9a), // Bright purple base
      envMapIntensity: 1.5,
      // Simple emissive for purple glow without expensive effects
      emissive: new THREE.Color(0x3f1651), // Subtle purple glow
      emissiveIntensity: 0.1,
    })
  }, [])

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
      clonedScene.scale.set(2, 2, 1)
      
      const box = new THREE.Box3().setFromObject(clonedScene)
      const center = box.getCenter(new THREE.Vector3())
      clonedScene.position.sub(center)
      
      // Set initial rotation
      clonedScene.rotation.x = 0.2
      clonedScene.rotation.y = 0.3
      clonedScene.rotation.z = 0.1
    }
  }, [clonedScene, optimizedMaterial])

  // Optimize animation with delta time
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5 // Use delta for consistent animation
    }
  })

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

  return <primitive ref={modelRef} object={clonedScene} />
}

interface Logo3DProps {
  onLoad?: () => void;
}

const Logo3D: React.FC<Logo3DProps> = ({ onLoad }) => {
  const { fov, dpr } = useResponsiveSettings()
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: fov }}
        gl={{
          alpha: true,
          antialias: window.innerWidth < 768, // Disable antialias on desktop for performance
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