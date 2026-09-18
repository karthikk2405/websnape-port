import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Line, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

const ParticleWave: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a grid of points
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 5; j++) {
        temp.push({
          x: (i - 7.5) * 1.5,
          y: 0,
          z: (j - 2.5) * 1.5,
          offset: i * 0.5 + j * 0.2
        });
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        const particle = particles[idx];
        if (particle) {
          // Wave motion
          child.position.y = Math.sin(time * 1.5 + particle.offset) * 1.2;
          // Color pulse
          const scale = 0.5 + Math.sin(time * 3 + particle.offset) * 0.3;
          child.scale.setScalar(scale);
        }
      });
      // Rotate the whole system slowly
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial 
            color="#FFFFFF"
            emissive={i % 3 === 0 ? "#00F0FF" : "#0044FF"}
            emissiveIntensity={4}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const ProcessScene: React.FC = () => {
  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={45} />
      <ambientLight intensity={0.2} color="#00F0FF" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#FFFFFF" />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <ParticleWave />
      </Float>
      
      {/* Background ambient glow */}
      <mesh position={[0, -2, -5]} scale={1.5}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

export const ProcessNodeCanvas: React.FC = () => {
  return (
    <div className="w-full h-[400px] relative overflow-hidden bg-transparent cursor-grab active:cursor-grabbing">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <ProcessScene />
      </Canvas>
    </div>
  );
};
