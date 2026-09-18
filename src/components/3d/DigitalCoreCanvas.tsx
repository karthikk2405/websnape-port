import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Glowing Data Ring ──────────────────────────────────────────────
const DataRing: React.FC<{ radius: number; speed: number; thickness: number; color: string; rotation: [number, number, number] }> = ({ radius, speed, thickness, color, rotation }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += speed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshPhysicalMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
};

// ─── Futuristic Digital Core Scene ──────────────────────────────────
const CoreScene: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = -t * 0.05;
      outerSphereRef.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    }
  });

  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} color="#00F0FF" />
      <directionalLight position={[10, 20, 10]} intensity={3} color="#FFFFFF" />
      <pointLight position={[-10, 0, -10]} intensity={5} color="#0044FF" />
      <pointLight position={[0, -10, 5]} intensity={4} color="#D4AF37" />
      
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={coreRef}>
          {/* Inner Energy Core */}
          <mesh>
            <sphereGeometry args={[2.2, 64, 64]} />
            <MeshDistortMaterial 
              color="#00F0FF"
              emissive="#0044FF"
              emissiveIntensity={2}
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={1}
            />
          </mesh>

          {/* Outer Glass Sphere */}
          <mesh ref={outerSphereRef} scale={1.1}>
            <sphereGeometry args={[2.4, 32, 32]} />
            <meshPhysicalMaterial 
              color="#0A0A0C"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
              ior={1.5}
              transmission={0.9}
            />
          </mesh>

          {/* Orbital Rings representing Data Pipelines */}
          <DataRing radius={4} thickness={0.02} speed={0.01} color="#00F0FF" rotation={[Math.PI / 3, 0, 0]} />
          <DataRing radius={5.5} thickness={0.015} speed={-0.015} color="#A9B1BD" rotation={[0, Math.PI / 4, 0]} />
          <DataRing radius={7} thickness={0.01} speed={0.008} color="#D4AF37" rotation={[-Math.PI / 6, Math.PI / 6, 0]} />
          
          {/* Floating Data Nodes (Small cubes) */}
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const r = 8 + Math.sin(i * 3) * 2;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 4;
            return (
              <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshPhysicalMaterial color="#FFFFFF" emissive={i % 3 === 0 ? "#00F0FF" : "#0044FF"} emissiveIntensity={3} />
              </mesh>
            );
          })}
        </group>
      </Float>
    </group>
  );
};

export const DigitalCoreCanvas: React.FC = () => {
  return (
    <div className="w-full h-[600px] lg:h-[800px] relative overflow-hidden bg-[#0A0A0C] cursor-pointer active:cursor-grabbing">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0C_80%)] z-10 pointer-events-none" />
      <Canvas gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }} dpr={[1, 2]}>
        <CoreScene />
      </Canvas>
    </div>
  );
};
