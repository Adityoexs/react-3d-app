import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'

/**
 * App — root component.
 * Renders a full-viewport Three.js canvas with shadows enabled
 * and a dark background, then mounts the main Scene inside it.
 */
export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{ background: '#0a0a0f', width: '100vw', height: '100vh' }}
    >
      <Scene />
    </Canvas>
  )
}
