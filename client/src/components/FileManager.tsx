import React, { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  path: string;
}

interface FileManagerProps {
  files?: FileItem[];
  onUpload?: (file: File) => void;
  onDownload?: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
  className?: string;
}

/**
 * FileManager Component
 * 
 * File management system with upload, download, delete operations.
 * Supports folder navigation and file operations.
 * 
 * Design: Pixel art file browser with professional layout
 */
export const FileManager: React.FC<FileManagerProps> = ({
  files = [],
  onUpload,
  onDownload,
  onDelete,
  onNavigate,
  currentPath = '/root',
  className = '',
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload?.(file);
      e.target.value = '';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className={`pixel-frame p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-primary pb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">FILE MANAGER</h3>
          <p className="text-xs text-muted-foreground mt-1">{currentPath}</p>
        </div>
        <label className="pixel-btn small cursor-pointer">
          UPLOAD
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* File List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {files.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No files in this folder</p>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file.id)}
              className={`
                p-3 border-2 cursor-pointer transition-all
                ${
                  selectedFile === file.id
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/30 hover:border-primary'
                }
              `}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-lg">
                    {file.type === 'folder' ? '📁' : '📄'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.type === 'file' && formatFileSize(file.size)} •{' '}
                      {file.modified.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  {file.type === 'folder' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate?.(file.path);
                      }}
                      className="pixel-btn tiny"
                      title="Open folder"
                    >
                      ▶
                    </button>
                  )}
                  {file.type === 'file' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload?.(file.id);
                      }}
                      className="pixel-btn tiny"
                      title="Download"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(file.id);
                    }}
                    className="pixel-btn tiny danger"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="text-xs text-muted-foreground border-t-2 border-primary pt-3">
        <p>Total files: {files.length}</p>
        <p>
          Total size:{' '}
          {formatFileSize(
            files.reduce((sum, f) => sum + (f.size || 0), 0)
          )}
        </p>
      </div>
    </div>
  );
};

export default FileManager;
