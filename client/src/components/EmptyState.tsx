import { Bot, ArrowRight, Code2, Shield, UserCheck } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Animated Icon Group */}
      <div className="relative mb-8">
        <div className="flex items-center gap-4">
          {/* Junior Dev */}
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Code2 className="h-7 w-7 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-muted-foreground ring-2 ring-background">
              1
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />

          {/* Auditor */}
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 ring-1 ring-warning/20">
              <Shield className="h-7 w-7 text-warning" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-muted-foreground ring-2 ring-background">
              2
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />

          {/* Tech Lead */}
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-info/10 ring-1 ring-info/20">
              <UserCheck className="h-7 w-7 text-info" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-muted-foreground ring-2 ring-background">
              3
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Run a Code Review
      </h3>
      <p className="max-w-md text-sm text-muted-foreground">
        Describe a feature you want to build. Our multi-agent system will generate code,
        review it for security issues, and provide expert guidance.
      </p>

      {/* Process Steps */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-card/50 p-4 ring-1 ring-border">
          <div className="mb-2 text-primary">
            <Code2 className="mx-auto h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-foreground">Junior Dev</p>
          <p className="text-[10px] text-muted-foreground">Writes initial code</p>
        </div>
        <div className="rounded-lg bg-card/50 p-4 ring-1 ring-border">
          <div className="mb-2 text-warning">
            <Shield className="mx-auto h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-foreground">Security Audit</p>
          <p className="text-[10px] text-muted-foreground">Reviews for bugs</p>
        </div>
        <div className="rounded-lg bg-card/50 p-4 ring-1 ring-border">
          <div className="mb-2 text-info">
            <UserCheck className="mx-auto h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-foreground">Tech Lead</p>
          <p className="text-[10px] text-muted-foreground">Approves or rejects</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
