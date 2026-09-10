import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const EcosystemScene: React.FC = () => {
  const node1 = useRef<THREE.Mesh>(null);
  const node2 = useRef<THREE.Mesh>(null);
  const node3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (node1.current) node1.current.position.y = Math.sin(t * 1.5) * 0.15;
    if (node2.current) node2.current.position.y = Math.cos(t * 1.8) * 0.2;
    if (node3.current) node3.current.position.y = Math.sin(t * 1.2 + 1) * 0.15;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 0, 4]} intensity={2.5} color="#C87A4B" />

      {/* Node 1: Café Guest */}
      <Float speed={2} position={[-2.2, 0, 0]}>
        <mesh ref={node1}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#1C1A18" roughness={0.1} metalness={0.9} emissive="#C87A4B" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      {/* Node 2: WebSnape Core */}
      <Float speed={3} position={[0, 0, 0]}>
        <mesh ref={node2}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#141414" roughness={0.1} metalness={0.9} emissive="#D46A43" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      {/* Node 3: Kitchen & Barista Team */}
      <Float speed={2.2} position={[2.2, 0, 0]}>
        <mesh ref={node3}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#19241F" roughness={0.1} metalness={0.9} emissive="#4A6B5D" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </>
  );
};

export const EcosystemCanvas: React.FC = () => {
  return (
    <div className="w-full h-40 relative pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <EcosystemScene />
      </Canvas>
    </div>
  );
};
