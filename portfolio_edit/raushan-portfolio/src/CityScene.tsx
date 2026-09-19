import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Skyline() {
  const group = useRef<THREE.Group>(null)
  const buildings = useMemo(() => {
    const items: { x: number; z: number; w: number; d: number; h: number; shade: number }[] = []
    for (let x = -6; x <= 6; x += 1.6) {
      for (let z = -3; z <= 3; z += 1.7) {
        const h = 0.8 + Math.random() * 3.5 + (Math.abs(x) < 2 ? 1.4 : 0)
        items.push({ x: x + (Math.random() - 0.5) * 0.55, z: z + (Math.random() - 0.5) * 0.5, w: 0.85 + Math.random() * 0.6, d: 0.85 + Math.random() * 0.6, h, shade: 0.08 + Math.random() * 0.1 })
      }
    }
    return items
  }, [])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.055
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.05
  })

  return (
    <group ref={group} position={[0, -1.8, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <planeGeometry args={[22, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.15} />
      </mesh>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial color={new THREE.Color(b.shade, b.shade, b.shade)} roughness={0.72} metalness={0.2} />
          </mesh>
          <mesh position={[0, Math.min(b.h * 0.55, b.h - 0.12), b.d / 2 + 0.006]}>
            <planeGeometry args={[b.w * 0.68, Math.max(0.18, b.h * 0.18)]} />
            <meshBasicMaterial color="#d9f1ff" transparent opacity={0.17} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[3.9, 4.35, 64]} />
        <meshBasicMaterial color="#24303b" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [9, 5.4, 11], fov: 35 }} dpr={[1, 1.7]} gl={{ antialias: true }}>
      <color attach="background" args={["#070707"]} />
      <fog attach="fog" args={["#070707", 8, 28]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 9, 6]} intensity={3.4} castShadow />
      <pointLight position={[-5, 3, 2]} intensity={8} distance={13} color="#87c9ff" />
      <pointLight position={[4, 2, -2]} intensity={4} distance={10} color="#ffb37d" />
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.16}>
        <Skyline />
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI * 0.32} maxPolarAngle={Math.PI * 0.54} autoRotate autoRotateSpeed={0.22} />
    </Canvas>
  )
}

export default function CityScene() {
  return <div className="scene-wrap" aria-hidden="true"><Scene /></div>
}
