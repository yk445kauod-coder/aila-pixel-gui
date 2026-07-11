import React, { useState, useEffect } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationPanelProps {
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

/**
 * NotificationPanel Component
 * 
 * Reusable notification/alert panel for system messages.
 * Supports multiple types and auto-dismiss.
 * 
 * Design: Pixel art notification with professional styling
 */
export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    info: 'border-primary bg-card',
    success: 'border-green-500 bg-card',
    warning: 'border-yellow-500 bg-card',
    error: 'border-red-500 bg-card',
  };

  const typeColors = {
    info: 'text-primary',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  return (
    <div
      className={`
        pixel-frame
        border-2
        p-4
        space-y-2
        animate-pixel-slide-in-right
        ${typeStyles[type]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold uppercase text-sm mb-1 ${typeColors[type]}`}>
              {title}
            </h4>
          )}
          <p className="text-sm text-foreground">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
