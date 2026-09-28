import React, { useState, useEffect, useRef } from 'react';
import { Accessory } from '../../types';

export type CharacterState = 
  | 'idle' 
  | 'focus' 
  | 'success' 
  | 'levelUp' 
  | 'streak' 
  | 'complete' 
  | 'support' 
  | 'welcome';

interface FreyaCharacterProps {
  size?: 'sm' | 'md' | 'lg';
  state?: CharacterState;
  equippedAccessory?: Accessory;
  onPoke?: () => void;
  isWiggling?: boolean;
  className?: string;
}

export const FreyaCharacter: React.FC<FreyaCharacterProps> = ({
  size = 'md',
  state = 'idle',
  equippedAccessory,
  onPoke,
  isWiggling = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Eye dimensions and positions based on scale
  const sizeConfig = {
    sm: {
      wrapper: 'w-20 h-20',
      imgScale: 'scale-125 translate-y-1.5',
      eyeWidth: 10,
      eyeHeight: 12,
      leftEye: { top: '35%', left: '40%' },
      rightEye: { top: '34%', left: '55%' },
      pupilSize: 5.5,
      maxMovement: 2.2,
      accessorySize: 'w-6 h-6 text-sm -top-1 -right-1',
    },
    md: {
      wrapper: 'w-36 h-36 sm:w-40 sm:h-40',
      imgScale: 'scale-125 translate-y-2.5',
      eyeWidth: 18,
      eyeHeight: 20,
      leftEye: { top: '36%', left: '41%' },
      rightEye: { top: '35%', left: '56%' },
      pupilSize: 10,
      maxMovement: 3.8,
      accessorySize: 'w-9 h-9 text-lg -top-1 -right-1',
    },
    lg: {
      wrapper: 'w-48 h-48 sm:w-56 sm:h-56',
      imgScale: 'scale-125 translate-y-3',
      eyeWidth: 24,
      eyeHeight: 26,
      leftEye: { top: '36%', left: '41%' },
      rightEye: { top: '35%', left: '56%' },
      pupilSize: 13,
      maxMovement: 5.2,
      accessorySize: 'w-11 h-11 text-xl -top-1 -right-1',
    }
  }[size];

  // Mouse move listener to track gaze
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.38; // eye level

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance === 0) {
        targetPosRef.current = { x: 0, y: 0 };
        return;
      }

      // Constrain inside maxMovement radius
      const factor = Math.min(1, distance / 350); // scales smoothly with distance
      const angle = Math.atan2(dy, dx);
      const moveDist = factor * sizeConfig.maxMovement;

      // Special state overrides
      if (state === 'focus') {
        // Eyes look slightly downward toward current task
        targetPosRef.current = {
          x: Math.cos(angle) * moveDist * 0.6,
          y: Math.abs(Math.sin(angle) * moveDist) * 0.5 + sizeConfig.maxMovement * 0.5
        };
      } else {
        targetPosRef.current = {
          x: Math.cos(angle) * moveDist,
          y: Math.sin(angle) * moveDist,
        };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, sizeConfig.maxMovement, state]);

  // Smooth lerp loop (linear interpolation for natural human-like eye easing)
  useEffect(() => {
    if (prefersReducedMotion) {
      setPupilPos({ x: 0, y: 0 });
      return;
    }

    const updateLoop = () => {
      const lerpFactor = 0.14; // gentle smooth follow
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * lerpFactor;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * lerpFactor;

      setPupilPos({
        x: Math.round(currentPosRef.current.x * 100) / 100,
        y: Math.round(currentPosRef.current.y * 100) / 100,
      });

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [prefersReducedMotion]);

  // Periodic natural blinking
  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeoutId: number;
    const scheduleBlink = () => {
      const interval = Math.random() * 3500 + 3500; // blink every 3.5 to 7 seconds
      timeoutId = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 130);
      }, interval);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // State halo visual ring styling
  const stateHalo = {
    idle: 'ring-4 ring-amber-300/40 shadow-amber-200/50',
    focus: 'ring-4 ring-indigo-400/50 shadow-indigo-300/60',
    success: 'ring-4 ring-emerald-400/60 shadow-emerald-200/60 animate-bounce-subtle',
    levelUp: 'ring-4 ring-purple-400/80 shadow-purple-300/80 animate-pulse',
    streak: 'ring-4 ring-orange-400/70 shadow-orange-300/70',
    complete: 'ring-4 ring-emerald-300/60 shadow-emerald-200/50',
    support: 'ring-4 ring-teal-300/50 shadow-teal-200/50',
    welcome: 'ring-4 ring-pink-300/50 shadow-pink-200/50',
  }[state];

  return (
    <div 
      ref={containerRef}
      onClick={onPoke}
      className={`relative select-none cursor-pointer group transition-all duration-300 ${
        isWiggling ? 'animate-wiggle scale-105' : 'hover:scale-102 active:scale-95'
      } ${className}`}
      title="Click or tap Freya to interact!"
    >
      {/* Outer circular frame */}
      <div className={`${sizeConfig.wrapper} rounded-full overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50/60 to-purple-50/40 border-4 border-white shadow-xl ${stateHalo} flex items-center justify-center relative`}>
        
        {/* The character image asset */}
        <img 
          src="/character.png" 
          alt="Freya Companion"
          className={`w-full h-full object-cover object-top ${sizeConfig.imgScale} transition-transform duration-500 group-hover:scale-130`}
          draggable={false}
        />

        {/* Dynamic Eye Tracking Overlays */}
        {/* Left Eye Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: sizeConfig.leftEye.top,
            left: sizeConfig.leftEye.left,
            width: `${sizeConfig.eyeWidth}px`,
            height: `${sizeConfig.eyeHeight}px`,
            transform: `translate(-50%, -50%) ${isBlinking || state === 'complete' ? 'scaleY(0.08)' : 'scaleY(1)'}`,
            transition: 'transform 0.08s ease-in-out',
            transformOrigin: 'center 60%',
            pointerEvents: 'none',
          }}
          className="rounded-full overflow-hidden"
        >
          {/* Sclera & Iris Pupil */}
          <div className="w-full h-full relative rounded-full flex items-center justify-center bg-white/20">
            <div 
              style={{
                width: `${sizeConfig.pupilSize}px`,
                height: `${sizeConfig.pupilSize}px`,
                transform: `translate3d(${pupilPos.x}px, ${pupilPos.y}px, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.04s ease-out',
              }}
              className="rounded-full bg-gradient-to-br from-[#533423] via-[#311c12] to-[#120a06] shadow-xs relative flex items-center justify-center"
            >
              {/* Inner pupil center */}
              <div className="w-[60%] h-[60%] rounded-full bg-slate-950" />
              {/* Glossy primary reflection */}
              <div className="absolute top-[18%] left-[20%] w-[32%] h-[32%] rounded-full bg-white opacity-95 shadow-2xs" />
              {/* Glossy secondary sparkle reflection */}
              <div className="absolute bottom-[22%] right-[22%] w-[18%] h-[18%] rounded-full bg-white opacity-80" />
              {state === 'levelUp' && (
                <div className="absolute inset-0 flex items-center justify-center text-[7px] text-amber-300">★</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Eye Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: sizeConfig.rightEye.top,
            left: sizeConfig.rightEye.left,
            width: `${sizeConfig.eyeWidth}px`,
            height: `${sizeConfig.eyeHeight}px`,
            transform: `translate(-50%, -50%) ${isBlinking || state === 'complete' ? 'scaleY(0.08)' : 'scaleY(1)'}`,
            transition: 'transform 0.08s ease-in-out',
            transformOrigin: 'center 60%',
            pointerEvents: 'none',
          }}
          className="rounded-full overflow-hidden"
        >
          <div className="w-full h-full relative rounded-full flex items-center justify-center bg-white/20">
            <div 
              style={{
                width: `${sizeConfig.pupilSize}px`,
                height: `${sizeConfig.pupilSize}px`,
                transform: `translate3d(${pupilPos.x}px, ${pupilPos.y}px, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.04s ease-out',
              }}
              className="rounded-full bg-gradient-to-br from-[#533423] via-[#311c12] to-[#120a06] shadow-xs relative flex items-center justify-center"
            >
              <div className="w-[60%] h-[60%] rounded-full bg-slate-950" />
              <div className="absolute top-[18%] left-[20%] w-[32%] h-[32%] rounded-full bg-white opacity-95 shadow-2xs" />
              <div className="absolute bottom-[22%] right-[22%] w-[18%] h-[18%] rounded-full bg-white opacity-80" />
              {state === 'levelUp' && (
                <div className="absolute inset-0 flex items-center justify-center text-[7px] text-amber-300">★</div>
              )}
            </div>
          </div>
        </div>

        {/* Happy closed-eye arcs when celebrating/complete */}
        {(state === 'complete' || state === 'success') && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="absolute -top-1 text-xs opacity-70 animate-sparkle">✨</div>
          </div>
        )}

      </div>

      {/* Equipped Accessory Pin Badge */}
      {equippedAccessory && (
        <div 
          title={`Equipped: ${equippedAccessory.name}`}
          className={`absolute ${sizeConfig.accessorySize} bg-white border-2 border-indigo-300 shadow-md rounded-full flex items-center justify-center animate-bounce-subtle select-none z-10`}
        >
          {equippedAccessory.icon}
        </div>
      )}

      {/* Floating State Mini Pill */}
      {size !== 'sm' && (
        <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 bg-white/95 border border-slate-200/90 rounded-full shadow-md text-[10px] font-black text-slate-700 flex items-center gap-1.5 backdrop-blur-xs select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-wider">
            {state === 'idle' ? 'Ready' : state}
          </span>
        </div>
      )}
    </div>
  );
};
