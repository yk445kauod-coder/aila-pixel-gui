import React from 'react';

export type TaskStatus = 'idle' | 'working' | 'thinking' | 'listening' | 'speaking' | 'complete' | 'error';

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  progress: number;
  details?: string;
}

interface ProgressIndicatorProps {
  currentTask?: Task;
  tasks?: Task[];
  className?: string;
}

/**
 * ProgressIndicator Component
 * 
 * Shows current task progress and status with detailed information.
 * Displays what AILA is doing now with visual feedback.
 * 
 * Design: Pixel art progress bars and status indicators
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentTask,
  tasks = [],
  className = '',
}) => {
  const statusColors: Record<TaskStatus, string> = {
    idle: 'text-muted-foreground',
    working: 'text-primary animate-pulse',
    thinking: 'text-cyan-400',
    listening: 'text-green-500 animate-pulse',
    speaking: 'text-yellow-500 animate-pulse',
    complete: 'text-green-500',
    error: 'text-red-500',
  };

  const statusIcons: Record<TaskStatus, string> = {
    idle: '●',
    working: '⚙',
    thinking: '◈',
    listening: '♪',
    speaking: '◆',
    complete: '✓',
    error: '✕',
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Task */}
      {currentTask && (
        <div className="pixel-frame p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest">CURRENT TASK</h3>
            <span className={`text-lg font-bold ${statusColors[currentTask.status]}`}>
              {statusIcons[currentTask.status]}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-mono">{currentTask.name}</p>
            {currentTask.details && (
              <p className="text-xs text-muted-foreground">{currentTask.details}</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary border-2 border-primary h-4 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${currentTask.progress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">PROGRESS</span>
            <span className="text-primary font-bold">{currentTask.progress}%</span>
          </div>
        </div>
      )}

      {/* Task Queue */}
      {tasks.length > 0 && (
        <div className="pixel-frame p-4 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-2">
            TASK QUEUE
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-2 bg-secondary border border-primary/50 hover:border-primary transition-colors"
              >
                <span className={`text-lg font-bold ${statusColors[task.status]}`}>
                  {statusIcons[task.status]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono truncate">{task.name}</p>
                  <div className="w-full bg-black border border-primary/30 h-2 mt-1 overflow-hidden">
                    <div
                      className="h-full bg-primary/70 transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-primary font-bold">{task.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
