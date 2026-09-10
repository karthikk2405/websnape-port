import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface RocketSceneProps {
  launched: boolean;
}

const RocketScene: React.FC<RocketSceneProps> = ({ launched }) => {
  const rocketRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const flame2Ref = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Group>(null);

  // Smooth launch animation state
  const launchProgress = useRef(0);
  const idleTime = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    idleTime.current += delta;

    if (launched) {
      launchProgress.current = Math.min(launchProgress.current + delta * 0.6, 1);
    } else {
      launchProgress.current = Math.max(launchProgress.current - delta * 0.3, 0);
    }

    const p = launchProgress.current;
    // Eased launch curve: slow start → fast exit
    const easedP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    if (rocketRef.current) {
      // Idle hover
      const idleBob = Math.sin(idleTime.current * 1.4) * 0.06;
      const idleTilt = Math.sin(idleTime.current * 0.9) * 0.03;

      // Launch trajectory: rises + tilts slightly
      const launchY = easedP * 5.5;
      const launchTiltZ = easedP * -0.08;

      rocketRef.current.position.y = -0.6 + idleBob + launchY;
      rocketRef.current.rotation.z = idleTilt + launchTiltZ;
      rocketRef.current.rotation.y = t * 0.3;
    }

    // Platform sinks slightly when rocket launches
    if (platformRef.current) {
      platformRef.current.position.y = -1.8 - easedP * 0.3;
    }

    // Exhaust glow flicker
    if (exhaustRef.current) {
      const flicker = 0.85 + Math.random() * 0.3;
      exhaustRef.current.scale.setScalar(flicker * (0.4 + easedP * 0.8));
      exhaustRef.current.position.y = -1.05 - easedP * 0.1;
    }

    // Main flame scale
    if (flameRef.current) {
      const flicker = 0.9 + Math.random() * 0.2;
      const intensity = 0.3 + easedP * 1.0;
      flameRef.current.scale.y = flicker * intensity;
      flameRef.current.scale.x = flicker * (0.6 + easedP * 0.4);
      (flameRef.current.material as THREE.MeshBasicMaterial).opacity = 0.7 + easedP * 0.3;
    }

    // Inner flame
    if (flame2Ref.current) {
      const flicker = 0.85 + Math.random() * 0.3;
      flame2Ref.current.scale.y = flicker * (0.5 + easedP * 0.8);
      (flame2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + easedP * 0.4;
    }

    // Exhaust particles rise and fade
    if (particleGroupRef.current) {
      particleGroupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const speed = 0.3 + (i % 4) * 0.15;
        mesh.position.y -= delta * speed * (0.5 + easedP * 2.5);
        const spreadX = Math.sin(idleTime.current * 2 + i * 1.3) * 0.02;
        mesh.position.x += spreadX;
        (mesh.material as THREE.MeshBasicMaterial).opacity -= delta * 0.8;

        if (mesh.position.y < -2.2 || (mesh.material as THREE.MeshBasicMaterial).opacity <= 0) {
          mesh.position.y = -1.1;
          mesh.position.x = (Math.random() - 0.5) * 0.18;
          mesh.position.z = (Math.random() - 0.5) * 0.18;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 + Math.random() * 0.3;
        }
      });
    }
  });

  // Particle positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (Math.random() - 0.5) * 0.2,
    y: -1.1 - Math.random() * 0.4,
    z: (Math.random() - 0.5) * 0.2,
    size: 0.02 + Math.random() * 0.04,
    color: i % 3 === 0 ? '#C87A4B' : i % 3 === 1 ? '#FFFFFF' : '#7EB8FF',
  }));

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 5.5]} fov={40} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, -1, 2]} intensity={6} color="#7EB8FF" />
      <pointLight position={[-2, 2, 2]} intensity={3} color="#C87A4B" />
      <pointLight position={[2, 3, 1]} intensity={2} color="#FFFFFF" />
      <pointLight position={[0, -2, 1]} intensity={4} color="#4488FF" />

      {/* ===== LAUNCH PLATFORM ===== */}
      <group ref={platformRef} position={[0, -1.8, 0]}>
        {/* Glass browser card base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.06, 1.6]} />
          <meshPhysicalMaterial
            color="#B8C8E8"
            roughness={0.05}
            metalness={0.1}
            transmission={0.6}
            opacity={0.8}
            transparent
            ior={1.45}
          />
        </mesh>
        {/* Browser chrome bar */}
        <mesh position={[0, 0.05, 0.55]}>
          <boxGeometry args={[2.4, 0.08, 0.45]} />
          <meshPhysicalMaterial
            color="#C8D8F0"
            roughness={0.1}
            metalness={0.1}
            transmission={0.5}
            transparent
            opacity={0.75}
            ior={1.4}
          />
        </mesh>
        {/* Browser dots */}
        {[-0.85, -0.65, -0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.09, 0.65]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={i === 0 ? '#FF6B6B' : i === 1 ? '#FFD93D' : '#6BCB77'} />
          </mesh>
        ))}
        {/* Body content lines */}
        {[-0.3, 0, 0.3].map((z, i) => (
          <mesh key={i} position={[0, 0.04, z - 0.1]}>
            <boxGeometry args={[1.8, 0.012, 0.06]} />
            <meshBasicMaterial color="#A0B8D8" transparent opacity={0.5} />
          </mesh>
        ))}
        {/* Glass border glow */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.42, 0.065, 1.62]} />
          <meshBasicMaterial color="#7EB8FF" transparent opacity={0.15} side={THREE.BackSide} />
        </mesh>
        {/* Platform support legs */}
        {[[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.25, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 8]} />
            <meshStandardMaterial color="#8AA0C0" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ===== ROCKET ===== */}
      <group ref={rocketRef} position={[0, -0.6, 0]}>

        {/* === ROCKET BODY === */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 1.3, 32]} />
          <meshPhysicalMaterial
            color="#C8D8F0"
            roughness={0.05}
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Body blue stripe */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.18, 32]} />
          <meshStandardMaterial color="#4466CC" metalness={0.7} roughness={0.2} emissive="#2244AA" emissiveIntensity={0.3} />
        </mesh>

        {/* === NOSE CONE === */}
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.22, 0.65, 32]} />
          <meshPhysicalMaterial
            color="#5577DD"
            roughness={0.05}
            metalness={0.7}
            clearcoat={1.0}
            emissive="#3355BB"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Window porthole */}
        <mesh position={[0, 0.3, 0.22]}>
          <circleGeometry args={[0.1, 32]} />
          <meshPhysicalMaterial
            color="#88AAFF"
            roughness={0.0}
            metalness={0.0}
            transmission={0.3}
            emissive="#4466FF"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Porthole rim */}
        <mesh position={[0, 0.3, 0.215]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshStandardMaterial color="#8899CC" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* === FINS (4x) === */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.3, -0.55, 0]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.22, 0.42, 0.04]} />
              <meshPhysicalMaterial
                color="#4466CC"
                roughness={0.1}
                metalness={0.8}
                clearcoat={0.8}
                emissive="#223388"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* === ENGINE NOZZLE === */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.14, 0.2, 0.22, 24]} />
          <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.84, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.06, 24]} />
          <meshStandardMaterial color="#555555" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* === EXHAUST GROUP === */}
        <group ref={exhaustRef} position={[0, -1.05, 0]}>
          {/* Outer flame cone */}
          <mesh ref={flameRef} position={[0, -0.2, 0]}>
            <coneGeometry args={[0.18, 0.55, 24]} />
            <meshBasicMaterial color="#7EB8FF" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          {/* Mid flame */}
          <mesh ref={flame2Ref} position={[0, -0.15, 0]}>
            <coneGeometry args={[0.1, 0.38, 24]} />
            <meshBasicMaterial color="#AADDFF" transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
          {/* Core white flame */}
          <mesh position={[0, -0.08, 0]}>
            <coneGeometry args={[0.045, 0.2, 16]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95} />
          </mesh>
          {/* Glow sphere at nozzle */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#88CCFF" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* === EXHAUST PARTICLES === */}
        <group ref={particleGroupRef}>
          {particles.map((p, i) => (
            <mesh key={i} position={[p.x, p.y, p.z]}>
              <sphereGeometry args={[p.size, 6, 6]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.7} />
            </mesh>
          ))}
        </group>

        {/* Speed lines (streaks during launch) */}
        {launched && [-0.35, -0.1, 0.15, 0.35].map((x, i) => (
          <mesh key={i} position={[x, -0.4 - i * 0.3, (i % 2 === 0 ? 0.15 : -0.15)]}>
            <boxGeometry args={[0.015, 0.25 + i * 0.1, 0.015]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3 - i * 0.05} />
          </mesh>
        ))}
      </group>
    </>
  );
};

export const RocketCanvas: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLaunched(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { threshold: [0.3, 0.7] }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ height: '480px' }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <RocketScene launched={launched} />
      </Canvas>

      {/* Launch status badge */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ${
          launched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="inline-flex items-center gap-2 bg-[#121212]/80 backdrop-blur-md text-[#7EB8FF] text-xs font-bold px-4 py-2 rounded-full border border-[#7EB8FF]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7EB8FF] animate-pulse" />
          Launch sequence initiated
        </span>
      </div>
    </div>
  );
};
