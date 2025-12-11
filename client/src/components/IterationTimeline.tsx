import { Check, Circle, Clock } from 'lucide-react';
import { Iteration } from '@/types/review';

interface IterationTimelineProps {
  iterations: Iteration[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const IterationTimeline = ({
  iterations,
  selectedIndex,
  onSelect,
}: IterationTimelineProps) => {
  return (
    <div className="flex items-center justify-center gap-0 py-4">
      {iterations.map((iteration, index) => {
        const isSelected = index === selectedIndex;
        const isApproved = iteration.approved;
        const isLast = index === iterations.length - 1;

        return (
          <div key={iteration.iteration} className="flex items-center">
            {/* Node */}
            <button
              onClick={() => onSelect(index)}
              className={`group relative flex flex-col items-center transition-all duration-200 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isApproved
                    ? 'border-success bg-success/10 text-success'
                    : isSelected
                    ? 'border-primary bg-primary/10 text-primary ring-4 ring-primary/20'
                    : 'border-muted-foreground/30 bg-secondary text-muted-foreground hover:border-primary/50'
                }`}
              >
                {isApproved ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{iteration.iteration}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'text-foreground'
                    : 'text-muted-foreground group-hover:text-foreground'
                }`}
              >
                Iteration {iteration.iteration}
              </span>

              {/* Status Badge */}
              <span
                className={`mt-1 text-[10px] ${
                  isApproved ? 'text-success' : 'text-muted-foreground'
                }`}
              >
                {isApproved ? 'Approved' : 'Revised'}
              </span>
            </button>

            {/* Connector Line */}
            {!isLast && (
              <div className="mx-2 h-0.5 w-12 sm:w-20 lg:w-28">
                <div
                  className={`h-full rounded-full transition-colors ${
                    index < iterations.length - 1 && iterations[index + 1]
                      ? 'bg-primary/40'
                      : 'bg-border'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IterationTimeline;
