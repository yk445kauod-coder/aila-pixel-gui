import React from 'react';

interface LoadingIndicatorProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  className?: string;
}

/**
 * LoadingIndicator Component
 * 
 * Reusable loading spinner with pixel art styling.
 * Shows loading state with optional text.
 * 
 * Design: Animated pixel art loading indicator
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text = 'LOADING...',
  size = 'medium',
  fullScreen = false,
  className = '',
}) => {
  const sizeMap = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/80 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center space-y-4">
        {/* Spinning Gear Animation */}
        <div className={`${sizeMap[size]} mx-auto animate-spin`}>
          <div
            className="w-full h-full rounded-full border-4 border-secondary border-t-primary"
            style={{
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>

        {/* Loading Text */}
        {text && (
          <p className="text-primary font-bold uppercase tracking-widest text-sm">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
