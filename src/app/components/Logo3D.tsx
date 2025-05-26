'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const fbx = useLoader(FBXLoader, '/assets/logo.fbx')
  const modelRef = useRef<THREE.Group>(null!)

  const iridescentMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      // Core properties
      roughness: 0.1,          // Slightly increased for better light diffusion
      metalness: 0.2,          // Added slight metalness for better reflections

      // Transmission (Glass-like effect)
      transmission: 0.7,       // Reduced for more visible material
      transparent: true,
      opacity: 1.0,
      thickness: 0.5,
      ior: 1.5,

      // Iridescence (Rainbow effect)
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 600],

      // Color & Attenuation
      color: new THREE.Color(0xffffff),
      attenuationColor: new THREE.Color(0xffffff),
      attenuationDistance: 0.2,

      // Environment reflection
      envMapIntensity: 3.0,    // Increased for stronger reflections

      // Optional
      clearcoat: 0.5,          // Added clearcoat for extra shine
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    })
  }, [])

  useEffect(() => {
    if (fbx) {
      fbx.scale.set(0.02, 0.02, 0.02 * 0.5)

      const box = new THREE.Box3().setFromObject(fbx)
      const center = box.getCenter(new THREE.Vector3())
      fbx.position.sub(center)

      // Set initial rotation
      fbx.rotation.x = 0.2  // Tilt forward
      fbx.rotation.y = 0.3  // Rotate to the side
      fbx.rotation.z = 0.1  // Slight twist

      fbx.traverse((child: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = iridescentMaterial
          // If your model's normals are problematic, uncommenting this might help
          // (child as THREE.Mesh).geometry.computeVertexNormals();
        }
      })
    }
  }, [fbx, iridescentMaterial])

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
      modelRef.current.rotation.x = 0.2 // Keep slight tilt
    }
  })

  return <primitive ref={modelRef} object={fbx} />
}

const Logo3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none"> {/* Increased z-index and made it ignore pointer events */}
      <Canvas
        className="pointer-events-auto" /* Allow interactions with the Canvas itself */
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          outputEncoding: THREE.sRGBEncoding
        }}
      >
        <ambientLight intensity={0.5} /> {/* Increased light intensity */}
        <directionalLight position={[10, 10, 5]} intensity={1.0} /> {/* Increased light intensity */}
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="lightblue" /> {/* Added point light */}

        <React.Suspense fallback={null}>
          <Environment preset="sunset" background={false} /> {/* Changed environment preset */}
          <Model />
        </React.Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default Logo3D