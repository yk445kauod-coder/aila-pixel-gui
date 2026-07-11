import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * PixelButton Component
 * 
 * Premium pixel art button with multiple variants and sizes.
 * Features smooth animations and professional styling.
 * 
 * Design: Retro arcade aesthetic with modern interactions
 */
export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'pixel-btn';
  
  const variantClasses = {
    primary: 'bg-primary text-black border-primary',
    secondary: 'secondary',
    danger: 'danger',
    success: 'success',
  };

  const sizeClasses = {
    small: 'small',
    medium: '',
    large: 'large',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'opacity-75 cursor-wait' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="inline-flex animate-spin">
          ⚙️
        </span>
      )}
      {icon && !loading && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
};

export default PixelButton;
