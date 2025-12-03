'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function HologramEffect() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[2, 2, 0.1, 32]} />
      <meshBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingData() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 6 }, (_, i) => (
        <Text
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 1.5,
            0,
            Math.sin((i / 6) * Math.PI * 2) * 1.5
          ]}
          fontSize={0.2}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          {['99.9%', '24/7', 'SECURE', 'FAST', 'RELIABLE', 'SCALABLE'][i]}
        </Text>
      ))}
    </group>
  );
}

interface HolographicDisplayProps {
  testimonial: {
    name: string;
    title: string;
    quote: string;
    rating: number;
  };
}

export default function HolographicDisplay({ testimonial }: HolographicDisplayProps) {
  return (
    <div className="relative w-full h-80 bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      {/* Holographic Effect */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 2, 2]} intensity={0.8} color="#00ffff" />
          
          <HologramEffect />
          <FloatingData />
          
          {/* Central testimonial display */}
          <group position={[0, 0, 0]}>
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={3}
            >
              "{testimonial.quote}"
            </Text>
            
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.1}
              color="#00ffff"
              anchorX="center"
              anchorY="middle"
            >
              {testimonial.name}
            </Text>
            
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.08}
              color="#888888"
              anchorX="center"
              anchorY="middle"
            >
              {testimonial.title}
            </Text>
          </group>
        </Canvas>
      </div>
      
      {/* Holographic border effect */}
      <div className="absolute inset-0 border-2 border-cyan-400 rounded-xl opacity-50 animate-pulse" />
      <div className="absolute inset-2 border border-cyan-300 rounded-lg opacity-30" />
    </div>
  );
}