import React, { useState } from 'react';

interface PreviewItem {
  id: string;
  type: 'screenshot' | 'code' | 'output' | 'file';
  title: string;
  content: string;
  timestamp: Date;
  thumbnail?: string;
}

interface LivePreviewProps {
  items?: PreviewItem[];
  onRefresh?: () => void;
  className?: string;
}

/**
 * LivePreview Component
 * 
 * Shows live preview of work, screenshots, code output, and files.
 * Displays AILA's work in real-time with visual feedback.
 * 
 * Design: Multi-panel preview system with pixel art styling
 */
export const LivePreview: React.FC<LivePreviewProps> = ({
  items = [],
  onRefresh,
  className = '',
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    items.length > 0 ? items[0].id : null
  );

  const currentItem = items.find((item) => item.id === selectedItem);

  const typeColors: Record<string, string> = {
    screenshot: 'text-cyan-400',
    code: 'text-green-500',
    output: 'text-yellow-500',
    file: 'text-primary',
  };

  const typeIcons: Record<string, string> = {
    screenshot: '📷',
    code: '◆',
    output: '▶',
    file: '📄',
  };

  return (
    <div className={`pixel-frame p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-primary pb-3">
        <h3 className="text-sm font-bold uppercase tracking-widest">LIVE PREVIEW</h3>
        <button
          onClick={onRefresh}
          className="pixel-btn small"
        >
          REFRESH
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No previews available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Preview List */}
          <div className="md:col-span-1 space-y-2 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`
                  w-full text-left p-3 border-2 transition-all
                  ${
                    selectedItem === item.id
                      ? 'border-primary bg-primary/10'
                      : 'border-primary/30 hover:border-primary'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className={typeColors[item.type]}>
                    {typeIcons[item.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Preview Display */}
          <div className="md:col-span-2 space-y-3">
            {currentItem ? (
              <>
                <div className="border-2 border-primary p-3">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                    {currentItem.type.toUpperCase()}
                  </p>

                  {currentItem.type === 'screenshot' && currentItem.thumbnail ? (
                    <img
                      src={currentItem.thumbnail}
                      alt={currentItem.title}
                      className="w-full h-auto border-2 border-primary"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                  ) : currentItem.type === 'code' ? (
                    <pre className="bg-black p-3 overflow-x-auto text-xs font-mono border border-primary/50 max-h-64">
                      <code>{currentItem.content}</code>
                    </pre>
                  ) : (
                    <div className="bg-black p-3 border border-primary/50 max-h-64 overflow-y-auto text-xs font-mono">
                      {currentItem.content}
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Type: {currentItem.type}</p>
                  <p>Updated: {currentItem.timestamp.toLocaleString()}</p>
                </div>
              </>
            ) : (
              <div className="border-2 border-primary/30 p-8 text-center text-muted-foreground">
                <p className="text-sm">Select a preview to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreview;
