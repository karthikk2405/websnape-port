import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Cartoon/Claymorphism Materials ─────────────────────────────
const clay = (color: string, roughness = 0.88, metalness = 0.02) => ({
  color,
  roughness,
  metalness,
});

// A helper component for thick cartoon outlines
const OutlinedMesh: React.FC<{
  geometry: THREE.BufferGeometry;
  materialProps: THREE.MeshStandardMaterialParameters;
  outlineScale?: [number, number, number] | number;
  outlineColor?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}> = ({
  geometry,
  materialProps,
  outlineScale = 1.06,
  outlineColor = '#1A1A1A',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const oScale: [number, number, number] = Array.isArray(outlineScale)
    ? outlineScale
    : [outlineScale, outlineScale, outlineScale];
  const mScale: [number, number, number] = Array.isArray(scale)
    ? scale
    : [scale, scale, scale];

  return (
    <group position={position} rotation={rotation} scale={mScale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh geometry={geometry} scale={oScale}>
        <meshBasicMaterial color={outlineColor} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// ─── Cloud Puff ───────────────────────────────────────────────
const CloudPuff: React.FC<{
  basePos: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  launched: boolean;
}> = ({ basePos, radius, speed, phase, launched }) => {
  const meshRef = useRef<THREE.Group>(null);
  const geo = useMemo(() => new THREE.SphereGeometry(radius, 16, 16), [radius]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    const bob = Math.sin(t) * 0.03;
    const pulse = 1.0 + (launched ? Math.sin(t * 3) * 0.2 : Math.sin(t * 1.5) * 0.06);
    meshRef.current.position.y = basePos[1] + bob;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={meshRef} position={basePos}>
      <mesh geometry={geo}>
        <meshStandardMaterial {...clay('#FFFFFF', 0.95)} />
      </mesh>
      <mesh geometry={geo} scale={1.06}>
        <meshBasicMaterial color="#1A1A1A" side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// ─── Main Rocket Scene ───────────────────────────────────────────────
interface RocketSceneProps {
  launched: boolean;
  onClick: () => void;
}

const RocketScene: React.FC<RocketSceneProps> = ({ launched, onClick }) => {
  const rocketRef = useRef<THREE.Group>(null);
  const flameRef  = useRef<THREE.Group>(null);

  const progress = useRef(0);
  const idleT    = useRef(0);

  // Palette from user reference image
  const COLORS = {
    body: '#FFFFFF',
    nose: '#EF3333',
    fin: '#0088DD',
    rim: '#333333',
    glass: '#66CCFF',
    nozzle: '#2A2A2A',
    flameOuter: '#EE3311',
    flameMid: '#FF8811',
    flameInner: '#FFDD22',
    outline: '#141414',
  };

  // Pre-create and memoize all geometries so they are NEVER re-instantiated
  const bodyGeo = useMemo(() => new THREE.CylinderGeometry(0.32, 0.44, 1.15, 32), []);
  const bodyTopCapGeo = useMemo(() => new THREE.SphereGeometry(0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), []);
  const noseGeo = useMemo(() => new THREE.ConeGeometry(0.33, 0.6, 32), []);
  const noseRingGeo = useMemo(() => new THREE.CylinderGeometry(0.335, 0.335, 0.035, 32), []);
  const rivetGeo = useMemo(() => new THREE.SphereGeometry(0.016, 8, 8), []);

  const windowTorusGeo = useMemo(() => new THREE.TorusGeometry(0.14, 0.03, 16, 32), []);
  const windowGlassGeo = useMemo(() => new THREE.CylinderGeometry(0.135, 0.135, 0.02, 32), []);
  const highlightGeo = useMemo(() => new THREE.CapsuleGeometry(0.012, 0.07, 4, 8), []);

  const nozzleGeo = useMemo(() => new THREE.CylinderGeometry(0.22, 0.32, 0.2, 32), []);

  // Cartoon swooping fin shape matching reference image
  const finShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.22);
    s.bezierCurveTo(0.22, 0.12, 0.44, -0.1, 0.46, -0.42);
    s.quadraticCurveTo(0.4, -0.5, 0.32, -0.44);
    s.bezierCurveTo(0.22, -0.26, 0.1, -0.24, 0, -0.24);
    s.closePath();
    return s;
  }, []);

  const finGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(finShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    geo.center();
    return geo;
  }, [finShape]);

  // Flame layers
  const outerFlameGeo = useMemo(() => new THREE.ConeGeometry(0.2, 0.7, 32), []);
  const midFlameGeo   = useMemo(() => new THREE.ConeGeometry(0.13, 0.48, 32), []);
  const innerFlameGeo = useMemo(() => new THREE.ConeGeometry(0.07, 0.26, 32), []);

  // Launch pad base
  const padGeo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.28, 0.14, 32), []);

  useFrame((_, delta) => {
    idleT.current += delta;
    const t = idleT.current;

    // Smooth transition between grounded/hovering and launched flight
    if (launched) progress.current = Math.min(progress.current + delta * 0.8, 1);
    else          progress.current = Math.max(progress.current - delta * 0.6, 0);

    const p = progress.current;
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    // Rocket animation - ALWAYS KEPT IN VIEW!
    // Grounded idle: subtle bob at y = -0.25 (sitting on launch smoke)
    // Launched: lifts up gracefully to y = +0.15 (comfortably centered with plenty of top breathing room)
    if (rocketRef.current) {
      const rumble = launched ? (Math.random() - 0.5) * 0.018 : 0;
      const bob    = Math.sin(t * (launched ? 3.5 : 2.0)) * (launched ? 0.06 : 0.035);
      const tilt   = Math.sin(t * 1.6) * (launched ? 0.07 : 0.02) + (launched ? -0.05 : 0);
      // Gentle yaw sway (always facing forward towards camera)
      const yaw    = Math.sin(t * (launched ? 1.4 : 0.8)) * 0.22;

      rocketRef.current.position.y = -0.26 + ease * 0.42 + bob + rumble;
      rocketRef.current.position.x = rumble * 0.5 + (launched ? Math.sin(t * 1.2) * 0.05 : 0);
      rocketRef.current.rotation.z = tilt;
      rocketRef.current.rotation.y = yaw;
    }

    // Flame flicker and boost
    if (flameRef.current) {
      const flicker = 0.85 + Math.random() * 0.3;
      const lengthMult = 0.55 + ease * 1.0;
      const widthMult  = 0.8 + ease * 0.25;
      flameRef.current.scale.set(flicker * widthMult, flicker * lengthMult, flicker * widthMult);
    }
  });

  return (
    <>
      {/* Generous framing so the rocket is always completely visible */}
      <PerspectiveCamera makeDefault position={[0, 0.05, 4.8]} fov={38} />

      {/* ── Soft Clay Lighting ────────────────────────────────────── */}
      <ambientLight intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[4, 7, 4]} intensity={2.2} color="#FFFFFF" castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#E8F2FF" />
      <pointLight position={[0, -0.7, 1.4]} intensity={launched ? 6.5 : 2.5} color="#FF7700" />

      {/* ── Launch Platform ───────────────────────────────────────── */}
      <group position={[0, -1.35, 0]}>
        <OutlinedMesh
          geometry={padGeo}
          materialProps={clay('#E8E6DF', 0.9)}
          outlineScale={[1.04, 1.15, 1.04]}
        />
        {/* Yellow hazard ring */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.65, 0.78, 32]} />
          <meshBasicMaterial color="#E5A823" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── Cloud Puffs (Launchpad Smoke) ─────────────────────────── */}
      <group position={[0, -1.18, 0]}>
        <CloudPuff basePos={[-0.55, 0.05, 0.35]} radius={0.2} speed={1.2} phase={0} launched={launched} />
        <CloudPuff basePos={[0.55, 0.08, 0.3]} radius={0.22} speed={1.1} phase={1.2} launched={launched} />
        <CloudPuff basePos={[-0.4, 0.02, -0.45]} radius={0.18} speed={1.3} phase={2.4} launched={launched} />
        <CloudPuff basePos={[0.45, 0.04, -0.35]} radius={0.19} speed={1.0} phase={3.5} launched={launched} />
        <CloudPuff basePos={[0, 0.1, 0.5]} radius={0.24} speed={1.4} phase={4.8} launched={launched} />
        <CloudPuff basePos={[0, 0.05, -0.55]} radius={0.21} speed={1.2} phase={5.9} launched={launched} />
      </group>

      {/* ── CLAY CARTOON ROCKET ───────────────────────────────────── */}
      <group
        ref={rocketRef}
        position={[0, -0.26, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {/* == WHITE FUSELAGE / BODY == */}
        <group position={[0, 0, 0]}>
          <OutlinedMesh
            geometry={bodyGeo}
            materialProps={clay(COLORS.body, 0.82)}
            outlineScale={[1.045, 1.015, 1.045]}
          />
          {/* Top curve cap for smooth rounded nose junction */}
          <group position={[0, 0.575, 0]}>
            <OutlinedMesh
              geometry={bodyTopCapGeo}
              materialProps={clay(COLORS.body, 0.82)}
              outlineScale={1.05}
            />
          </group>
        </group>

        {/* == RED NOSE CONE == */}
        <group position={[0, 0.88, 0]}>
          <OutlinedMesh
            geometry={noseGeo}
            materialProps={clay(COLORS.nose, 0.8)}
            outlineScale={[1.05, 1.04, 1.05]}
          />
        </group>

        {/* == BLACK SEPARATION RING & RIVETS == */}
        <group position={[0, 0.58, 0]}>
          <OutlinedMesh
            geometry={noseRingGeo}
            materialProps={clay(COLORS.outline, 0.9)}
            outlineScale={1.03}
          />
        </group>

        {/* Rivet dots around top of white body */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 0.335;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          return (
            <mesh key={i} geometry={rivetGeo} position={[x, 0.5, z]}>
              <meshBasicMaterial color={COLORS.outline} />
            </mesh>
          );
        })}

        {/* == PORTHOLE WINDOW (Always facing forward) == */}
        <group position={[0, 0.1, 0.37]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Black Outer Rim */}
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
            <meshBasicMaterial color="#141414" />
          </mesh>
          {/* Dark Charcoal Inner Rim */}
          <mesh position={[0, 0.005, 0]}>
            <cylinderGeometry args={[0.165, 0.165, 0.04, 32]} />
            <meshStandardMaterial {...clay('#383B40', 0.6)} />
          </mesh>
          {/* Vibrant Sky Blue Glass */}
          <mesh position={[0, 0.012, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.04, 32]} />
            <meshStandardMaterial {...clay('#38BDF8', 0.25, 0.05)} />
          </mesh>
          {/* Glossy Specular Highlight Pill */}
          <mesh position={[-0.04, 0.035, 0.04]} rotation={[0, 0, Math.PI / 4]}>
            <capsuleGeometry args={[0.012, 0.06, 4, 8]} />
            <meshBasicMaterial color="#FFFFFF" opacity={0.9} transparent />
          </mesh>
        </group>

        {/* == 3 SWOOPING CYAN/BLUE FINS == */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <group position={[0.32, -0.4, 0]}>
              <OutlinedMesh
                geometry={finGeo}
                materialProps={clay(COLORS.fin, 0.75)}
                outlineScale={1.08}
              />
            </group>
          </group>
        ))}

        {/* == ENGINE NOZZLE == */}
        <group position={[0, -0.66, 0]}>
          <OutlinedMesh
            geometry={nozzleGeo}
            materialProps={clay(COLORS.nozzle, 0.85)}
            outlineScale={[1.06, 1.05, 1.06]}
          />
        </group>

        {/* == 3-TIER EXHAUST FLAME == */}
        <group ref={flameRef} position={[0, -0.78, 0]} rotation={[Math.PI, 0, 0]}>
          {/* Outer Red Flame */}
          <group position={[0, 0.35, 0]}>
            <OutlinedMesh
              geometry={outerFlameGeo}
              materialProps={clay(COLORS.flameOuter, 0.6)}
              outlineScale={1.06}
            />
          </group>
          {/* Mid Orange Flame */}
          <group position={[0, 0.24, 0]}>
            <OutlinedMesh
              geometry={midFlameGeo}
              materialProps={clay(COLORS.flameMid, 0.5)}
              outlineScale={1.08}
            />
          </group>
          {/* Inner Yellow Flame */}
          <group position={[0, 0.13, 0]}>
            <OutlinedMesh
              geometry={innerFlameGeo}
              materialProps={clay(COLORS.flameInner, 0.4)}
              outlineScale={1.1}
            />
          </group>
        </group>

      </group>
    </>
  );
};

