import { History, CheckCircle2, XCircle, IterationCcw, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RunResult } from '@/types/review';

interface HistoryListProps {
  history: RunResult[];
  onSelect: (run: RunResult) => void;
  currentRunTimestamp?: Date;
}

const HistoryList = ({ history, onSelect, currentRunTimestamp }: HistoryListProps) => {
  if (history.length === 0) {
    return (
      <Card className="card-gradient border-border shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-5 w-5 text-primary" />
            Recent Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No runs yet</p>
            <p className="text-xs text-muted-foreground/60">
              Your recent reviews will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="card-gradient border-border shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-5 w-5 text-primary" />
          Recent Runs
          <Badge variant="secondary" className="ml-auto text-xs">
            {history.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {history.map((run, index) => {
          const isActive = currentRunTimestamp && 
            new Date(run.timestamp).getTime() === new Date(currentRunTimestamp).getTime();
          
          return (
            <button
              key={index}
              onClick={() => onSelect(run)}
              className={`group w-full rounded-lg p-3 text-left transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 ring-1 ring-primary/20'
                  : 'bg-background/50 hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-foreground group-hover:text-foreground">
                    {run.feature}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {run.language}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <IterationCcw className="h-2.5 w-2.5" />
                      {run.stats.total_iterations}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatTime(run.timestamp)}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    run.stats.approved
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {run.stats.approved ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default HistoryList;
