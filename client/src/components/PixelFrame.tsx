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
 * Premium retro GUI panel with golden orange borders.
 * Features smooth hover effects and professional styling.
 * 
 * Design: Retro arcade panel with modern polish
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
        pixel-frame
        relative
        ${variantStyles[variant]}
        ${className}
      `}
    >
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
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default PixelFrame;
