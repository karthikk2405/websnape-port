import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Global Café Hub Locations
const HUBS = [
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
];

function latLngToVector(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Animated arc that pulses with a moving dot
const AnimatedArc: React.FC<{ startHub: typeof HUBS[0]; endHub: typeof HUBS[0]; color: string; delay: number }> = ({ startHub, endHub, color, delay }) => {
  const dotRef = useRef<THREE.Mesh>(null);
  const GLOBE_RADIUS = 2.2;

  const curve = useMemo(() => {
    const start = latLngToVector(startHub.lat, startHub.lng, GLOBE_RADIUS);
    const end = latLngToVector(endHub.lat, endHub.lng, GLOBE_RADIUS);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.5);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startHub, endHub]);

  const linePoints = useMemo(() => curve.getPoints(80), [curve]);
  const lineGeom = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);

  useFrame((state) => {
    if (!dotRef.current) return;
    const t = ((state.clock.getElapsedTime() * 0.3 + delay) % 1 + 1) % 1;
    const pos = curve.getPoint(t);
    dotRef.current.position.copy(pos);
  });

  return (
    <group>
      <primitive object={new THREE.Line(lineGeom, new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.45,
      }))} />
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

const GlobeScene: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const outerRing1Ref = useRef<THREE.Mesh>(null);
  const outerRing2Ref = useRef<THREE.Mesh>(null);
  const GLOBE_RADIUS = 2.2;

  // Fine lat/lng grid
  const gridLineObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    const radius = GLOBE_RADIUS + 0.005;
    const mat = new THREE.LineBasicMaterial({ color: 0xC87A4B, transparent: true, opacity: 0.18 });
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 3) pts.push(latLngToVector(lat, lng, radius));
      objects.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }
    for (let lng = -180; lng < 180; lng += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 3) pts.push(latLngToVector(lat, lng, radius));
      objects.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }
    return objects;
  }, []);

  // Particle cloud around globe
  const cloudParticles = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const r = GLOBE_RADIUS + 1.0;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const jitter = (Math.random() - 0.5) * 0.8;
      positions[i * 3] = (r + jitter) * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (r + jitter) * Math.cos(phi);
      positions[i * 3 + 2] = (r + jitter) * Math.sin(phi) * Math.sin(theta);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.18;
      globeGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.06;
    }
    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.z += delta * 0.22;
    }
    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.x -= delta * 0.15;
      outerRing2Ref.current.rotation.y += delta * 0.1;
    }
  });

  const arcPairs = [
    { start: HUBS[0], end: HUBS[2], color: '#C87A4B', delay: 0 },
    { start: HUBS[1], end: HUBS[5], color: '#4A6B5D', delay: 0.3 },
    { start: HUBS[3], end: HUBS[6], color: '#D46A43', delay: 0.6 },
    { start: HUBS[4], end: HUBS[7], color: '#C87A4B', delay: 0.15 },
    { start: HUBS[2], end: HUBS[3], color: '#4A6B5D', delay: 0.5 },
    { start: HUBS[6], end: HUBS[0], color: '#D46A43', delay: 0.8 },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 7.0]} fov={42} />

      {/* Lighting: Key + fill + rim for cinematic depth */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 6, 4]} intensity={2.0} color="#FFF5E8" />
      <pointLight position={[-6, 4, -4]} intensity={3.5} color="#C87A4B" />
      <pointLight position={[4, -5, 6]} intensity={2.0} color="#4A6B5D" />
      <pointLight position={[0, 8, 0]} intensity={1.5} color="#FFE4CC" />

      {/* Stars field for depth */}
      <Stars radius={30} depth={50} count={3000} factor={2} saturation={0.3} fade speed={0.5} />

      {/* Rotating globe group */}
      <group ref={globeGroupRef}>
        {/* Core dark metallic globe */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
          <meshPhysicalMaterial
            color="#0E0C0A"
            roughness={0.08}
            metalness={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Grid lines */}
        <group>
          {gridLineObjects.map((l, i) => <primitive key={i} object={l} />)}
        </group>

        {/* Animated arcs with moving dots */}
        {arcPairs.map((arc, i) => (
          <AnimatedArc key={i} startHub={arc.start} endHub={arc.end} color={arc.color} delay={arc.delay} />
        ))}

        {/* Hub pins */}
        {HUBS.map((hub) => {
          const pos = latLngToVector(hub.lat, hub.lng, GLOBE_RADIUS + 0.05);
          return (
            <group key={hub.name} position={pos}>
              <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#C87A4B" />
              </mesh>
              {/* Ping ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.07, 0.1, 32]} />
                <meshBasicMaterial color="#C87A4B" side={THREE.DoubleSide} transparent opacity={0.7} />
              </mesh>
            </group>
          );
        })}

        {/* Inner atmosphere glow */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS + 0.08, 64, 64]} />
          <meshBasicMaterial color="#C87A4B" side={THREE.BackSide} transparent opacity={0.06} />
        </mesh>
      </group>

      {/* Outer atmosphere shell (not rotating with globe for parallax) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.35, 64, 64]} />
        <meshBasicMaterial color="#C87A4B" side={THREE.BackSide} transparent opacity={0.04} />
      </mesh>

      {/* Large glow halo */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.75, 32, 32]} />
        <meshBasicMaterial color="#8A4A20" side={THREE.BackSide} transparent opacity={0.025} />
      </mesh>

      {/* Orbital tech ring 1 — counter-rotating */}
      <mesh ref={outerRing1Ref} rotation={[Math.PI / 3.5, 0.3, 0]}>
        <torusGeometry args={[GLOBE_RADIUS + 0.65, 0.013, 16, 120]} />
        <meshBasicMaterial color="#C87A4B" transparent opacity={0.55} />
      </mesh>

      {/* Orbital tech ring 2 */}
      <mesh ref={outerRing2Ref} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[GLOBE_RADIUS + 1.05, 0.009, 16, 120]} />
        <meshBasicMaterial color="#4A6B5D" transparent opacity={0.4} />
      </mesh>

      {/* Particle dust cloud */}
      <points geometry={cloudParticles}>
        <pointsMaterial size={0.018} color="#C87A4B" transparent opacity={0.5} sizeAttenuation />
      </points>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.35}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3.5}
      />
    </>
  );
};

export const HeroOrbCanvas: React.FC = () => (
  <div className="w-full h-full absolute inset-0 pointer-events-auto z-0 overflow-hidden">
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <GlobeScene />
    </Canvas>
  </div>
);
