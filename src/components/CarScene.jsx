import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import LaFerrariCar from './LaFerrariCar'

/**
 * CarScene — Showroom scene for the LaFerrari.
 *
 * Features:
 *  • LaFerrariCar component at centre
 *  • Showroom-style lighting (bright spotlights from multiple angles)
 *  • Reflective dark floor with metalness
 *  • OrbitControls for user interaction
 *  • GridHelper for showroom floor grid
 */
export default function CarScene() {
  return (
    <Suspense fallback={null}>

      {/* ─── Lighting ─────────────────────────────────────────────────── */}

      {/* Soft ambient fill — keeps the car visible from all angles */}
      <ambientLight intensity={0.3} />

      {/* Top-left key spotlight */}
      <spotLight
        castShadow
        position={[-5, 8, 4]}
        intensity={120}
        angle={0.45}
        penumbra={0.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Top-right fill spotlight */}
      <spotLight
        castShadow
        position={[5, 8, -4]}
        intensity={80}
        angle={0.45}
        penumbra={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Front spotlight — illuminates the nose and headlights */}
      <spotLight
        castShadow
        position={[8, 4, 0]}
        intensity={60}
        angle={0.4}
        penumbra={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Red point light on one side — dramatic Ferrari glow */}
      <pointLight
        color="#ff0000"
        position={[0, 2, 4]}
        intensity={18}
        distance={12}
      />

      {/* White under-car glow — subtle undercar lighting effect */}
      <pointLight
        color="#ffffff"
        position={[0, -0.3, 0]}
        intensity={4}
        distance={5}
      />

      {/* ─── Reflective Floor ─────────────────────────────────────────── */}

      {/* 20×20 showroom floor — high metalness for reflections */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ─── Grid Helper ──────────────────────────────────────────────── */}

      {/* Showroom floor grid lines — sits just above the floor to avoid z-fighting */}
      <gridHelper
        args={[20, 20, '#333333', '#222222']}
        position={[0, 0.001, 0]}
      />

      {/* ─── Car ──────────────────────────────────────────────────────── */}

      <LaFerrariCar />

      {/* ─── Camera Controls ──────────────────────────────────────────── */}

      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        minDistance={3}
        maxDistance={20}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0.5, 0]}
      />

    </Suspense>
  )
}
