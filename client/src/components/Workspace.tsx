import React, { useState } from 'react';

interface WorkspaceData {
  id: string;
  name: string;
  description?: string;
  created: Date;
  modified: Date;
  isActive: boolean;
  itemCount: number;
}

interface WorkspaceProps {
  workspaces?: WorkspaceData[];
  onCreate?: (name: string, description?: string) => void;
  onSwitch?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, newName: string) => void;
  className?: string;
}

/**
 * Workspace Component
 * 
 * Manages multiple workspaces for organizing work.
 * Allows switching between different contexts and projects.
 * 
 * Design: Workspace selector with pixel art styling
 */
export const Workspace: React.FC<WorkspaceProps> = ({
  workspaces = [],
  onCreate,
  onSwitch,
  onDelete,
  onRename,
  className = '',
}) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = () => {
    if (newName.trim()) {
      onCreate?.(newName, newDescription);
      setNewName('');
      setNewDescription('');
    }
  };

  const handleRename = (id: string) => {
    if (editingName.trim()) {
      onRename?.(id, editingName);
      setEditingId(null);
      setEditingName('');
    }
  };

  return (
    <div className={`pixel-frame p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-3">
        <h3 className="text-sm font-bold uppercase tracking-widest">WORKSPACES</h3>
      </div>

      {/* Create New Workspace */}
      <div className="space-y-2 p-3 bg-secondary border-2 border-primary/50">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Workspace name"
          className="pixel-input w-full text-xs"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
          className="pixel-input w-full text-xs"
        />
        <button
          onClick={handleCreate}
          className="pixel-btn small primary w-full"
        >
          CREATE WORKSPACE
        </button>
      </div>

      {/* Workspace List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {workspaces.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No workspaces yet</p>
          </div>
        ) : (
          workspaces.map((ws) => (
            <div
              key={ws.id}
              className={`
                p-3 border-2 transition-all
                ${
                  ws.isActive
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/30 hover:border-primary'
                }
              `}
            >
              <div className="space-y-2">
                {/* Name */}
                {editingId === ws.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="pixel-input flex-1 text-xs"
                      autoFocus
                    />
                    <button
                      onClick={() => handleRename(ws.id)}
                      className="pixel-btn tiny primary"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase">
                        {ws.name}
                        {ws.isActive && (
                          <span className="text-primary ml-2">●</span>
                        )}
                      </p>
                      {ws.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {ws.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>{ws.itemCount} items</span>
                  <span>
                    {ws.modified.toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {!ws.isActive && (
                    <button
                      onClick={() => onSwitch?.(ws.id)}
                      className="pixel-btn tiny primary flex-1"
                    >
                      SWITCH
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingId(ws.id);
                      setEditingName(ws.name);
                    }}
                    className="pixel-btn tiny flex-1"
                  >
                    RENAME
                  </button>
                  <button
                    onClick={() => onDelete?.(ws.id)}
                    className="pixel-btn tiny danger"
                  >
                    DEL
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="text-xs text-muted-foreground border-t-2 border-primary pt-3">
        <p>Total workspaces: {workspaces.length}</p>
        <p>
          Active:{' '}
          {workspaces.find((w) => w.isActive)?.name || 'None'}
        </p>
      </div>
    </div>
  );
};

export default Workspace;
