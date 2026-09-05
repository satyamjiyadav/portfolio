import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../audio/soundEffects';

// Node type definition
interface SystemNode {
  name: string;
  role: string;
  position: [number, number, number];
  color: string;
  size: number;
}

const NODES: SystemNode[] = [
  { name: 'API Gateway', role: 'Ingress & Auth', position: [0, 2.2, 0], color: '#00f2fe', size: 0.35 },
  { name: 'Event Stream', role: 'Apache Kafka', position: [2.2, 0.8, 0.5], color: '#0c8ce9', size: 0.33 },
  { name: 'Worker Fleet', role: 'Distributed Tasks', position: [-2.2, 0.8, -0.5], color: '#10b981', size: 0.33 },
  { name: 'Vector Engine', role: 'PGVector & AI', position: [1.8, -1.5, 0.8], color: '#8b5cf6', size: 0.32 },
  { name: 'ACID Storage', role: 'PostgreSQL Store', position: [-1.8, -1.5, -0.8], color: '#f59e0b', size: 0.32 },
  { name: 'In-Memory Cache', role: 'Redis Key-Value', position: [0, -2.2, 0], color: '#ec4899', size: 0.33 }
];

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Background particles
  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.3;
      wireRef.current.rotation.z += delta * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Background Starfield Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Quantum Event Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef} onClick={() => sound.playClick()}>
          <icosahedronGeometry args={[0.95, 2]} />
          <meshStandardMaterial
            color="#0c8ce9"
            emissive="#00f2fe"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Shield */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#00f2fe"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbit Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>

        {/* Central Core Label */}
        <Html distanceFactor={9} position={[0, 0, 0]} center>
          <div className="pointer-events-none select-none flex flex-col items-center">
            <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase text-cyan-200 bg-black/80 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_12px_rgba(0,242,254,0.4)]">
              SYSTEM KERNEL
            </span>
            <span className="text-[7px] font-mono text-cyan-300/70 tracking-wider mt-0.5">
              DISTRIBUTED CORE
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function ConnectionLines() {
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    NODES.forEach((node) => {
      // Connect each node to center [0,0,0]
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(...node.position));
      // Connect adjacent nodes
      const nextIndex = (NODES.indexOf(node) + 1) % NODES.length;
      points.push(new THREE.Vector3(...node.position));
      points.push(new THREE.Vector3(...NODES[nextIndex].position));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={linesGeometry}>
      <lineBasicMaterial color="#0284c7" transparent opacity={0.25} />
    </lineSegments>
  );
}

function SatelliteNodes() {
  return (
    <group>
      {NODES.map((node, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <group position={node.position}>
            {/* Pulsing Outer Aura */}
            <mesh>
              <sphereGeometry args={[node.size * 1.5, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={0.15}
                wireframe
              />
            </mesh>

            {/* Inner Solid Node */}
            <mesh
              onClick={() => {
                sound.playPacketTravel();
              }}
            >
              <sphereGeometry args={[node.size, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.7}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            {/* Futuristic Node Label */}
            <Html distanceFactor={10} position={[0, node.size + 0.25, 0]} center>
              <div className="pointer-events-none select-none flex flex-col items-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase text-white bg-black/70 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                  {node.name}
                </span>
                <span className="text-[8px] font-mono text-cyan-300/80">
                  {node.role}
                </span>
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth mouse parallax interpolation
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (-state.pointer.y * Math.PI) / 8;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#0c8ce9" />
      <pointLight position={[0, 0, 5]} intensity={1.8} color="#ffffff" />
      
      <CentralCore />
      <ConnectionLines />
      <SatelliteNodes />
    </group>
  );
}

export default function Hero3DCore() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>

      {/* Floating Status Badge */}
      <div className="absolute bottom-3 right-4 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Distributed Core: Active [6 Nodes Synchronized]
      </div>
    </div>
  );
}
