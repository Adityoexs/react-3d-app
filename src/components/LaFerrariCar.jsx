import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// ─── Shared material colours (outside component to avoid per-render recreation) ─
const ferrariRed = '#CC0000'
const glassColor = '#1a1a2e'
const wheelColor = '#1a1a1a'
const rimColor   = '#C0C0C0'
const darkColor  = '#111111'

/**
 * LaFerrariCar — A detailed LaFerrari supercar built entirely from
 * Three.js primitive geometries. No external assets required.
 *
 * Car dimensions: ~4 units long, ~2 units wide, ~1 unit tall
 * Centred at origin [0, 0, 0]
 */
export default function LaFerrariCar() {
  // Ref for rotating the entire car group
  const carGroupRef = useRef()

  // Refs for the four wheel groups so they can spin independently
  const wheelFL = useRef()
  const wheelFR = useRef()
  const wheelRL = useRef()
  const wheelRR = useRef()

  useFrame(() => {
    // Slowly rotate the entire car on the Y axis (showcase spin)
    if (carGroupRef.current) {
      carGroupRef.current.rotation.y += 0.003
    }
    // Spin each wheel around its own rolling axis (local X after the 90° Z rotation)
    const spinSpeed = 0.04
    ;[wheelFL, wheelFR, wheelRL, wheelRR].forEach((ref) => {
      if (ref.current) ref.current.rotation.x += spinSpeed
    })
  })

  // ─── Wheel helper ─────────────────────────────────────────────────────────
  /**
   * One wheel assembly: tyre + rim + 5 spokes.
   * The entire assembly is rotated 90° on the Z axis so the cylinder
   * rolls along the X axis (left-right) as the car drives forward.
   *
   * @param {object} props
   * @param {[number,number,number]} props.position  World position of wheel centre
   * @param {React.Ref}              props.groupRef  Ref attached to the spinning group
   */
  function Wheel({ position, groupRef }) {
    return (
      <group position={position} rotation={[0, 0, Math.PI / 2]}>
        {/* Spinning sub-group — only this part rotates via useFrame */}
        <group ref={groupRef}>
          {/* Tyre — wide, low-profile cylinder */}
          <mesh castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.28, 32]} />
            <meshStandardMaterial color={wheelColor} roughness={0.9} />
          </mesh>

          {/* Rim — slightly inset silver disc */}
          <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.29, 32]} />
            <meshStandardMaterial color={rimColor} metalness={0.8} roughness={0.2} />
          </mesh>

          {/* 5 spokes — thin boxes crossing the rim centre */}
          {[0, 36, 72, 108, 144].map((angleDeg) => {
            const angle = (angleDeg * Math.PI) / 180
            return (
              <mesh
                key={angleDeg}
                castShadow
                rotation={[angle, 0, 0]}
                position={[0, 0, 0]}
              >
                <boxGeometry args={[0.04, 0.44, 0.05]} />
                <meshStandardMaterial color={rimColor} metalness={0.8} roughness={0.2} />
              </mesh>
            )
          })}
        </group>
      </group>
    )
  }

  return (
    <group ref={carGroupRef}>

      {/* ═══════════════════════════════════════════════════════════════════
          BODY PANELS — Ferrari red
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Main body — low, wide, long central tub */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[3.8, 0.36, 1.8]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Lower body skirt — slightly wider, ground-hugging strip */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[3.9, 0.1, 2.0]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Cabin / roof — tapered, sits on top of the body */}
      <mesh castShadow position={[0.1, 0.58, 0]}>
        <boxGeometry args={[1.6, 0.38, 1.3]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Front hood — slopes down toward the nose */}
      <mesh castShadow position={[1.5, 0.28, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.9, 0.14, 1.7]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Rear deck / engine cover — slopes up toward the tail */}
      <mesh castShadow position={[-1.3, 0.34, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.9, 0.14, 1.7]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Rear diffuser — flat wide piece at back bottom */}
      <mesh castShadow position={[-2.05, 0.08, 0]}>
        <boxGeometry args={[0.35, 0.08, 1.9]} />
        <meshStandardMaterial color={darkColor} roughness={0.6} />
      </mesh>

      {/* Front splitter — low flat blade at the very nose */}
      <mesh castShadow position={[2.05, 0.06, 0]}>
        <boxGeometry args={[0.2, 0.06, 1.8]} />
        <meshStandardMaterial color={darkColor} roughness={0.6} />
      </mesh>

      {/* Rear wing / spoiler — elevated thin aerofoil */}
      <mesh castShadow position={[-1.85, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.06, 1.6]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Spoiler endplates left */}
      <mesh castShadow position={[-1.85, 0.52, 0.82]}>
        <boxGeometry args={[0.5, 0.36, 0.05]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Spoiler endplates right */}
      <mesh castShadow position={[-1.85, 0.52, -0.82]}>
        <boxGeometry args={[0.5, 0.36, 0.05]} />
        <meshStandardMaterial color={ferrariRed} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════════
          WINDOWS — dark tinted glass
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Windshield — angled forward glass panel */}
      <mesh castShadow position={[0.82, 0.6, 0]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.55, 0.04, 1.22]} />
        <meshStandardMaterial
          color={glassColor}
          transparent
          opacity={0.72}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* Rear window — angled back glass panel */}
      <mesh castShadow position={[-0.62, 0.62, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.04, 1.22]} />
        <meshStandardMaterial
          color={glassColor}
          transparent
          opacity={0.72}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* Side window — left */}
      <mesh castShadow position={[0.1, 0.62, 0.66]}>
        <boxGeometry args={[1.1, 0.28, 0.04]} />
        <meshStandardMaterial
          color={glassColor}
          transparent
          opacity={0.72}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* Side window — right */}
      <mesh castShadow position={[0.1, 0.62, -0.66]}>
        <boxGeometry args={[1.1, 0.28, 0.04]} />
        <meshStandardMaterial
          color={glassColor}
          transparent
          opacity={0.72}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════════
          HEADLIGHTS — white emissive
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Headlight left */}
      <mesh castShadow position={[1.92, 0.24, 0.58]}>
        <boxGeometry args={[0.15, 0.1, 0.28]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
      </mesh>

      {/* Headlight right */}
      <mesh castShadow position={[1.92, 0.24, -0.58]}>
        <boxGeometry args={[0.15, 0.1, 0.28]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
      </mesh>

      {/* DRL strip left */}
      <mesh castShadow position={[1.93, 0.17, 0.58]}>
        <boxGeometry args={[0.12, 0.04, 0.25]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} />
      </mesh>

      {/* DRL strip right */}
      <mesh castShadow position={[1.93, 0.17, -0.58]}>
        <boxGeometry args={[0.12, 0.04, 0.25]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════════
          TAILLIGHTS — red emissive
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Taillight left */}
      <mesh castShadow position={[-1.93, 0.24, 0.6]}>
        <boxGeometry args={[0.14, 0.12, 0.3]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Taillight right */}
      <mesh castShadow position={[-1.93, 0.24, -0.6]}>
        <boxGeometry args={[0.14, 0.12, 0.3]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Tail light bar — thin horizontal strip linking taillights */}
      <mesh castShadow position={[-1.94, 0.22, 0]}>
        <boxGeometry args={[0.1, 0.05, 1.0]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.8} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════════
          DETAILS
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Side air intake — left */}
      <mesh castShadow position={[-0.3, 0.22, 0.92]}>
        <boxGeometry args={[0.55, 0.18, 0.06]} />
        <meshStandardMaterial color={darkColor} roughness={0.8} />
      </mesh>

      {/* Side air intake — right */}
      <mesh castShadow position={[-0.3, 0.22, -0.92]}>
        <boxGeometry args={[0.55, 0.18, 0.06]} />
        <meshStandardMaterial color={darkColor} roughness={0.8} />
      </mesh>

      {/* Prancing horse logo area — small gold box on the hood */}
      <mesh castShadow position={[1.4, 0.36, 0]}>
        <boxGeometry args={[0.15, 0.04, 0.1]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ferrari script badge — front nose */}
      <mesh castShadow position={[1.98, 0.2, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.25]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Exhaust pipe — left */}
      <mesh castShadow position={[-1.98, 0.1, 0.35]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 12]} />
        <meshStandardMaterial color={darkColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Exhaust pipe — right */}
      <mesh castShadow position={[-1.98, 0.1, -0.35]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 12]} />
        <meshStandardMaterial color={darkColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Exhaust tip glow — one per pipe */}
      {[0.35, -0.35].map((z) => (
        <mesh key={z} position={[-2.06, 0.1, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          <meshStandardMaterial color="#FF6600" emissive="#FF3300" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Brake ducts front — left */}
      <mesh castShadow position={[1.6, 0.12, 0.82]}>
        <boxGeometry args={[0.25, 0.1, 0.08]} />
        <meshStandardMaterial color={darkColor} roughness={0.8} />
      </mesh>
      {/* Brake ducts front — right */}
      <mesh castShadow position={[1.6, 0.12, -0.82]}>
        <boxGeometry args={[0.25, 0.1, 0.08]} />
        <meshStandardMaterial color={darkColor} roughness={0.8} />
      </mesh>

      {/* ═══════════════════════════════════════════════════════════════════
          WHEELS — 4 × (tyre + rim + spokes)
          Positions: y = 0 (wheel centre touches ground at y = -0.35 + 0.35)
          Wheels sit slightly outside the body width (±1.06 on Z)
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Front-left wheel */}
      <Wheel position={[1.3, 0.35, 1.06]} groupRef={wheelFL} />

      {/* Front-right wheel */}
      <Wheel position={[1.3, 0.35, -1.06]} groupRef={wheelFR} />

      {/* Rear-left wheel */}
      <Wheel position={[-1.3, 0.35, 1.06]} groupRef={wheelRL} />

      {/* Rear-right wheel */}
      <Wheel position={[-1.3, 0.35, -1.06]} groupRef={wheelRR} />

    </group>
  )
}
