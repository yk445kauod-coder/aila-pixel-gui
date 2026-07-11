import React from 'react';

interface Step {
  label: string;
  completed?: boolean;
  active?: boolean;
}

interface StepsIndicatorProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
}

/**
 * StepsIndicator Component
 * 
 * Reusable progress indicator for multi-step processes.
 * Shows completion status and current step.
 * 
 * Design: Pixel art step indicators with professional layout
 */
export const StepsIndicator: React.FC<StepsIndicatorProps> = ({
  steps,
  currentStep = 0,
  className = '',
}) => {
  return (
    <div
      className={`
        pixel-frame
        p-4
        ${className}
      `}
    >
      <div className="pixel-frame-title">
        PROGRESS
      </div>

      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div
              className={`
                flex items-center justify-center
                w-10 h-10 rounded-full
                font-bold text-sm
                transition-all duration-300
                ${
                  index < currentStep
                    ? 'bg-green-500 text-black'
                    : index === currentStep
                    ? 'bg-primary text-black border-2 border-primary'
                    : 'bg-secondary text-muted-foreground border-2 border-primary'
                }
              `}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1
                  transition-all duration-300
                  ${
                    index < currentStep
                      ? 'bg-green-500'
                      : 'bg-secondary'
                  }
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between gap-2 mt-4 text-xs">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              flex-1 text-center
              transition-colors duration-300
              ${
                index <= currentStep
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground'
              }
            `}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsIndicator;
