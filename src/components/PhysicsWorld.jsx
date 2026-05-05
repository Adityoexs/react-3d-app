import { Physics, RigidBody } from '@react-three/rapier'

/**
 * PhysicsWorld.jsx — Physics simulation using @react-three/rapier.
 *
 * • A fixed ground plane that objects land on.
 * • Several spheres and boxes dropped from different heights,
 *   each with restitution (bounciness) so they bounce off the ground.
 */

// Falling object definitions — position [x, y, z], color, shape
const OBJECTS = [
  { id: 1, shape: 'sphere', position: [-3, 8, -2], color: '#ff4444', restitution: 0.8, radius: 0.5 },
  { id: 2, shape: 'box',    position: [ 2, 6, -1], color: '#44ff88', restitution: 0.5, size: [0.8, 0.8, 0.8] },
  { id: 3, shape: 'sphere', position: [ 3, 10, 2], color: '#ffaa00', restitution: 0.9, radius: 0.4 },
  { id: 4, shape: 'box',    position: [-2, 12, 1], color: '#cc44ff', restitution: 0.6, size: [0.7, 0.7, 0.7] },
  { id: 5, shape: 'sphere', position: [ 0, 9,  3], color: '#ff6699', restitution: 0.75, radius: 0.6 },
]

export default function PhysicsWorld() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* Ground plane — fixed so it never moves */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.1} roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Falling & bouncing objects */}
      {OBJECTS.map((obj) =>
        obj.shape === 'sphere' ? (
          <RigidBody
            key={obj.id}
            colliders="ball"
            restitution={obj.restitution}
            position={obj.position}
          >
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[obj.radius, 32, 32]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.4} />
            </mesh>
          </RigidBody>
        ) : (
          <RigidBody
            key={obj.id}
            colliders="cuboid"
            restitution={obj.restitution}
            position={obj.position}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={obj.size} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.4} />
            </mesh>
          </RigidBody>
        )
      )}
    </Physics>
  )
}
