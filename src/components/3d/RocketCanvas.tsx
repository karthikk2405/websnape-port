import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Premium Metallic & Glass Materials ─────────────────────────────
const metallicProps = (color: string) => ({
  color,
  metalness: 0.85,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
});

const glassProps = (color: string) => ({
  color,
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.9,
  ior: 1.5,
  thickness: 0.5,
  transparent: true,
  opacity: 1,
});

const glowProps = (color: string) => ({
  color,
  emissive: color,
  emissiveIntensity: 2.0,
  toneMapped: false,
});

// ─── Main Rocket Scene ───────────────────────────────────────────────
interface RocketSceneProps { launched: boolean }

const RocketScene: React.FC<RocketSceneProps> = ({ launched }) => {
  const rocketRef   = useRef<THREE.Group>(null);
  const flameRef    = useRef<THREE.Group>(null);
  const cloudRef    = useRef<THREE.Group>(null);
  const sparkGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const progress  = useRef(0);
  const idleT     = useRef(0);

  useFrame((state, delta) => {
    idleT.current += delta;
    const t = idleT.current;

    if (launched) progress.current = Math.min(progress.current + delta * 0.55, 1);
    else          progress.current = Math.max(progress.current - delta * 0.4,  0);

    const p = progress.current;
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    // Rocket idle float + launch rise
    if (rocketRef.current) {
      const bob   = Math.sin(t * 1.5) * 0.05;
      const tilt  = Math.sin(t * 1.0) * 0.02;
      rocketRef.current.position.y  = -0.1 + bob + ease * 5.5;
      rocketRef.current.rotation.z  = tilt - ease * 0.05;
      rocketRef.current.rotation.y  = t * 0.3;
    }

    // Flame pulsing
    if (flameRef.current) {
      const flicker = 0.85 + Math.random() * 0.3;
      const intensity = 0.3 + ease * 1.2;
      flameRef.current.scale.setScalar(flicker * intensity);
      flameRef.current.position.y = -1.1 - ease * 0.1;
    }

    // Cloud puff
    if (cloudRef.current) {
      cloudRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        m.position.y -= delta * (0.2 + (i % 4) * 0.1) * (0.5 + ease * 2.5);
        m.position.x += Math.sin(t * 3 + i * 1.4) * delta * 0.15;
        const mat = m.material as THREE.MeshPhysicalMaterial;
        mat.opacity -= delta * (0.4 + ease * 0.8);
        if (mat.opacity <= 0.05 || m.position.y < -3.5) {
          m.position.set(
            (Math.random() - 0.5) * 0.6,
            -1.0 - Math.random() * 0.4,
            (Math.random() - 0.5) * 0.6,
          );
          mat.opacity = 0.6 + Math.random() * 0.4;
        }
      });
    }

    // Sparks
    if (sparkGroupRef.current) {
      sparkGroupRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        const speed = 0.5 + (i % 5) * 0.2;
        m.position.y -= delta * speed * (1.2 + ease * 3.5);
        m.position.x += Math.sin(t * 5 + i * 2.1) * delta * 0.4;
        m.position.z += Math.cos(t * 4 + i * 1.7) * delta * 0.3;
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity -= delta * 1.8;
        if (mat.opacity <= 0 || m.position.y < -2.8) {
          m.position.set(
            (Math.random() - 0.5) * 0.25,
            -0.95 - Math.random() * 0.2,
            (Math.random() - 0.5) * 0.25,
          );
          mat.opacity = 0.9 + Math.random() * 0.1;
        }
      });
    }

    // Rotate platform ring
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  // ── Clouds
  const cloudPuffs = Array.from({ length: 30 }, () => ({
    x: (Math.random() - 0.5) * 0.7,
    y: -1.0 - Math.random() * 0.5,
    z: (Math.random() - 0.5) * 0.7,
    r: 0.05 + Math.random() * 0.12,
    op: 0.5 + Math.random() * 0.4,
  }));

  // ── Sparks
  const sparkColors = ['#FF44FF', '#4488FF', '#44FFFF', '#FFFFFF'];
  const sparks = Array.from({ length: 25 }, (_, i) => ({
    x: (Math.random() - 0.5) * 0.25,
    y: -0.97 - Math.random() * 0.15,
    z: (Math.random() - 0.5) * 0.25,
    r: 0.015 + Math.random() * 0.02,
    color: sparkColors[i % sparkColors.length],
  }));

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.8, 6.0]} fov={38} />

      {/* ── High-end Studio Lighting ────────────────────────────────────── */}
      <ambientLight intensity={0.4} color="#FFFFFF" />
      <directionalLight position={[5, 10, 5]} intensity={3.5} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#7EB8FF" />
      <pointLight position={[0, -1, 2]} intensity={5.0} color="#FF44FF" />
      <pointLight position={[0, 2, 4]} intensity={2.0} color="#44FFFF" />

      {/* ── Glass Platform ────────────────────────────────────────────── */}
      <group position={[0, -1.85, 0]}>
        {/* Main Glass Plate */}
        <RoundedBox args={[2.6, 0.08, 1.8]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial {...glassProps('#FFFFFF')} />
        </RoundedBox>

        {/* Browser dots row */}
        {[[-0.9, '#FF5F56'], [-0.7, '#FFBD2E'], [-0.5, '#27C93F']].map(([x, col]) => (
          <mesh key={x} position={[x as number, 0.06, 0.72]}>
            <sphereGeometry args={[0.04, 32, 32]} />
            <meshPhysicalMaterial {...metallicProps(col as string)} />
          </mesh>
        ))}

        {/* Content lines */}
        {[0.25, -0.05, -0.3].map((z, i) => (
          <RoundedBox key={i} args={[1.8, 0.02, 0.1]} radius={0.01} smoothness={4} position={[i === 0 ? -0.1 : 0, 0.05, z]}>
            <meshPhysicalMaterial {...metallicProps('#D0D8E0')} opacity={0.5} transparent />
          </RoundedBox>
        ))}

        {/* Glowing Platform Ring */}
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[0.2, 0.22, 64]} />
          <meshBasicMaterial {...glowProps('#4488FF')} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── PREMIUM ROCKET GROUP ────────────────────────────────────────────── */}
      <group ref={rocketRef} position={[0, -0.1, 0]}>

        {/* == METALLIC BODY == */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.28, 1.4, 64]} />
          <meshPhysicalMaterial {...metallicProps('#E2E8F0')} />
        </mesh>

        {/* == GLOWING STRIPE == */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.255, 0.255, 0.08, 64]} />
          <meshBasicMaterial {...glowProps('#44FFFF')} />
        </mesh>

        {/* == BLUE METALLIC NOSE CONE == */}
        <mesh position={[0, 0.98, 0]}>
          <coneGeometry args={[0.25, 0.65, 64]} />
          <meshPhysicalMaterial {...metallicProps('#3B82F6')} />
        </mesh>

        {/* == GLASS WINDOW == */}
        <group position={[0, 0.35, 0.23]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
            <meshPhysicalMaterial {...glassProps('#88CCFF')} />
          </mesh>
          {/* Window Rim */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.015, 16, 64]} />
            <meshPhysicalMaterial {...metallicProps('#FFFFFF')} />
          </mesh>
        </group>

        {/* == 4 FINS (Metallic Purple/Blue) == */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.3, -0.55, 0]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.18, 0.45, 0.03]} />
              <meshPhysicalMaterial {...metallicProps('#8B5CF6')} />
            </mesh>
          </group>
        ))}

        {/* == ENGINE NOZZLE == */}
        <mesh position={[0, -0.78, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.2, 64]} />
          <meshPhysicalMaterial {...metallicProps('#64748B')} />
        </mesh>

        {/* == EXHAUST FLAME == */}
        <group ref={flameRef} position={[0, -1.05, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.18, 0.5, 32]} />
            <meshBasicMaterial color="#FF44FF" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <coneGeometry args={[0.1, 0.35, 32]} />
            <meshBasicMaterial color="#44FFFF" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
          </mesh>
        </group>

        {/* == CLOUD PUFFS == */}
        <group ref={cloudRef}>
          {cloudPuffs.map((c, i) => (
            <mesh key={i} position={[c.x, c.y, c.z]}>
              <sphereGeometry args={[c.r, 32, 32]} />
              <meshPhysicalMaterial {...glassProps('#FFFFFF')} transmission={0.5} roughness={0.4} opacity={c.op} />
            </mesh>
          ))}
        </group>

        {/* == SPARKS == */}
        <group ref={sparkGroupRef}>
          {sparks.map((s, i) => (
            <mesh key={i} position={[s.x, s.y, s.z]}>
              <sphereGeometry args={[s.r, 16, 16]} />
              <meshBasicMaterial {...glowProps(s.color)} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
};

// ─── Canvas Export ───────────────────────────────────────────────────
export const RocketCanvas: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setLaunched(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0.25, 0.6] }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative select-none" style={{ height: '500px' }}>
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <RocketScene launched={launched} />
        </Canvas>
      </div>

      {/* Launch status pill */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${
          launched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <span className="inline-flex items-center gap-2 bg-[#121212]/80 backdrop-blur-md text-[#44FFFF] border border-[#44FFFF]/30 text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(68,255,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#44FFFF] animate-pulse" />
          SYSTEM LAUNCH INITIATED
        </span>
      </div>
    </div>
  );
};
