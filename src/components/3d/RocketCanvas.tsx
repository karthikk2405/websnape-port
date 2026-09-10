import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Cartoon/Claymorphism Materials ─────────────────────────────
const clayProps = (color: string) => ({
  color,
  roughness: 0.9,
  metalness: 0.0,
});

// A helper component to add a thick black cartoon outline to any geometry
const Outline: React.FC<{ scale?: number; geometry: THREE.BufferGeometry }> = ({ scale = 1.05, geometry }) => (
  <mesh scale={scale} geometry={geometry}>
    <meshBasicMaterial color="#1A1A1A" side={THREE.BackSide} />
  </mesh>
);

// ─── Main Rocket Scene ───────────────────────────────────────────────
interface RocketSceneProps { launched: boolean }

const RocketScene: React.FC<RocketSceneProps> = ({ launched }) => {
  const rocketRef   = useRef<THREE.Group>(null);
  const flameRef    = useRef<THREE.Group>(null);
  const cloudRef    = useRef<THREE.Group>(null);

  const progress  = useRef(0);
  const idleT     = useRef(0);

  // Pre-create geometries for outlines
  const bodyGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const noseGeo = new THREE.ConeGeometry(0.26, 0.4, 32);
  const windowRimGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 32);
  const windowGlassGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.05, 32);
  const nozzleGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.15, 32);
  const finGeo = new THREE.ConeGeometry(0.08, 0.6, 32);
  
  const outerFlameGeo = new THREE.ConeGeometry(0.18, 0.6, 32);
  const midFlameGeo = new THREE.ConeGeometry(0.12, 0.4, 32);
  const innerFlameGeo = new THREE.ConeGeometry(0.06, 0.2, 32);

  useFrame((state, delta) => {
    idleT.current += delta;
    const t = idleT.current;

    if (launched) progress.current = Math.min(progress.current + delta * 0.55, 1);
    else          progress.current = Math.max(progress.current - delta * 0.4,  0);

    const p = progress.current;
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    // Rocket idle float + launch rise
    if (rocketRef.current) {
      const bob   = Math.sin(t * 2) * 0.05;
      const tilt  = Math.sin(t * 1.5) * 0.02;
      rocketRef.current.position.y  = -0.1 + bob + ease * 5.5;
      rocketRef.current.rotation.z  = tilt - ease * 0.05;
      rocketRef.current.rotation.y  = t * 0.3;
    }

    // Flame pulsing
    if (flameRef.current) {
      const flicker = 0.85 + Math.random() * 0.3;
      const intensity = 0.5 + ease * 1.0;
      flameRef.current.scale.set(flicker, flicker * intensity, flicker);
      flameRef.current.position.y = -0.9 - ease * 0.1;
    }

    // Cloud puff
    if (cloudRef.current) {
      cloudRef.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        m.position.y -= delta * (0.2 + (i % 4) * 0.1) * (0.5 + ease * 2.5);
        m.position.x += Math.sin(t * 3 + i * 1.4) * delta * 0.15;
        const mat = m.material as THREE.MeshStandardMaterial;
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
  });

  // ── Clouds
  const cloudPuffs = Array.from({ length: 20 }, () => ({
    x: (Math.random() - 0.5) * 0.8,
    y: -1.0 - Math.random() * 0.5,
    z: (Math.random() - 0.5) * 0.8,
    r: 0.1 + Math.random() * 0.15,
    op: 0.5 + Math.random() * 0.4,
  }));

  // Colors from reference image
  const COLORS = {
    body: '#FFFFFF',
    nose: '#FF1111',
    fin: '#2288DD',
    rim: '#444444',
    glass: '#88CCFF',
    nozzle: '#555555',
    flameOuter: '#EE3311',
    flameMid: '#FF8811',
    flameInner: '#FFDD44',
    outline: '#1A1A1A'
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.8, 6.0]} fov={35} />

      {/* ── Soft Clay Lighting ────────────────────────────────────── */}
      <ambientLight intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[5, 8, 5]} intensity={2.0} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={1.0} color="#E8F0FF" />
      <pointLight position={[0, -1, 2]} intensity={3.0} color="#FF8811" />

      {/* ── Platform ────────────────────────────────────────────── */}
      <group position={[0, -1.85, 0]}>
        <RoundedBox args={[2.4, 0.12, 1.6]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial {...clayProps('#EAEAEA')} />
        </RoundedBox>
        <mesh position={[0, 0, 0]} scale={1.03}>
          <boxGeometry args={[2.4, 0.12, 1.6]} />
          <meshBasicMaterial color={COLORS.outline} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* ── CLAY CARTOON ROCKET ────────────────────────────────────────────── */}
      <group ref={rocketRef} position={[0, 0.1, 0]}>

        {/* == CHUBBY BODY (Scaled Sphere) == */}
        <group position={[0, 0, 0]} scale={[1, 1.8, 1]}>
          <mesh geometry={bodyGeo}>
            <meshStandardMaterial {...clayProps(COLORS.body)} />
          </mesh>
          <Outline geometry={bodyGeo} scale={1.04} />
        </group>

        {/* == RED NOSE CONE == */}
        <group position={[0, 0.72, 0]}>
          <mesh geometry={noseGeo}>
            <meshStandardMaterial {...clayProps(COLORS.nose)} />
          </mesh>
          <Outline geometry={noseGeo} scale={1.05} />
        </group>

        {/* == RIVETS (Dots around nose) == */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 0.25;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          return (
            <mesh key={i} position={[x, 0.55, z]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshBasicMaterial color={COLORS.outline} />
            </mesh>
          );
        })}

        {/* == WINDOW == */}
        <group position={[0, 0.15, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Rim */}
          <mesh geometry={windowRimGeo}>
            <meshStandardMaterial {...clayProps(COLORS.rim)} />
          </mesh>
          <Outline geometry={windowRimGeo} scale={1.15} />
          {/* Glass */}
          <mesh geometry={windowGlassGeo} position={[0, 0.01, 0]}>
            <meshStandardMaterial {...clayProps(COLORS.glass)} />
          </mesh>
          <Outline geometry={windowGlassGeo} scale={1.0} />
          {/* Highlight line on glass */}
          <mesh position={[-0.04, 0.02, 0.04]} rotation={[0, 0, Math.PI / 4]}>
            <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
            <meshBasicMaterial color="#FFFFFF" opacity={0.6} transparent />
          </mesh>
        </group>

        {/* == 4 CURVED BLUE FINS == */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* We use a cone rotated and bent outwards to look like a curved fin */}
            <group position={[0.25, -0.4, 0]} rotation={[0, 0, -0.4]}>
              <mesh geometry={finGeo}>
                <meshStandardMaterial {...clayProps(COLORS.fin)} />
              </mesh>
              <Outline geometry={finGeo} scale={1.1} />
            </group>
          </group>
        ))}

        {/* == DARK GREY NOZZLE == */}
        <group position={[0, -0.65, 0]}>
          <mesh geometry={nozzleGeo}>
            <meshStandardMaterial {...clayProps(COLORS.nozzle)} />
          </mesh>
          <Outline geometry={nozzleGeo} scale={1.08} />
        </group>

        {/* == EXHAUST FLAME (3 Layers, sharp cones with outlines) == */}
        <group ref={flameRef} position={[0, -0.9, 0]}>
          {/* Outer Red */}
          <group position={[0, -0.1, 0]}>
            <mesh geometry={outerFlameGeo}>
              <meshStandardMaterial {...clayProps(COLORS.flameOuter)} />
            </mesh>
            <Outline geometry={outerFlameGeo} scale={1.08} />
          </group>
          {/* Mid Orange */}
          <group position={[0, -0.05, 0]}>
            <mesh geometry={midFlameGeo}>
              <meshStandardMaterial {...clayProps(COLORS.flameMid)} />
            </mesh>
            <Outline geometry={midFlameGeo} scale={1.1} />
          </group>
          {/* Inner Yellow */}
          <group position={[0, 0, 0]}>
            <mesh geometry={innerFlameGeo}>
              <meshStandardMaterial {...clayProps(COLORS.flameInner)} />
            </mesh>
            <Outline geometry={innerFlameGeo} scale={1.15} />
          </group>
        </group>

        {/* == CLOUD PUFFS (Smoke) == */}
        <group ref={cloudRef}>
          {cloudPuffs.map((c, i) => (
            <group key={i} position={[c.x, c.y, c.z]}>
              <mesh>
                <sphereGeometry args={[c.r, 16, 16]} />
                <meshStandardMaterial {...clayProps('#FFFFFF')} transparent opacity={c.op} />
              </mesh>
              <mesh scale={1.05}>
                <sphereGeometry args={[c.r, 16, 16]} />
                <meshBasicMaterial color={COLORS.outline} side={THREE.BackSide} transparent opacity={c.op * 0.8} />
              </mesh>
            </group>
          ))}
        </group>

      </group>
    </>
  );
};

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
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <RocketScene launched={launched} />
        </Canvas>
      </div>

      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${
          launched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <span className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white border-2 border-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg" style={{ fontFamily: 'monospace' }}>
          <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
          LAUNCH SEQUENCE INITIATED
        </span>
      </div>
    </div>
  );
};
