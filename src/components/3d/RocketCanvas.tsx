import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Clay material helper ───────────────────────────────────────────
const clayProps = (color: string, emissive = '#000000', emissiveIntensity = 0) => ({
  color,
  roughness: 0.88,
  metalness: 0.0,
  emissive,
  emissiveIntensity,
});

// ─── Outline helper: duplicate mesh scaled up on back side ─────────
const Outline: React.FC<{ scale?: number }> = ({ scale = 1.06 }) => (
  <mesh scale={scale}>
    <sphereGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#2A1F1A" side={THREE.BackSide} transparent opacity={0.0} />
  </mesh>
);

// ─── A single claymorphism sphere with soft outline ─────────────────
const ClayBall: React.FC<{
  position: [number, number, number];
  radius: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  outlineScale?: number;
}> = ({ position, radius, color, emissive = '#000', emissiveIntensity = 0, outlineScale = 1.09 }) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial {...clayProps(color, emissive, emissiveIntensity)} />
    </mesh>
    {/* Clay outline */}
    <mesh scale={outlineScale}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial color="#1A1010" side={THREE.BackSide} transparent opacity={0.18} />
    </mesh>
  </group>
);

// ─── Clay Cylinder with outline ─────────────────────────────────────
const ClayCylinder: React.FC<{
  position: [number, number, number];
  args: [number, number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  rotation?: [number, number, number];
}> = ({ position, args, color, emissive = '#000', emissiveIntensity = 0, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <cylinderGeometry args={args} />
      <meshStandardMaterial {...clayProps(color, emissive, emissiveIntensity)} />
    </mesh>
    <mesh scale={1.07}>
      <cylinderGeometry args={args} />
      <meshBasicMaterial color="#1A1010" side={THREE.BackSide} transparent opacity={0.16} />
    </mesh>
  </group>
);

// ─── Clay Cone with outline ─────────────────────────────────────────
const ClayCone: React.FC<{
  position: [number, number, number];
  args: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}> = ({ position, args, color, emissive = '#000', emissiveIntensity = 0 }) => (
  <group position={position}>
    <mesh>
      <coneGeometry args={args} />
      <meshStandardMaterial {...clayProps(color, emissive, emissiveIntensity)} />
    </mesh>
    <mesh scale={1.08}>
      <coneGeometry args={args} />
      <meshBasicMaterial color="#1A1010" side={THREE.BackSide} transparent opacity={0.16} />
    </mesh>
  </group>
);

// ─── Main Rocket Scene ───────────────────────────────────────────────
interface RocketSceneProps { launched: boolean }

const RocketScene: React.FC<RocketSceneProps> = ({ launched }) => {
  const rocketRef   = useRef<THREE.Group>(null);
  const flameRef    = useRef<THREE.Group>(null);
  const cloudRef    = useRef<THREE.Group>(null);
  const sparkGroupRef = useRef<THREE.Group>(null);

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
      const bob   = Math.sin(t * 1.2) * 0.07;
      const tilt  = Math.sin(t * 0.8) * 0.025;
      rocketRef.current.position.y  = -0.1 + bob + ease * 5.5;
      rocketRef.current.rotation.z  = tilt - ease * 0.05;
      rocketRef.current.rotation.y  = t * 0.25;
    }

    // Flame pulsing
    if (flameRef.current) {
      const flicker = 0.88 + Math.random() * 0.24;
      const intensity = 0.25 + ease * 1.1;
      flameRef.current.scale.y = flicker * intensity;
      flameRef.current.scale.x = flicker * (0.7 + ease * 0.5);
      flameRef.current.scale.z = flicker * (0.7 + ease * 0.5);
      flameRef.current.position.y = -1.15 - ease * 0.08;
    }

    // Cloud puff
    if (cloudRef.current) {
      cloudRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        m.position.y -= delta * (0.15 + (i % 4) * 0.08) * (0.4 + ease * 2.0);
        m.position.x += Math.sin(t * 3 + i * 1.4) * delta * 0.12;
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity -= delta * (0.35 + ease * 0.7);
        if (mat.opacity <= 0.05 || m.position.y < -3.2) {
          m.position.set(
            (Math.random() - 0.5) * 0.55,
            -1.0 - Math.random() * 0.3,
            (Math.random() - 0.5) * 0.55,
          );
          mat.opacity = 0.55 + Math.random() * 0.3;
        }
      });
    }

    // Sparks
    if (sparkGroupRef.current) {
      sparkGroupRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        const speed = 0.4 + (i % 5) * 0.15;
        m.position.y -= delta * speed * (1.0 + ease * 3.0);
        m.position.x += Math.sin(t * 4 + i * 2.1) * delta * 0.3;
        m.position.z += Math.cos(t * 3.5 + i * 1.7) * delta * 0.2;
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity -= delta * 1.5;
        if (mat.opacity <= 0 || m.position.y < -2.5) {
          m.position.set(
            (Math.random() - 0.5) * 0.2,
            -0.95 - Math.random() * 0.15,
            (Math.random() - 0.5) * 0.2,
          );
          mat.opacity = 0.9 + Math.random() * 0.1;
        }
      });
    }
  });

  // ── Clouds: soft white puffy spheres ──────────────────────────────
  const cloudPuffs = Array.from({ length: 24 }, (_, i) => ({
    x: (Math.random() - 0.5) * 0.6,
    y: -1.0 - Math.random() * 0.4,
    z: (Math.random() - 0.5) * 0.6,
    r: 0.06 + Math.random() * 0.1,
    op: 0.5 + Math.random() * 0.35,
  }));

  // ── Sparks: tiny colored dots ─────────────────────────────────────
  const sparkColors = ['#FFCC44', '#FF8844', '#FFAAAA', '#FFE066', '#FF6622'];
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    x: (Math.random() - 0.5) * 0.22,
    y: -0.97 - Math.random() * 0.1,
    z: (Math.random() - 0.5) * 0.22,
    r: 0.018 + Math.random() * 0.022,
    color: sparkColors[i % sparkColors.length],
  }));

  // ── Café palette clays ─────────────────────────────────────────────
  const BODY    = '#F2DDD0'; // warm cream
  const NOSE    = '#C87A4B'; // coffee copper
  const FIN     = '#D46A43'; // terracotta
  const WINDOW  = '#5A9B88'; // sage teal
  const ENGINE  = '#E8C9B4'; // light peach
  const PAD     = '#EDE8DF'; // off-white pad
  const STRIPE  = '#E4A882'; // light copper

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.8, 6.0]} fov={38} />

      {/* ── Soft clay lighting ────────────────────────────────────── */}
      <ambientLight intensity={1.1} color="#FFF5EE" />
      <directionalLight position={[3, 6, 4]}  intensity={2.2} color="#FFF2E8" castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={1.0} color="#E8D5C8" />
      <pointLight position={[0, -1, 2]}       intensity={3.5} color="#FFCC88" />
      <pointLight position={[0, 4, 3]}        intensity={1.5} color="#FFE8D8" />

      {/* ── Launch Pad ────────────────────────────────────────────── */}
      <group position={[0, -1.85, 0]}>
        {/* Main platform — rounded box */}
        <RoundedBox args={[2.6, 0.18, 1.8]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial {...clayProps(PAD)} />
        </RoundedBox>
        {/* Outline */}
        <mesh position={[0, 0, 0]} scale={1.04}>
          <boxGeometry args={[2.6, 0.18, 1.8]} />
          <meshBasicMaterial color="#1A1010" side={THREE.BackSide} transparent opacity={0.12} />
        </mesh>

        {/* Browser dots row */}
        {[[-0.9, '#FF7B7B'], [-0.65, '#FFCC66'], [-0.4, '#88D497']].map(([x, col]) => (
          <ClayBall key={x} position={[x as number, 0.13, 0.72]} radius={0.06} color={col as string} />
        ))}

        {/* Rounded content lines */}
        {[0.25, -0.05, -0.3].map((z, i) => (
          <RoundedBox key={i} args={[1.8, 0.055, 0.1]} radius={0.025} smoothness={4} position={[i === 0 ? -0.1 : 0, 0.09, z]}>
            <meshStandardMaterial {...clayProps(i === 0 ? STRIPE : '#D8D0C8')} />
          </RoundedBox>
        ))}

        {/* 4 Stubby feet */}
        {[[-0.8, 0.7], [0.8, 0.7], [-0.8, -0.7], [0.8, -0.7]].map(([x, z], i) => (
          <ClayCylinder key={i} position={[x, -0.22, z]} args={[0.07, 0.07, 0.28, 16]} color={STRIPE} />
        ))}

        {/* Center launch ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <ringGeometry args={[0.2, 0.28, 32]} />
          <meshStandardMaterial {...clayProps(STRIPE)} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── ROCKET GROUP ────────────────────────────────────────────── */}
      <group ref={rocketRef} position={[0, -0.1, 0]}>

        {/* == BODY == */}
        <group position={[0, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.28, 0.31, 1.4, 40]} />
            <meshStandardMaterial {...clayProps(BODY)} />
          </mesh>
          {/* Clay body outline */}
          <mesh scale={1.065}>
            <cylinderGeometry args={[0.28, 0.31, 1.4, 40]} />
            <meshBasicMaterial color="#2A1A10" side={THREE.BackSide} transparent opacity={0.18} />
          </mesh>
        </group>

        {/* == COPPER STRIPE around body == */}
        <group position={[0, 0.15, 0]}>
          <mesh>
            <cylinderGeometry args={[0.285, 0.285, 0.22, 32]} />
            <meshStandardMaterial {...clayProps(STRIPE, NOSE, 0.05)} />
          </mesh>
        </group>

        {/* == NOSE CONE == (puffy, rounded) */}
        <group position={[0, 0.98, 0]}>
          <mesh>
            <coneGeometry args={[0.28, 0.72, 40]} />
            <meshStandardMaterial {...clayProps(NOSE, '#B06030', 0.04)} />
          </mesh>
          <mesh scale={1.07}>
            <coneGeometry args={[0.28, 0.72, 40]} />
            <meshBasicMaterial color="#2A1010" side={THREE.BackSide} transparent opacity={0.18} />
          </mesh>
          {/* Nose tip ball for roundness */}
          <ClayBall position={[0, 0.35, 0]} radius={0.1} color={NOSE} emissive="#AA5520" emissiveIntensity={0.04} outlineScale={1.1} />
        </group>

        {/* == WINDOW porthole == */}
        <ClayBall position={[0, 0.32, 0.25]} radius={0.115} color={WINDOW} emissive="#3A8070" emissiveIntensity={0.2} outlineScale={1.12} />
        {/* Window rim */}
        <ClayBall position={[0, 0.32, 0.22]} radius={0.15} color={BODY} outlineScale={1.05} />
        {/* Reflection dot on window */}
        <ClayBall position={[-0.04, 0.37, 0.36]} radius={0.03} color="#FFFFFF" outlineScale={1.0} />

        {/* == 4 FINS == (rounded, puffy) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <group position={[0.33, -0.55, 0]} rotation={[0, 0, 0.18]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.14, 0.52, 20]} />
                <meshStandardMaterial {...clayProps(FIN, '#AA4020', 0.03)} />
              </mesh>
              <mesh scale={1.08}>
                <cylinderGeometry args={[0.04, 0.14, 0.52, 20]} />
                <meshBasicMaterial color="#2A1010" side={THREE.BackSide} transparent opacity={0.16} />
              </mesh>
              {/* Fin tip ball */}
              <ClayBall position={[0, -0.25, 0]} radius={0.075} color={FIN} outlineScale={1.1} />
            </group>
          </group>
        ))}

        {/* == ENGINE BELL == */}
        <group position={[0, -0.78, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.24, 0.26, 32]} />
            <meshStandardMaterial {...clayProps(ENGINE)} />
          </mesh>
          <mesh scale={1.08}>
            <cylinderGeometry args={[0.15, 0.24, 0.26, 32]} />
            <meshBasicMaterial color="#1A0A00" side={THREE.BackSide} transparent opacity={0.16} />
          </mesh>
          {/* Nozzle ball bottom */}
          <ClayBall position={[0, -0.16, 0]} radius={0.13} color={STRIPE} outlineScale={1.09} />
        </group>

        {/* == EXHAUST FLAME == (clay-style soft cones) */}
        <group ref={flameRef} position={[0, -1.15, 0]}>
          {/* Outer puff — soft orange */}
          <mesh position={[0, -0.22, 0]}>
            <coneGeometry args={[0.22, 0.65, 32]} />
            <meshStandardMaterial color="#FF9944" roughness={0.9} metalness={0} transparent opacity={0.82} side={THREE.DoubleSide} />
          </mesh>
          {/* Mid puff — yellow */}
          <mesh position={[0, -0.16, 0]}>
            <coneGeometry args={[0.14, 0.48, 32]} />
            <meshStandardMaterial color="#FFDD33" roughness={0.9} metalness={0} transparent opacity={0.88} side={THREE.DoubleSide} />
          </mesh>
          {/* Inner core — cream white */}
          <mesh position={[0, -0.08, 0]}>
            <coneGeometry args={[0.07, 0.28, 24]} />
            <meshStandardMaterial color="#FFF8EE" roughness={0.95} metalness={0} transparent opacity={0.95} />
          </mesh>
          {/* Glow ball at nozzle */}
          <ClayBall position={[0, 0.04, 0]} radius={0.14} color="#FFBB55" emissive="#FF8800" emissiveIntensity={0.6} outlineScale={1.0} />
        </group>

        {/* == CLOUD PUFFS == */}
        <group ref={cloudRef}>
          {cloudPuffs.map((c, i) => (
            <mesh key={i} position={[c.x, c.y, c.z]}>
              <sphereGeometry args={[c.r, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.95} metalness={0} transparent opacity={c.op} />
            </mesh>
          ))}
        </group>

        {/* == SPARKS == */}
        <group ref={sparkGroupRef}>
          {sparks.map((s, i) => (
            <mesh key={i} position={[s.x, s.y, s.z]}>
              <sphereGeometry args={[s.r, 8, 8]} />
              <meshBasicMaterial color={s.color} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>

        {/* Decorative body dots */}
        {[0.5, -0.1].map((y, i) => (
          <ClayBall key={i} position={[0.27, y, 0.1]} radius={0.04} color={STRIPE} outlineScale={1.05} />
        ))}
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
      {/* Soft clay background gradient */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'radial-gradient(ellipse at 60% 40%, #FBE8D8 0%, #F0E4D4 40%, #E8DDD0 100%)',
        zIndex: 0,
      }} />

      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          shadows
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
        <span className="inline-flex items-center gap-2 bg-[#C87A4B] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          🚀 Launching order to kitchen...
        </span>
      </div>
    </div>
  );
};
