import { Suspense } from 'react'
import { OrbitControls, ContactShadows, Environment, BakeShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import LaFerrariCar from './LaFerrariCar'

/**
 * CarScene — Upgraded showroom scene for the realistic LaFerrari.
 *
 * Features:
 *  • Studio environment map for authentic paint reflections
 *  • ContactShadows for a crisp, soft shadow under the car
 *  • BakeShadows for static-shadow performance
 *  • EffectComposer > Bloom for emissive glow on lights & exhausts
 *  • 30×30 reflective showroom floor with grid lines
 *  • Multiple spotlights for dramatic showroom lighting
 *  • OrbitControls for user interaction
 */
export default function CarScene() {
  return (
    <Suspense fallback={null}>

      {/* Studio environment — provides realistic reflections on the car paint */}
      <Environment preset="studio" />

      {/* ─── Lighting ─────────────────────────────────────────────────── */}

      {/* Soft ambient fill — keeps the car visible from all angles */}
      <ambientLight intensity={0.4} />

      {/* Top-left key spotlight — main illumination */}
      <spotLight
        castShadow
        position={[-5, 8, 4]}
        intensity={150}
        angle={0.45}
        penumbra={0.4}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Top-right fill spotlight */}
      <spotLight
        castShadow
        position={[5, 8, -4]}
        intensity={100}
        angle={0.45}
        penumbra={0.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Front spotlight — illuminates the nose and headlights */}
      <spotLight
        castShadow
        position={[8, 4, 0]}
        intensity={80}
        angle={0.4}
        penumbra={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ferrari red dramatic side glow */}
      <pointLight
        color="#ff2200"
        position={[0, 1.5, 3]}
        intensity={20}
        distance={10}
      />

      {/* White under-car fill — subtle undercar lighting effect */}
      <pointLight
        color="#ffffff"
        position={[0, -0.2, 0]}
        intensity={5}
        distance={4}
      />

      {/* ─── Reflective Floor ─────────────────────────────────────────── */}

      {/* 30×30 showroom floor — high metalness for paint reflections */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* ─── Grid Helper ──────────────────────────────────────────────── */}

      {/* 30×30 showroom floor grid lines */}
      <gridHelper
        args={[30, 30, '#333333', '#222222']}
        position={[0, 0.001, 0]}
      />

      {/* ─── Contact Shadow ───────────────────────────────────────────── */}

      {/* Crisp soft contact shadow directly under the car */}
      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.75}
        scale={12}
        blur={2.5}
        far={2}
        resolution={512}
        color="#000000"
      />

      {/* Bake static shadows for performance.
          Note: the rotating car's directional shadow will be fixed at the baked
          frame; ContactShadows below still updates dynamically. */}
      <BakeShadows />

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

      {/* ─── Post-processing ──────────────────────────────────────────── */}

      {/* Bloom — adds glow to emissive headlights, taillights & exhaust tips */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>

    </Suspense>
  )
}
