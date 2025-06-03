'use client'

import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model for better performance
useGLTF.preload('/assets/logo-optimized.glb')

function Model() {
  // Use useGLTF instead of useLoader for better caching and performance
  const { scene } = useGLTF('/assets/logo-optimized.glb')
  const modelRef = useRef<THREE.Group>(null!)
  
  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => scene.clone(), [scene])

  const iridescentMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.7,
      transparent: true,
      thickness: 0.5,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 600],
      color: new THREE.Color(0xffffff),
      attenuationColor: new THREE.Color(0xffffff),
      attenuationDistance: 0.2,
      envMapIntensity: 3.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    })
  }, [])

  useEffect(() => {
    if (clonedScene) {
      // Optimize geometry and materials
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Apply material
          child.material = iridescentMaterial
          
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
  }, [clonedScene, iridescentMaterial])

  // Optimize animation with delta time
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5 // Use delta for consistent animation
    }
  })

  return <primitive ref={modelRef} object={clonedScene} />
}

const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          // Performance optimizations
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        // Add performance monitoring
        performance={{ min: 0.5 }}
        // Enable automatic pixel ratio adjustment
        dpr={[1, 2]}
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
            // Reduce environment map resolution for better performance
            resolution={256}
          />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Logo3D