import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';
import { MemorySphere } from '../types';

interface MemorySphereMeshProps {
  data: MemorySphere;
}

export const MemorySphereMesh: React.FC<MemorySphereMeshProps> = ({ data }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Random phase for independent floating
  const phase = useRef(Math.random() * 100);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Organic floating motion
    meshRef.current.position.y = data.position[1] + Math.sin(time + phase.current) * 0.15;
    meshRef.current.position.x = data.position[0] + Math.cos(time * 0.5 + phase.current) * 0.05;
    
    // Gentle rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.z = time * 0.05;

    const targetScale = hovered ? 1.4 : 1;
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[data.radius, 64, 64]} />
      {/* Frosted Glass / Jelly Look */}
      <meshPhysicalMaterial 
        color={data.color} 
        emissive={data.color}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        roughness={0.15}
        metalness={0.1}
        transmission={0.6} // Glass-like transparency
        thickness={1.5}    // Volume refraction
        clearcoat={1.0}    // Shiny coating
        clearcoatRoughness={0.1}
      />
      
      {hovered && (
        <Html distanceFactor={15}>
          <div className="glass-panel text-white p-4 w-64 rounded-xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100">
            <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
               <span className="text-[10px] uppercase tracking-widest text-teal-300 font-bold">{data.post.category}</span>
               <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{backgroundColor: data.color, color: data.color}}></div>
            </div>
            <p className="text-sm font-serif italic text-slate-100 leading-relaxed">"{data.post.originalText}"</p>
          </div>
        </Html>
      )}
    </mesh>
  );
};