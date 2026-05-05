/**
 * Lighting.jsx — Advanced lighting setup for the 3D scene.
 *
 * Includes:
 *  • ambientLight     — soft overall fill light
 *  • directionalLight — sun-like light with shadow casting
 *  • pointLight       — coloured accent light
 *  • spotLight        — dramatic cone light
 */
export default function Lighting() {
  return (
    <>
      {/* Soft ambient fill — prevents completely black shadows */}
      <ambientLight intensity={0.3} />

      {/* Main directional light — casts shadows from above */}
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Coloured point light for accent illumination */}
      <pointLight
        position={[-4, 4, -4]}
        intensity={1.2}
        color="#6644ff"
        distance={20}
        decay={2}
      />

      {/* Spotlight for a dramatic focused beam */}
      <spotLight
        castShadow
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#ff8844"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}
