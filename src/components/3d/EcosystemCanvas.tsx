import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Line } from '@react-three/drei';
import * as THREE from 'three';

interface NodeConfig {
  position: [number, number, number];
  color: string;
  emissive: string;
  size: number;
  label: string;
  speed: number;
  phaseOffset: number;
}

const NODES: NodeConfig[] = [
  {
    position: [-2.4, 0, 0],
    color: '#1C1A18',
    emissive: '#C87A4B',
    size: 0.52,
    label: 'Guest',
    speed: 1.6,
    phaseOffset: 0,
  },
  {
    position: [0, 0, 0],
    color: '#141414',
    emissive: '#D46A43',
    size: 0.75,
    label: 'Engine',
    speed: 2.2,
    phaseOffset: 1.1,
  },
  {
    position: [2.4, 0, 0],
    color: '#192420',
    emissive: '#4A6B5D',
    size: 0.52,
    label: 'Kitchen',
    speed: 1.8,
    phaseOffset: 2.2,
  },
];

// A single glowing sphere node
const Node: React.FC<{ config: NodeConfig }> = ({ config }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const bounce = Math.sin(t * config.speed + config.phaseOffset) * 0.18;
    if (meshRef.current) {
      meshRef.current.position.y = bounce;
      meshRef.current.rotation.y += 0.008;
    }
    if (glowRef.current) {
      glowRef.current.position.y = bounce;
      const pulse = 0.95 + Math.sin(t * config.speed * 1.5 + config.phaseOffset) * 0.05;
      glowRef.current.scale.setScalar(pulse);
    }
    if (ringRef.current) {
      ringRef.current.position.y = bounce;
      ringRef.current.rotation.z += 0.012;
    }
  });

  return (
    <group position={config.position}>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[config.size, 48, 48]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[config.size * 1.4, 32, 32]} />
        <meshBasicMaterial
          color={config.emissive}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Spinning orbit ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0.3, 0]}>
        <torusGeometry args={[config.size * 1.6, 0.012, 8, 64]} />
        <meshBasicMaterial color={config.emissive} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Animated glowing beam between two nodes with a moving pulse
const Beam: React.FC<{ start: [number, number, number]; end: [number, number, number]; color: string; delay: number }> = ({ start, end, color, delay }) => {
  const dotRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    return [s, e];
  }, [start, end]);

  useFrame((state) => {
    if (!dotRef.current) return;
    const t = ((state.clock.getElapsedTime() * 0.7 + delay) % 1 + 1) % 1;
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    dotRef.current.position.lerpVectors(s, e, t);
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.2} transparent opacity={0.35} />
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

const EcosystemScene: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, 6.5]} fov={50} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-3, 3, 4]} intensity={4.0} color="#C87A4B" />
      <pointLight position={[3, -2, 4]} intensity={3.5} color="#4A6B5D" />
      <pointLight position={[0, 4, 3]} intensity={2.5} color="#D46A43" />

      {NODES.map((node, i) => (
        <Node key={i} config={node} />
      ))}

      {/* Beams: Guest ↔ Engine */}
      <Beam start={[-2.4, 0, 0]} end={[0, 0, 0]} color="#C87A4B" delay={0} />
      <Beam start={[0, 0, 0]} end={[-2.4, 0, 0]} color="#D46A43" delay={0.5} />

      {/* Beams: Engine ↔ Kitchen */}
      <Beam start={[0, 0, 0]} end={[2.4, 0, 0]} color="#4A6B5D" delay={0.25} />
      <Beam start={[2.4, 0, 0]} end={[0, 0, 0]} color="#C87A4B" delay={0.75} />
    </>
  );
};

export const EcosystemCanvas: React.FC = () => (
  <div className="w-full relative pointer-events-none" style={{ height: '220px' }}>
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <EcosystemScene />
    </Canvas>
  </div>
);