// ─── Rocket Canvas Container ─────────────────────────────────────────
export const RocketCanvas: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Auto-launch gently when scrolled into view
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setLaunched(true);
        }
      },
      { threshold: [0.35] }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[480px] sm:h-[520px] rounded-3xl bg-gradient-to-b from-[#FAF8F5] via-[#F3EFE9] to-[#ECE7DE] border border-black/10 shadow-inner relative overflow-hidden flex items-center justify-center select-none"
    >
      {/* Subtle backdrop grid & soft spotlight */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#C87A4B 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FFEEDD] blur-3xl opacity-60 pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-pointer" style={{ zIndex: 1 }} title="Click to Launch or Land Rocket">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <RocketScene launched={launched} onClick={() => setLaunched(!launched)} />
        </Canvas>
      </div>

      {/* Interactive Launch Button / Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-auto">
        <button
          type="button"
          onClick={() => setLaunched(!launched)}
          className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border text-xs font-mono font-bold shadow-md transition-all active:scale-95 whitespace-nowrap ${
            launched
              ? 'bg-[#121212] text-white border-black/20 hover:bg-[#2A2A2A]'
              : 'bg-white/90 text-[#121212] border-black/15 hover:bg-white hover:border-[#C87A4B]'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              launched ? 'bg-[#EF3333] animate-pulse shadow-[0_0_8px_#EF3333]' : 'bg-[#4A6B5D]'
            }`}
          />
          <span>{launched ? '🔥 THRUSTERS ACTIVE • CLICK TO LAND' : '🚀 CLICK TO LAUNCH'}</span>
        </button>
      </div>
    </div>
  );
};

