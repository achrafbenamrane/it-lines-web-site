'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { Text } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';

function TimelineNode({ position, isActive, step, title }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      }
    }
    if (glowRef.current && isActive) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial 
          color={isActive ? "#00ff88" : "#333333"} 
          transparent 
          opacity={isActive ? 0.3 : 0.1} 
        />
      </mesh>
      
      {/* Main node */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial 
          color={isActive ? "#00ff88" : "#666666"}
          emissive={isActive ? "#004422" : "#000000"}
        />
      </mesh>
      
      {/* Step number */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color={isActive ? "#00ff88" : "#888888"}
        anchorX="center"
        anchorY="middle"
      >
        {step}
      </Text>
      
      {/* Title */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

function ConnectingLine({ start, end, isActive }: any) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current && isActive) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      if (material) {
        material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      }
    }
  });

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: isActive ? 0x00ff88 : 0x444444,
    transparent: true,
    opacity: isActive ? 0.8 : 0.3
  }));

  return <primitive ref={lineRef} object={line} />;
}

interface Timeline3DProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export default function Timeline3D({ steps }: Timeline3DProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);

  const positions = steps.map((_, i) => [
    (i - (steps.length - 1) / 2) * 3,
    Math.sin((i / steps.length) * Math.PI) * 1,
    0
  ]);

  return (
    <div ref={ref} className="w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[5, 0, 0]} intensity={0.5} color="#00ffff" />
        
        {/* Timeline nodes */}
        {steps.map((step, i) => (
          <TimelineNode
            key={i}
            position={positions[i]}
            isActive={i <= activeStep}
            step={`0${i + 1}`}
            title={step.title}
          />
        ))}
        
        {/* Connecting lines */}
        {positions.slice(0, -1).map((pos, i) => (
          <ConnectingLine
            key={i}
            start={pos}
            end={positions[i + 1]}
            isActive={i < activeStep}
          />
        ))}
        
        {/* Floating particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <mesh key={i} position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5
          ]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
          </mesh>
        ))}
      </Canvas>
      
      {/* Step description overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h4 className="text-cyan-400 font-semibold mb-2">
          Step {activeStep + 1}: {steps[activeStep]?.title}
        </h4>
        <p className="text-gray-300 text-sm">
          {steps[activeStep]?.description}
        </p>
      </div>
    </div>
  );
}