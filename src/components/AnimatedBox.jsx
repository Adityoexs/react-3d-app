import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * AnimatedBox.jsx — A rotating and floating box animated with useFrame.
 *
 * • Continuously rotates on the X and Y axes each frame.
 * • Floats up and down using Math.sin(elapsedTime).
 * • Casts and receives shadows.
 */
export default function AnimatedBox() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    // Rotate on both axes
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.015

    // Floating effect — oscillate the Y position using a sine wave
    meshRef.current.position.y =
      2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.5
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={[0, 2, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#00d4ff"
        metalness={0.4}
        roughness={0.2}
        emissive="#003344"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}
