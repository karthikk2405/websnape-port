import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const TableScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const qrRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.25;
    }
    if (qrRef.current) {
      qrRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;
    }
    if (phoneRef.current) {
      phoneRef.current.position.y = 0.35 + Math.sin(t * 1.5) * 0.05;
      phoneRef.current.rotation.z = Math.sin(t * 1.0) * 0.04;
    }
    if (beamRef.current) {
      beamRef.current.rotation.y += delta * 0.7;
    }
    if (particleGroupRef.current) {
      particleGroupRef.current.children.forEach((p, i) => {
        p.position.y += delta * (0.5 + (i % 3) * 0.2);
        if (p.position.y > 1.6) {
          p.position.y = 0.1;
        }
      });
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3.2, 5.5]} fov={38} />
      
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 10, 6]} intensity={3.0} color="#C87A4B" />
      <pointLight position={[-5, 4, 3]} intensity={2.2} color="#4A6B5D" />
      <pointLight position={[3, -1, 3]} intensity={1.5} color="#D46A43" />

      <group ref={groupRef} position={[0, -0.15, 0]}>
        
        {/* POLISHED WARM CAFÉ WOOD / MARBLE TABLE TOP */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.08, 64]} />
          <meshPhysicalMaterial
            color="#2A1F1A"
            roughness={0.2}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={0.8}
          />
        </mesh>

        {/* WARM COPPER CAFÉ TABLE RIM TUBE */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.11, 0.016, 16, 64]} />
          <meshBasicMaterial color="#C87A4B" />
        </mesh>

        {/* METALLIC TABLE BASE COLUMN & FOOT RING */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.07, 0.32, 0.6, 32]} />
          <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 0.05, 32]} />
          <meshStandardMaterial color="#1E1A17" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* TABLE NUMBER DISK */}
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.012, 32]} />
          <meshStandardMaterial color="#3D2D24" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 32]} />
          <meshBasicMaterial color="#C87A4B" side={THREE.DoubleSide} />
        </mesh>

        {/* 3D ACRYLIC & COPPER QR STAND */}
        <group ref={qrRef} position={[0, 0.15, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.28, 0.035, 0.16]} />
            <meshStandardMaterial color="#C87A4B" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.3, 0.35, 0.025]} />
            <meshPhysicalMaterial
              color="#1A1816"
              transmission={0.8}
              opacity={1}
              transparent
              roughness={0.1}
              ior={1.5}
            />
          </mesh>
          <mesh position={[0, 0.2, 0.015]}>
            <planeGeometry args={[0.24, 0.24]} />
            <meshBasicMaterial color="#ECEAE2" />
          </mesh>
        </group>

        {/* FLOATING SMARTPHONE MOCKUP */}
        <group ref={phoneRef} position={[0.48, 0.3, 0.18]} rotation={[0.4, -0.3, 0.1]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.35, 0.7, 0.035]} />
            <meshStandardMaterial color="#1C1A18" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.32, 0.65]} />
            <meshBasicMaterial color="#141414" />
          </mesh>
          <mesh position={[0, 0.22, 0.022]}>
            <planeGeometry args={[0.26, 0.08]} />
            <meshBasicMaterial color="#C87A4B" />
          </mesh>
          <mesh position={[0, -0.02, 0.022]}>
            <planeGeometry args={[0.26, 0.25]} />
            <meshBasicMaterial color="#26221F" />
          </mesh>
          <mesh position={[0, -0.22, 0.022]}>
            <planeGeometry args={[0.24, 0.06]} />
            <meshBasicMaterial color="#4A6B5D" />
          </mesh>
        </group>

        {/* CAFÉ LATTE ART CUP */}
        <group position={[-0.48, 0.12, -0.1]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.06, 0.18, 24]} />
            <meshPhysicalMaterial color="#F7F5EF" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
            <meshStandardMaterial color="#7A4B2A" roughness={0.3} />
          </mesh>
        </group>

        {/* HOLOGRAPHIC DATA BEAM RISING FROM TABLE QR */}
        <mesh ref={beamRef} position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.24, 0.05, 1.1, 32, 1, true]} />
          <meshBasicMaterial color="#C87A4B" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>

        {/* UPWARD DATA PARTICLES */}
        <group ref={particleGroupRef}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r = 0.12 + (i % 3) * 0.04;
            return (
              <mesh key={i} position={[Math.cos(angle) * r, 0.15 + (i % 5) * 0.22, Math.sin(angle) * r]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#C87A4B' : '#4A6B5D'} />
              </mesh>
            );
          })}
        </group>

      </group>
    </>
  );
};

export const Table3DCanvas: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[440px] relative flex items-center justify-center">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <TableScene />
      </Canvas>
    </div>
  );
};
