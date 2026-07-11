import React, { useEffect, useState } from 'react';

export type MascotState = 'idle' | 'working' | 'happy' | 'asking' | 'stopped';

interface MascotProps {
  state?: MascotState;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

/**
 * AILA Mascot Component
 * 
 * A pixel art mascot character with multiple emotional states.
 * States: idle, working, happy, asking, stopped
 * 
 * Design Philosophy: Retro 16-bit pixel art with golden orange accents
 * Animation: Smooth state transitions with pixel-perfect rendering
 */
export const Mascot: React.FC<MascotProps> = ({
  state = 'idle',
  size = 'medium',
  animated = true,
  className = '',
}) => {
  const [currentState, setCurrentState] = useState<MascotState>(state);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (state !== currentState) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentState(state);
        setIsTransitioning(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state, currentState]);

  const sizeMap = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-56 h-56',
  };

  const imageMap: Record<MascotState, string> = {
    idle: '/manus-storage/aila_idle_f3ae255e.png',
    working: '/manus-storage/aila_working_50430da3.png',
    happy: '/manus-storage/aila_happy_b7b15f39.png',
    asking: '/manus-storage/aila_asking_40a38690.png',
    stopped: '/manus-storage/aila_stopped_235492fe.png',
  };

  return (
    <div
      className={`
        flex items-center justify-center
        ${sizeMap[size]}
        ${isTransitioning ? 'opacity-75' : 'opacity-100'}
        transition-opacity duration-200
        ${animated ? 'animate-pixel-float' : ''}
        ${className}
      `}
    >
      <img
        src={imageMap[currentState]}
        alt={`AILA mascot - ${currentState} state`}
        className={`
          w-full h-full
          object-contain
          pixel-glow
          ${animated && currentState === 'working' ? 'animate-pixel-glow' : ''}
          ${animated && currentState === 'happy' ? 'animate-pixel-bounce' : ''}
        `}
        style={{
          imageRendering: 'crisp-edges',
        } as React.CSSProperties}
      />
    </div>
  );
};

export default Mascot;
