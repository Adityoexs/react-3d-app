import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import CarScene from './components/CarScene'
import './components/CarShowroom.css'

/**
 * App — root component.
 *
 * Renders a full-viewport Three.js canvas with a tab toggle that lets the
 * user switch between:
 *   • "3D Scene"   — original physics / stars / animated-box scene
 *   • "LaFerrari"  — showroom scene with the detailed LaFerrari car
 */
export default function App() {
  const [activeScene, setActiveScene] = useState('3d')

  return (
    <>
      {/* Scene toggle buttons — fixed top-centre */}
      <div className="scene-toggle">
        <button
          className={activeScene === '3d' ? 'active' : ''}
          onClick={() => setActiveScene('3d')}
        >
          3D Scene
        </button>
        <button
          className={activeScene === 'ferrari' ? 'active' : ''}
          onClick={() => setActiveScene('ferrari')}
        >
          LaFerrari
        </button>
      </div>

      {activeScene === '3d' ? (
        <Canvas
          shadows
          camera={{ position: [0, 5, 10], fov: 60 }}
          style={{ background: '#0a0a0f', width: '100vw', height: '100vh' }}
        >
          <Scene />
        </Canvas>
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 7], fov: 55 }}
          style={{ background: '#0d0d0d', width: '100vw', height: '100vh' }}
        >
          <fog attach="fog" args={['#0d0d0d', 15, 30]} />
          <CarScene />
        </Canvas>
      )}
    </>
  )
}
