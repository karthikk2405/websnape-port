import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Global Café Hub Locations (lat, lng, label)
const HUBS = [
  { name: 'Tokyo Café', lat: 35.6762, lng: 139.6503 },
  { name: 'New York Bakery', lat: 40.7128, lng: -74.006 },
  { name: 'London Roastery', lat: 51.5074, lng: -0.1278 },
  { name: 'Mumbai Bistro', lat: 19.076, lng: 72.8777 },
  { name: 'Sydney Espresso', lat: -33.8688, lng: 151.2093 },
  { name: 'Paris Patisserie', lat: 48.8566, lng: 2.3522 },
  { name: 'San Francisco Lounge', lat: 37.7749, lng: -122.4194 }
];

function latLngToVector(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const GlobeScene: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const particleRingRef = useRef<THREE.Points>(null);

  const GLOBE_RADIUS = 2.2;

  // Generate Lat/Lng Grids with Warm Copper/Amber Color
  const gridLineObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    const radius = GLOBE_RADIUS + 0.01;
    const material = new THREE.LineBasicMaterial({ color: 0xC87A4B, transparent: true, opacity: 0.3 });

    for (let lat = -60; lat <= 60; lat += 20) {
      const points: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 5) {
        points.push(latLngToVector(lat, lng, radius));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      objects.push(new THREE.Line(geom, material));
    }

    for (let lng = -180; lng < 180; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(latLngToVector(lat, lng, radius));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      objects.push(new THREE.Line(geom, material));
    }

    return objects;
  }, [GLOBE_RADIUS]);

  // Generate 3D Data Bezier Arcs with Warm Copper & Sage Colors
  const arcObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    const radius = GLOBE_RADIUS;

    for (let i = 0; i < HUBS.length; i++) {
      const start = latLngToVector(HUBS[i].lat, HUBS[i].lng, radius);
      const end = latLngToVector(HUBS[(i + 2) % HUBS.length].lat, HUBS[(i + 2) % HUBS.length].lng, radius);

      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(radius + dist * 0.45);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xC87A4B : 0x4A6B5D,
        transparent: true,
        opacity: 0.8
      });

      objects.push(new THREE.Line(geom, mat));
    }

    return objects;
  }, [GLOBE_RADIUS]);

  // Orbital Particles
  const ringParticles = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    const radius = GLOBE_RADIUS + 0.8;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [GLOBE_RADIUS]);

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.25;
      globeGroupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
    }
    if (particleRingRef.current) {
      particleRingRef.current.rotation.y -= delta * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7.2]} fov={45} />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={3.0} color="#C87A4B" />
      <pointLight position={[-10, -10, -5]} intensity={2.5} color="#4A6B5D" />
      <pointLight position={[0, 5, 5]} intensity={1.8} color="#D46A43" />

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
        <group ref={globeGroupRef}>
          {/* Inner Glossy Espresso Globe Base */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
            <meshPhysicalMaterial
              color="#161311"
              roughness={0.15}
              metalness={0.85}
              clearcoat={1}
              clearcoatRoughness={0.1}
              reflectivity={0.9}
              transmission={0.2}
              ior={1.5}
            />
          </mesh>

          {/* Latitude & Longitude Grid */}
          <group>
            {gridLineObjects.map((lineObj, idx) => (
              <primitive key={idx} object={lineObj} />
            ))}
          </group>

          {/* Bezier Arcs */}
          <group>
            {arcObjects.map((arcObj, idx) => (
              <primitive key={idx} object={arcObj} />
            ))}
          </group>

          {/* Café Hub Location Pins */}
          {HUBS.map((hub) => {
            const pos = latLngToVector(hub.lat, hub.lng, GLOBE_RADIUS + 0.04);
            return (
              <group key={hub.name} position={pos}>
                <mesh>
                  <sphereGeometry args={[0.045, 16, 16]} />
                  <meshBasicMaterial color="#C87A4B" />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.06, 0.085, 32]} />
                  <meshBasicMaterial color="#4A6B5D" side={THREE.DoubleSide} transparent opacity={0.85} />
                </mesh>
              </group>
            );
          })}

          {/* Atmosphere Halo */}
          <mesh ref={atmosphereRef} position={[0, 0, 0]}>
            <sphereGeometry args={[GLOBE_RADIUS + 0.15, 64, 64]} />
            <meshBasicMaterial
              color="#C87A4B"
              side={THREE.BackSide}
              transparent
              opacity={0.15}
            />
          </mesh>

          {/* Outer Tech Rings */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[GLOBE_RADIUS + 0.6, 0.012, 16, 100]} />
            <meshBasicMaterial color="#C87A4B" transparent opacity={0.4} />
          </mesh>

          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[GLOBE_RADIUS + 0.9, 0.008, 16, 100]} />
            <meshBasicMaterial color="#4A6B5D" transparent opacity={0.3} />
          </mesh>

          {/* Particle Dust */}
          <points ref={particleRingRef} geometry={ringParticles}>
            <pointsMaterial size={0.03} color="#C87A4B" transparent opacity={0.75} sizeAttenuation />
          </points>
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export const HeroOrbCanvas: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-auto z-0 overflow-hidden">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <GlobeScene />
      </Canvas>
    </div>
  );
};
