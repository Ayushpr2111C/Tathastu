import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import type { DailyChallenge } from '../../types';
import { Flame, Zap, Brain, Trophy, Sparkles } from 'lucide-react';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface ProgressionSphereProps {
  interactive?: boolean;
}

// 3D Neural Center Sphere
const NeuralCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Volumetric Atmosphere */}
      <Sphere args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.45}
        />
      </Sphere>

      {/* Inner Glowing Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#00f2ff"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Ambient Inner Light */}
      <pointLight color="#06b6d4" intensity={3} distance={10} />
      <pointLight color="#a855f7" intensity={2} distance={8} />
    </group>
  );
};

// Orbiting Day Node Item
const OrbitingNode: React.FC<{
  challenge: DailyChallenge;
  position: [number, number, number];
  onSelect: (challenge: DailyChallenge) => void;
}> = ({ challenge, position, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const statusColor = useMemo(() => {
    if (challenge.status === 'completed') return '#10b981'; // Emerald glow
    if (challenge.status === 'current') return '#f59e0b'; // Pulsing Amber
    return '#334155'; // Glass Slate
  }, [challenge.status]);

  const isCurrent = challenge.status === 'current';

  useFrame((state) => {
    if (meshRef.current && isCurrent) {
      const t = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(challenge);
        }}
      >
        <sphereGeometry args={[challenge.day === 18 ? 0.28 : 0.2, 16, 16]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={challenge.status === 'completed' ? 1.5 : (isCurrent ? 2 : 0.2)}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* HTML Hover Card over Node */}
      {hovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="glass-panel p-3 rounded-xl shadow-2xl border border-cyan-500/40 w-48 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 backdrop-blur-xl bg-slate-950/90 text-xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-cyan-400 font-bold">DAY {challenge.day}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${
                challenge.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                challenge.status === 'current' ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {challenge.status}
              </span>
            </div>
            <p className="font-semibold text-slate-100 line-clamp-1 mb-1">{challenge.title}</p>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>+{challenge.xpReward} XP</span>
              <span className="mx-1">•</span>
              <span>{challenge.difficulty}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Orbit Ring with 60 Nodes
const NodesRing: React.FC<{ onSelectNode: (c: DailyChallenge) => void }> = ({ onSelectNode }) => {
  const { challenges } = useApp();
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.05;
    }
  });

  const nodePositions = useMemo(() => {
    const radius = 3.6;
    return (challenges || []).map((ch, idx) => {
      const angle = (idx / 60) * Math.PI * 4;
      const height = ((idx - 30) / 60) * 3.2;
      const r = radius + Math.sin(idx * 0.5) * 0.2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      return { challenge: ch, pos: [x, height, z] as [number, number, number] };
    });
  }, [challenges]);

  return (
    <group ref={ringRef}>
      {nodePositions.map(({ challenge, pos }) => (
        <OrbitingNode
          key={challenge.day}
          challenge={challenge}
          position={pos}
          onSelect={onSelectNode}
        />
      ))}
    </group>
  );
};

// Particle Dust Field
const ParticleDust: React.FC = () => {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f2ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 2D Neural Orb Fallback Component
const NeuralOrbFallback: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-indigo-500 animate-spin-slow flex items-center justify-center p-1 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-mono text-cyan-300">60-Day Neural Sphere Core</p>
    </div>
  );
};

export const ProgressionSphere3D: React.FC<ProgressionSphereProps> = () => {
  const { user, selectedChallenge, challenges, openSubmissionModal, setSelectedChallenge } = useApp();

  const activeChallenge = selectedChallenge || (challenges && challenges[0]) || {
    day: 1,
    title: 'Glassmorphic Developer Portfolio',
    difficulty: 'Beginner',
    stack: ['HTML5', 'Tailwind CSS'],
    status: 'current'
  };

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 bg-mesh-grid shadow-2xl">
      {/* Ambient background lighting gradient */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-slate-950/80 pointer-events-none" />

      {/* R3F WebGL 3D Canvas with ErrorBoundary */}
      <ErrorBoundary fallback={<NeuralOrbFallback />}>
        <Canvas
          camera={{ position: [0, 1.5, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#a855f7" />

          <NeuralCore />
          <NodesRing onSelectNode={(c) => setSelectedChallenge(c)} />
          <ParticleDust />

          <OrbitControls
            enableZoom={true}
            maxDistance={12}
            minDistance={4}
            autoRotate={false}
            rotateSpeed={0.6}
          />
        </Canvas>
      </ErrorBoundary>

      {/* Floating 3D HUD Glass Overlay Cards */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 pointer-events-none">
        <div className="glass-panel px-3 py-2 rounded-2xl flex items-center gap-2 border border-amber-500/30 backdrop-blur-xl bg-slate-950/70 shadow-lg">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Streak Status</div>
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>🔥 {user.streakDays} Days</span>
              <span className="text-[10px] text-slate-400 font-normal">({user.streakHoursRemaining}h left)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel px-3 py-2 rounded-2xl flex items-center gap-2 border border-cyan-500/30 backdrop-blur-xl bg-slate-950/70 shadow-lg hidden sm:flex">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Progress XP</div>
            <div className="text-xs font-bold text-cyan-300 font-mono">
              {user.currentXP.toLocaleString()} / {user.nextLevelXP.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>

      {/* Floating HUD Card: Currently Active Challenge Preview */}
      {activeChallenge && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-10">
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DAY {activeChallenge.day}
                </span>
                <span className="text-xs text-slate-400 truncate">{activeChallenge.difficulty}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 truncate">{activeChallenge.title}</h4>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span className="truncate">{(activeChallenge.stack || []).join(' • ')}</span>
              </div>
            </div>

            <button
              onClick={() => openSubmissionModal(activeChallenge)}
              className="glass-button-primary px-3.5 py-2 text-xs whitespace-nowrap flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeChallenge.status === 'completed' ? 'View Review' : 'Submit Work'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Helper text overlay */}
      <div className="absolute top-4 right-4 text-[11px] font-mono text-slate-400 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none hidden md:block">
        ✨ Rotate sphere & click day nodes
      </div>
    </div>
  );
};
