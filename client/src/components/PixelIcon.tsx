import React from 'react';

export type IconName = 
  | 'home' 
  | 'chat' 
  | 'settings' 
  | 'user' 
  | 'power' 
  | 'check' 
  | 'close' 
  | 'search' 
  | 'star' 
  | 'heart';

type IconSize = 'small' | 'medium' | 'large';

interface PixelIconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  alt?: string;
}

/**
 * PixelIcon Component
 * 
 * Displays premium pixel art icons from generated PNG images.
 * Supports multiple sizes and seamless integration with UI components.
 * 
 * Design: Retro arcade icons with golden orange color scheme
 */

const iconMap: Record<IconName, string> = {
  home: '/manus-storage/icon_home_v2_0b00e60f.png',
  chat: '/manus-storage/icon_chat_v2_b5c671fd.png',
  settings: '/manus-storage/icon_settings_v2_f6867abc.png',
  user: '/manus-storage/icon_user_v2_39bba488.png',
  power: '/manus-storage/icon_power_v2_4d2122bf.png',
  check: '/manus-storage/icon_check_v2_89bfeabc.png',
  close: '/manus-storage/icon_close_v2_897c9af4.png',
  search: '/manus-storage/icon_search_v2_7c6a0c0a.png',
  star: '/manus-storage/icon_star_v2_d0bb01a9.png',
  heart: '/manus-storage/icon_heart_v2_8fdb0a29.png',
};

const sizeMap: Record<IconSize, string> = {
  small: 'w-5 h-5',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
};

export const PixelIcon: React.FC<PixelIconProps> = ({
  name,
  size = 'medium',
  className = '',
  alt = name,
}) => {
  return (
    <img
      src={iconMap[name]}
      alt={alt}
      className={`
        ${sizeMap[size]}
        object-contain
        inline-block
        ${className}
      `}
      style={{
        imageRendering: 'crisp-edges',
      }}
    />
  );
};

export default PixelIcon;
