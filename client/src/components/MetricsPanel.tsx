import { BarChart3, CheckCircle2, XCircle, Code2, Cpu, IterationCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RunResult } from '@/types/review';

interface MetricsPanelProps {
  run: RunResult;
}

const MetricsPanel = ({ run }: MetricsPanelProps) => {
  const { stats, language } = run;

  const metrics = [
    {
      label: 'Iterations',
      value: `${stats.total_iterations} / 3`,
      icon: IterationCcw,
      color: 'text-primary',
    },
    {
      label: 'Final Verdict',
      value: stats.approved ? 'Approved' : 'Rejected',
      icon: stats.approved ? CheckCircle2 : XCircle,
      color: stats.approved ? 'text-success' : 'text-destructive',
    },
    {
      label: 'Language',
      value: language.charAt(0).toUpperCase() + language.slice(1),
      icon: Code2,
      color: 'text-info',
    },
    {
      label: 'Model',
      value: 'Groq LLM',
      icon: Cpu,
      color: 'text-warning',
    },
  ];

  return (
    <Card className="card-gradient border-border shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-5 w-5 text-primary" />
          Run Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-background/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </div>
            <span className={`text-sm font-medium ${metric.color}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetricsPanel;
