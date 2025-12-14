import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { MemorySphere } from '../types';
import { MemorySphereMesh } from './MemorySphereMesh';
import { AvatarDisplay } from './AvatarDisplay';

interface PersonaUniverseProps {
  spheres: MemorySphere[];
}

export const PersonaUniverse: React.FC<PersonaUniverseProps> = ({ spheres }) => {
  return (
    <div className="w-full h-full relative bg-[#020617]">
      <Canvas
        camera={{ position: [0, 2, 16], fov: 35 }}
        gl={{ antialias: true, toneMappingExposure: 1.2 }}
        shadows
      >
        <color attach="background" args={['#020617']} />
        {/* Deep Space Atmosphere */}
        <fog attach="fog" args={['#020617', 8, 35]} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} color="#2dd4bf" />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -5, 5]} intensity={1.0} color="#2dd4bf" />
        <spotLight 
            position={[0, 15, 0]} 
            angle={0.6} 
            penumbra={1} 
            intensity={1.5} 
            color="#f472b6" 
            castShadow
        />
        
        <group position={[0, -1, 0]}>
          {spheres.map(sphere => (
            <MemorySphereMesh key={sphere.id} data={sphere} />
          ))}
          <AvatarDisplay spheres={spheres} />
        </group>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={8} 
          maxDistance={25}
          autoRotate={spheres.length > 0}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};