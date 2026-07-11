import React from 'react';

interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * PixelButton Component
 * 
 * A pixel-perfect button styled with golden orange accents.
 * Variants: primary (orange), secondary (dark), danger (red), success (green)
 * 
 * Design: 16-bit retro game style with instant feedback animations
 */
export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-primary text-black border-primary',
    secondary: 'bg-pixel-gray text-white border-pixel-gray-light',
    danger: 'bg-pixel-red text-white border-pixel-red',
    success: 'bg-pixel-green text-black border-pixel-green',
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        pixel-btn
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        font-bold uppercase
        border-2
        transition-all duration-100 ease-out
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        hover:opacity-90
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
};

export default PixelButton;
