import React, { useState } from 'react';
import { Streamdown } from 'streamdown';

interface MarkdownEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  readOnly?: boolean;
  className?: string;
}

/**
 * MarkdownEditor Component
 * 
 * Markdown editor with live preview support.
 * Allows editing and viewing Markdown content side-by-side.
 * 
 * Design: Split-view editor with pixel art styling
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialContent = '',
  onSave,
  readOnly = false,
  className = '',
}) => {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(true);

  const handleSave = () => {
    onSave?.(content);
  };

  return (
    <div className={`pixel-frame p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-primary pb-3">
        <h3 className="text-sm font-bold uppercase tracking-widest">MARKDOWN EDITOR</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="pixel-btn small"
          >
            {showPreview ? 'HIDE' : 'SHOW'} PREVIEW
          </button>
          {!readOnly && (
            <button
              onClick={handleSave}
              className="pixel-btn small primary"
            >
              SAVE
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className={`grid gap-4 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground">
            EDIT
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={readOnly}
            className="pixel-input w-full h-96 p-3 font-mono text-xs resize-none"
            placeholder="# Enter Markdown here..."
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              PREVIEW
            </label>
            <div className="pixel-frame p-3 h-96 overflow-y-auto bg-card border-2 border-primary">
              <Streamdown className="text-xs leading-relaxed">
                {content || '# Preview will appear here...'}
              </Streamdown>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-xs text-muted-foreground border-t-2 border-primary pt-3">
        <p>Supports standard Markdown syntax: **bold**, *italic*, `code`, [links](url), etc.</p>
      </div>
    </div>
  );
};

export default MarkdownEditor;
