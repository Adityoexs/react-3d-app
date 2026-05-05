import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Lighting from './Lighting'
import AnimatedBox from './AnimatedBox'
import PhysicsWorld from './PhysicsWorld'
import Environment from './Environment'

/**
 * Scene.jsx — Main scene composition.
 *
 * Composes all sub-components inside a <Suspense> boundary so that
 * async-loaded resources (environment maps, etc.) don't block the render.
 *
 * Contains:
 *  • Lighting      — advanced light setup with shadows
 *  • AnimatedBox   — rotating & floating box via useFrame
 *  • PhysicsWorld  — falling / bouncing objects via @react-three/rapier
 *  • Environment   — starfield + night environment preset
 *  • OrbitControls — mouse-based camera navigation
 */
export default function Scene() {
  return (
    <Suspense fallback={null}>
      {/* Lighting */}
      <Lighting />

      {/* Animated centre-piece box */}
      <AnimatedBox />

      {/* Physics simulation — ground + bouncing objects */}
      <PhysicsWorld />

      {/* Stars background and night environment */}
      <Environment />

      {/* Camera controls — zoom, pan, rotate */}
      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        minDistance={3}
        maxDistance={40}
      />
    </Suspense>
  )
}
