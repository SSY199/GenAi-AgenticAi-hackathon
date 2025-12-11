import { CheckCircle2, XCircle, FileCode2, IterationCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RunResult } from '@/types/review';

interface RunSummaryCardProps {
  run: RunResult;
}

const RunSummaryCard = ({ run }: RunSummaryCardProps) => {
  const { feature, stats, language } = run;
  const isApproved = stats.approved;

  return (
    <Card className="card-gradient border-border shadow-card overflow-hidden">
      <div
        className={`h-1 ${isApproved ? 'bg-success' : 'bg-destructive'}`}
      />
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Feature & Status */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <FileCode2 className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                  {feature}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {language}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <IterationCcw className="h-3 w-3" />
                    {stats.total_iterations} iteration{stats.total_iterations !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Status Badge */}
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${
              isApproved
                ? 'bg-success/10 text-success ring-1 ring-success/20'
                : 'bg-destructive/10 text-destructive ring-1 ring-destructive/20'
            }`}
          >
            {isApproved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Approved</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Rejected</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RunSummaryCard;
