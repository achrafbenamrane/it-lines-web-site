'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function ParticleNetwork() {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  
  const { positions, connections } = useMemo(() => {
    const nodeCount = 50;
    const positions = new Float32Array(nodeCount * 3);
    const connections = [];
    
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = Math.sqrt(
          Math.pow(positions[i * 3] - positions[j * 3], 2) +
          Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
          Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
        );
        if (distance < 5) {
          connections.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          connections.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    
    return { positions, connections: new Float32Array(connections) };
  }, []);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.002;
    }
    if (lines.current) {
      lines.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#3b82f6" size={0.1} />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

function MouseInteraction() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.x = (state.mouse.x * 2);
      sphereRef.current.position.y = (state.mouse.y * 2);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ec4899" transparent opacity={0.4} />
    </mesh>
  );
}

export default function Hero3DBackground() {
  const geometries = useMemo(() => [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.OctahedronGeometry(0.7),
    new THREE.TetrahedronGeometry(0.8),
  ], []);

  const shapes = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
      geometry: geometries[Math.floor(Math.random() * geometries.length)],
      color: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)]
    }))
  , [geometries]);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {shapes.map((shape, i) => (
          <FloatingGeometry key={i} {...shape} />
        ))}
        
        <ParticleNetwork />
        <MouseInteraction />
      </Canvas>
    </div>
  );
}