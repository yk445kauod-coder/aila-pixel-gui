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
 * Premium pixel art mascot with multiple emotional states.
 * States: idle, working, happy, asking, stopped
 * 
 * Design: Smooth state transitions with professional animations
 */
export const Mascot: React.FC<MascotProps> = ({
  state = 'idle',
  size = 'medium',
  animated = true,
  className = '',
}) => {
  const [displayState, setDisplayState] = useState<MascotState>(state);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (state !== displayState) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayState(state);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [state, displayState]);

  const sizeMap = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-56 h-56',
  };

  const imageMap: Record<MascotState, string> = {
    idle: '/manus-storage/aila_idle_v2_75f1f6c3.png',
    working: '/manus-storage/aila_working_v2_a708f126.png',
    happy: '/manus-storage/aila_happy_v2_fa12675e.png',
    asking: '/manus-storage/aila_asking_v2_3e7857ee.png',
    stopped: '/manus-storage/aila_stopped_v2_6eab4879.png',
  };

  const animationMap: Record<MascotState, string> = {
    idle: 'animate-pixel-bounce',
    working: 'animate-pixel-wave',
    happy: 'animate-pixel-bounce',
    asking: 'animate-pixel-bounce',
    stopped: '',
  };

  return (
    <div
      className={`
        relative flex items-center justify-center
        transition-all duration-300 ease-out
        ${isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}
        ${className}
      `}
    >
      <div
        className={`
          relative
          ${sizeMap[size]}
          ${animated ? animationMap[displayState] : ''}
          transition-all duration-300 ease-out
        `}
        style={{
          filter: state === 'working' 
            ? 'drop-shadow(0 0 12px rgba(255, 165, 0, 0.6))' 
            : 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.3))',
        }}
      >
        <img
          src={imageMap[displayState]}
          alt={`AILA - ${displayState}`}
          className="w-full h-full object-contain"
          style={{
            imageRendering: 'crisp-edges',
          }}
        />

        {/* Working state glow */}
        {state === 'working' && (
          <div
            className="absolute inset-0 rounded-full animate-pixel-pulse"
            style={{
              border: '2px solid rgba(255, 165, 0, 0.3)',
              boxShadow: '0 0 20px rgba(255, 165, 0, 0.4)',
            }}
          />
        )}

        {/* Happy state particles */}
        {state === 'happy' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  animation: `pixel-bounce 0.8s ease-in-out ${i * 0.2}s infinite`,
                  left: `${50 + Math.cos((i * 120 * Math.PI) / 180) * 40}%`,
                  top: `${50 + Math.sin((i * 120 * Math.PI) / 180) * 40}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">
          {displayState}
        </span>
      </div>
    </div>
  );
};

export default Mascot;
