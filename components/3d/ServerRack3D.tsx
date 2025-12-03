'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ServerUnit({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material && material.emissive) {
        material.emissive.setHex(
          Math.sin(time + position[1]) > 0.5 ? 0x001100 : 0x000000
        );
      }
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* LED indicators */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[0.8 - i * 0.2, 0.2, 0.51]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color={Math.random() > 0.5 ? "#00ff00" : "#ff0000"} />
        </mesh>
      ))}
    </group>
  );
}

function CircuitBoard() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  
  // Create circuit pattern
  for (let i = 0; i < 50; i++) {
    const x = (Math.random() - 0.5) * 4;
    const y = (Math.random() - 0.5) * 6;
    const z = -0.6;
    
    positions.push(x, y, z);
    positions.push(x + (Math.random() - 0.5) * 0.5, y + (Math.random() - 0.5) * 0.5, z);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  useFrame((state) => {
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
      }
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
    </lineSegments>
  );
}

export default function ServerRack3D() {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 4, 2]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-2, -2, 2]} intensity={0.5} color="#0066ff" />
        
        {/* Server Rack */}
        <group>
          {Array.from({ length: 8 }, (_, i) => (
            <ServerUnit 
              key={i} 
              position={[0, 2 - i * 0.5, 0]} 
              color={i % 2 === 0 ? "#333333" : "#444444"} 
            />
          ))}
        </group>
        
        {/* Circuit Board Background */}
        <CircuitBoard />
        
        {/* Interactive Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={isRotating}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
      >
        {isRotating ? 'Stop' : 'Rotate'}
      </button>
    </div>
  );
}