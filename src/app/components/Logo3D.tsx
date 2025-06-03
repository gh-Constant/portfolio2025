'use client'

import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const gltf = useLoader(GLTFLoader, '/assets/logo.glb')
  const modelRef = useRef<THREE.Group>(null!)

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
    if (gltf.scene) {
      // Much larger scale to make it visible
      gltf.scene.scale.set(2, 2, 1)
      
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      gltf.scene.position.sub(center)

      // Set initial rotation
      gltf.scene.rotation.x = 0.2
      gltf.scene.rotation.y = 0.3
      gltf.scene.rotation.z = 0.1

      // Apply iridescent material to all meshes
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = iridescentMaterial
        }
      })
    }
  }, [gltf.scene, iridescentMaterial])

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return <primitive ref={modelRef} object={gltf.scene} />
}

const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.0} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="lightblue" />

        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Logo3D