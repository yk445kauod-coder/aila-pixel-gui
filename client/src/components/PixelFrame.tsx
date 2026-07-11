import React from 'react';

interface PixelFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'large';
  icon?: React.ReactNode;
}

/**
 * PixelFrame Component
 * 
 * A retro GUI panel with golden orange borders and corner brackets.
 * Represents the classic 1980s computer terminal aesthetic.
 * 
 * Design: Thick golden orange border with decorative corner elements
 */
export const PixelFrame: React.FC<PixelFrameProps> = ({
  children,
  title,
  className = '',
  variant = 'default',
  icon,
}) => {
  const variantStyles = {
    default: 'p-4',
    compact: 'p-2',
    large: 'p-6',
  };

  return (
    <div
      className={`
        relative
        border-4 border-primary
        bg-card
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        boxShadow: 'inset 0 0 0 2px var(--pixel-black)',
      }}
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -m-1" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -m-1" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -m-1" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -m-1" />

      {/* Title Bar */}
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-primary">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="text-primary font-bold uppercase text-sm tracking-wider">
            {title}
          </h3>
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

export default PixelFrame;
