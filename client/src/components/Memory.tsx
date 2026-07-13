import React, { useState } from 'react';

interface MemoryEntry {
  id: string;
  type: 'context' | 'session' | 'note' | 'variable';
  key: string;
  value: string;
  timestamp: Date;
  important?: boolean;
}

interface MemoryProps {
  entries?: MemoryEntry[];
  onAdd?: (entry: Omit<MemoryEntry, 'id' | 'timestamp'>) => void;
  onDelete?: (id: string) => void;
  onClear?: () => void;
  className?: string;
}

/**
 * Memory Component
 * 
 * Manages AILA's memory, context, and session variables.
 * Stores important information and session state.
 * 
 * Design: Organized memory panel with pixel art styling
 */
export const Memory: React.FC<MemoryProps> = ({
  entries = [],
  onAdd,
  onDelete,
  onClear,
  className = '',
}) => {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<'context' | 'session' | 'note' | 'variable'>('note');

  const handleAdd = () => {
    if (newKey.trim() && newValue.trim()) {
      onAdd?.({
        type: newType,
        key: newKey,
        value: newValue,
        important: false,
      });
      setNewKey('');
      setNewValue('');
    }
  };

  const typeColors: Record<string, string> = {
    context: 'text-cyan-400',
    session: 'text-green-500',
    note: 'text-primary',
    variable: 'text-yellow-500',
  };

  const typeIcons: Record<string, string> = {
    context: '◆',
    session: '◈',
    note: '▪',
    variable: '▸',
  };

  const groupedEntries = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.type]) acc[entry.type] = [];
      acc[entry.type].push(entry);
      return acc;
    },
    {} as Record<string, MemoryEntry[]>
  );

  return (
    <div className={`pixel-frame p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-primary pb-3">
        <h3 className="text-sm font-bold uppercase tracking-widest">MEMORY</h3>
        <button
          onClick={onClear}
          className="pixel-btn tiny danger"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Add New Entry */}
      <div className="space-y-2 p-3 bg-secondary border-2 border-primary/50">
        <div className="grid grid-cols-3 gap-2">
          <select
            value={newType}
            onChange={(e) =>
              setNewType(e.target.value as typeof newType)
            }
            className="pixel-input text-xs"
          >
            <option value="note">NOTE</option>
            <option value="context">CONTEXT</option>
            <option value="session">SESSION</option>
            <option value="variable">VAR</option>
          </select>
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Key"
            className="pixel-input text-xs"
          />
          <button
            onClick={handleAdd}
            className="pixel-btn small primary"
          >
            ADD
          </button>
        </div>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Value"
          className="pixel-input w-full text-xs"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
      </div>

      {/* Memory Entries */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {Object.entries(groupedEntries).map(([type, typeEntries]) => (
          <div key={type} className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-muted-foreground px-2">
              {type}S ({typeEntries.length})
            </h4>
            <div className="space-y-2">
              {typeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-2 bg-secondary border border-primary/30 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${typeColors[type]}`}>
                          {typeIcons[type]}
                        </span>
                        <p className="text-xs font-bold uppercase truncate">
                          {entry.key}
                        </p>
                        {entry.important && (
                          <span className="text-xs text-red-500">★</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {entry.value}
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        {entry.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete?.(entry.id)}
                      className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No memories yet</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="text-xs text-muted-foreground border-t-2 border-primary pt-3">
        <p>Total entries: {entries.length}</p>
        <p>Memory usage: ~{(entries.length * 50).toLocaleString()} bytes</p>
      </div>
    </div>
  );
};

export default Memory;
