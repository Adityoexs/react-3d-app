import { Stars, Environment as DreiEnvironment } from '@react-three/drei'

/**
 * Environment.jsx — Starfield background and night environment preset.
 *
 * • <Stars>       — randomly scattered star particles across the sky.
 * • <Environment> — night HDRI preset for realistic environment reflections.
 */
export default function Environment() {
  return (
    <>
      {/* Starfield — fills the background with thousands of tiny stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Night environment preset — provides IBL (image-based lighting) */}
      <DreiEnvironment preset="night" />
    </>
  )
}
