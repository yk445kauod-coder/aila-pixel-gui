import React from 'react';

interface TTSLoaderProps {
  isActive?: boolean;
  text?: string;
  className?: string;
}

/**
 * TTSLoader Component
 * 
 * Visual indicator for Text-to-Speech playback.
 * Shows animated sound waves with golden orange bars.
 * 
 * Design: Pixel art sound wave animation with retro aesthetic
 */
export const TTSLoader: React.FC<TTSLoaderProps> = ({
  isActive = false,
  text = 'SPEAKING...',
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${className}
      `}
    >
      {/* Sound Wave Visualization */}
      <div className="flex items-center justify-center gap-1 h-16">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="w-2 bg-primary transition-all duration-150"
            style={{
              height: isActive ? `${20 + Math.sin(i * 0.5) * 20}px` : '8px',
              animation: isActive
                ? `pixel-wave 0.6s ease-in-out ${i * 0.1}s infinite`
                : 'none',
            }}
          />
        ))}
      </div>

      {/* Status Text */}
      {text && (
        <div className="text-center">
          <p className="text-primary font-bold uppercase text-sm tracking-wider">
            {text}
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="w-1 h-1 bg-primary animate-pixel-pulse" />
            <span
              className="w-1 h-1 bg-primary animate-pixel-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className="w-1 h-1 bg-primary animate-pixel-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes pixel-wave {
          0%, 100% {
            height: 8px;
          }
          50% {
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default TTSLoader;
