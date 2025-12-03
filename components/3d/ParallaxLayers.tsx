'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

function FloatingLayer({ depth, color, count = 10 }: { depth: number; color: string; count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = depth + scrollYProgress.get() * depth * 2;
      groupRef.current.rotation.y += 0.001 * depth;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 5
          ]}
        >
          <sphereGeometry args={[0.1 + Math.random() * 0.2]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function MorphingShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  useFrame((state) => {
    if (meshRef.current) {
      const progress = scrollYProgress.get();
      meshRef.current.rotation.x = progress * Math.PI * 2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Morph between shapes based on scroll
      const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.5;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
}

function DataStream() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { scrollYProgress } = useScroll();
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = scrollYProgress.get() * Math.PI;
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
      }
    }
  });

  const positions = [];
  for (let i = 0; i < 100; i++) {
    positions.push(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  return (
    <points geometry={geometry}>
      <pointsMaterial 
        color="#00ffff" 
        size={0.05} 
        transparent 
        opacity={0.6}
      />
    </points>
  );
}

export default function ParallaxLayers() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Multiple parallax layers */}
        <FloatingLayer depth={-5} color="#3b82f6" count={15} />
        <FloatingLayer depth={-10} color="#8b5cf6" count={10} />
        <FloatingLayer depth={-15} color="#ec4899" count={8} />
        
        {/* Morphing shapes */}
        <MorphingShape position={[-5, 3, -8]} />
        <MorphingShape position={[5, -2, -12]} />
        <MorphingShape position={[0, 4, -6]} />
        
        {/* Data stream effect */}
        <DataStream />
        
        {/* Grid background */}
        <gridHelper args={[50, 50, "#333333", "#333333"]} position={[0, -10, -20]} />
      </Canvas>
    </div>
  );
}