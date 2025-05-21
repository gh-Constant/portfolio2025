'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const fbx = useLoader(FBXLoader, '/assets/logo.fbx')
  const modelRef = useRef<THREE.Group>()
  
  // Adjust model size to be less big
  useEffect(() => {
    if (fbx) {
      // Reduced scale from 0.05 to 0.03
      fbx.scale.set(0.02, 0.02, 0.02)
      
      // Center the model
      const box = new THREE.Box3().setFromObject(fbx)
      const center = box.getCenter(new THREE.Vector3())
      fbx.position.x = -center.x
      fbx.position.y = -center.y
      fbx.position.z = -center.z
    }
  }, [fbx])
  
  // Rotate the model slowly
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })
  
  return <primitive ref={modelRef} object={fbx} />
}

const Logo3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-25">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Model />
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

export default Logo3D