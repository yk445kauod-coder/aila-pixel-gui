import React from 'react';

interface BackupPanelProps {
  title?: string;
  description?: string;
  onBackup?: () => void;
  onRestore?: () => void;
  className?: string;
}

/**
 * BackupPanel Component
 * 
 * Reusable backup/restore panel for future features.
 * Displays backup status and provides backup/restore actions.
 * 
 * Design: Pixel art panel with professional layout
 */
export const BackupPanel: React.FC<BackupPanelProps> = ({
  title = 'BACKUP',
  description = 'Manage system backups and restoration',
  onBackup,
  onRestore,
  className = '',
}) => {
  return (
    <div
      className={`
        pixel-frame
        p-4
        space-y-4
        ${className}
      `}
    >
      <div className="pixel-frame-title">
        {title}
      </div>
      
      <p className="text-sm text-muted-foreground">
        {description}
      </p>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBackup}
          className="pixel-btn small flex-1"
        >
          CREATE BACKUP
        </button>
        <button
          onClick={onRestore}
          className="pixel-btn secondary small flex-1"
        >
          RESTORE
        </button>
      </div>
    </div>
  );
};

export default BackupPanel;
