import React from 'react';

export type IconName =
  | 'home'
  | 'settings'
  | 'chat'
  | 'files'
  | 'user'
  | 'search'
  | 'power'
  | 'heart'
  | 'star'
  | 'warning'
  | 'check'
  | 'close';

interface PixelIconProps {
  name: IconName;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

/**
 * PixelIcon Component
 * 
 * Pixel art icons from the generated icon sheet.
 * Supports multiple sizes and colors.
 * 
 * Design: 16-bit retro game style icons
 */
export const PixelIcon: React.FC<PixelIconProps> = ({
  name,
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const colorMap = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-pixel-gray-light',
  };

  // Simple SVG icons for pixel art style
  const iconMap: Record<IconName, string> = {
    home: 'M2 10l8-8 8 8v6H2z',
    settings: 'M8 2v2h1V2h-1zm0 12v2h1v-2h-1zm6-4h2v1h-2v-1zm-12 0H2v1h2v-1z',
    chat: 'M2 2h12v8H4l-2 2v-2H2V2z',
    files: 'M2 2h8v2H4v8h8V6h2v8H2V2z',
    user: 'M8 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 4c2.2 0 4 1.8 4 4v2H4v-2c0-2.2 1.8-4 4-4z',
    search: 'M3 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 6l3 3',
    power: 'M8 2v4m-4 2h8c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2z',
    heart: 'M8 12l-3-3c-1-1-2-1-2 0s1 2 2 3l3 3 3-3c1-1 2-2 2-3s-1-1-2 0l-3 3z',
    star: 'M8 2l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4l2-4z',
    warning: 'M8 2l6 10H2L8 2zm0 6v2m0 2v1',
    check: 'M3 8l2 2 4-4',
    close: 'M3 3l10 10M13 3L3 13',
  };

  return (
    <svg
      className={`${sizeMap[size]} ${colorMap[color]} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        imageRendering: 'crisp-edges',
      } as React.CSSProperties}
    >
      <path d={iconMap[name]} />
    </svg>
  );
};

export default PixelIcon;
