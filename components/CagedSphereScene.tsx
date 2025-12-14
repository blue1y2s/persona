import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScenePhase } from '../types';
import { Mesh, MeshBasicMaterial } from 'three';
import { ContactShadows } from '@react-three/drei';

interface CagedSphereSceneProps {
  scenePhase: ScenePhase;
  onPhaseChange: (next: ScenePhase) => void;
}

const CagedContent: React.FC<CagedSphereSceneProps> = ({ scenePhase, onPhaseChange }) => {
  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);
  
  const [elapsedTime, setElapsedTime] = useState(0);

  useFrame((state, delta) => {
    if (!cubeRef.current || !sphereRef.current) return;

    // Idle Animation
    if (scenePhase === 'caged') {
      cubeRef.current.rotation.y += delta * 0.1;
      cubeRef.current.rotation.x += delta * 0.05;
      
      const breath = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      sphereRef.current.scale.set(breath, breath, breath);
    }

    // Liberation Sequence
    if (scenePhase === 'liberating') {
      const newTime = elapsedTime + delta;
      setElapsedTime(newTime);

      const duration = 1.0; 
      const progress = Math.min(newTime / duration, 1);

      // Expand Cube
      const scale = 1 + progress * 15; 
      cubeRef.current.scale.set(scale, scale, scale);
      cubeRef.current.rotation.y += delta * 5; 

      // Fade out Cube
      if (materialRef.current) {
        materialRef.current.opacity = (1 - progress) * 0.5;
      }

      // Sphere Activation
      const popScale = 1 + Math.sin(progress * Math.PI) * 0.3;
      sphereRef.current.scale.set(popScale, popScale, popScale);

      // Finish
      if (progress >= 1) {
        onPhaseChange('input');
      }
    }
  });

  const handleClick = () => {
    if (scenePhase === 'caged') {
      onPhaseChange('liberating');
    }
  };

  return (
    <group>
      {/* The Cage - Soft Structural Grey */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial 
          ref={materialRef}
          color="#7A7C75" 
          wireframe={true} 
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* The Soul Sphere - Clean White/Daylight */}
      <mesh 
        ref={sphereRef} 
        onClick={handleClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          color="#F4F3EE"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      <ContactShadows opacity={0.3} scale={10} blur={2.5} far={4} color="#7A7C75" />
      
      {/* Studio Lighting - Warm & Soft */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} castShadow />
      <directionalLight position={[-5, 0, -5]} intensity={0.4} color="#ECEDE8" />
    </group>
  );
};

export const CagedSphereScene: React.FC<CagedSphereSceneProps> = (props) => {
  return (
    <div className="w-full h-full relative bg-[#F4F3EE]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['#F4F3EE']} />
        <CagedContent {...props} />
      </Canvas>
      
      {props.scenePhase === 'caged' && (
        <div className="absolute bottom-20 w-full text-center pointer-events-none">
          <div className="inline-block px-6 py-4 rounded-sm bg-[#F4F3EE]/80 border border-[#D3D4CE] shadow-sm">
            <p className="text-[#7A7C75] text-[10px] font-bold tracking-widest uppercase mb-1">Status: Restricted</p>
            <p className="text-[#2F2F2B] text-sm font-medium">Tap subject to release containment</p>
          </div>
        </div>
      )}
    </div>
  );
};