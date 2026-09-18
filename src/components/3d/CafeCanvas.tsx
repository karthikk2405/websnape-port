import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  // Load the downloaded GLB model
  const { scene } = useGLTF('/cafe-misti.glb');
  return <primitive object={scene} />;
};

// Camera animator to handle the continuous cinematic panning and zooming
const CameraRig = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Pan left and right slightly (-2 to 2)
    const x = Math.sin(time * 0.2) * 2;
    // Oscillate the Z position (zoom) between 8 and 12
    const z = 10 + Math.cos(time * 0.3) * 2;
    // Keep camera at eye level
    const targetPosition = new THREE.Vector3(x, 1.5, z);
    
    state.camera.position.lerp(targetPosition, 0.05);
    state.camera.lookAt(0, 0.5, 0); // Look at the center of the window
  });
  return null;
};

export const CafeCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className || "w-full aspect-[4/3] max-w-[600px] rounded-[28px] overflow-hidden bg-[#111114] shadow-[0_0_40px_rgba(0,240,255,0.1)] border border-white/5 relative cursor-grab active:cursor-grabbing"}>
      <Canvas shadows camera={{ position: [0, 2, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight 
            castShadow 
            position={[5, 10, 5]} 
            intensity={1.5} 
            shadow-mapSize={[1024, 1024]} 
          />
          <Environment preset="city" />
          
          <PresentationControls
            global
            rotation={[0.1, -0.3, 0]}
            polar={[-0.1, Math.PI / 6]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Center>
              <group rotation={[0, -Math.PI / 2, 0]}>
                <Model />
              </group>
            </Center>
          </PresentationControls>
          
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model so it's ready quickly
useGLTF.preload('/cafe-misti.glb');
