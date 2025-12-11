import { Code2, Shield, UserCheck, CheckCircle2, XCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Iteration } from '@/types/review';
import CodeBlock from './CodeBlock';

interface IterationTabsProps {
  iteration: Iteration;
  totalIterations: number;
  language: string;
}

// Helper to highlight severity keywords
const renderReport = (text: string) => {
  const lines = text.split('\n');
  
  return lines.map((line, i) => {
    let highlightedLine = line;
    let severityBadge = null;

    if (line.toUpperCase().includes('HIGH') || line.toUpperCase().includes('CRITICAL')) {
      severityBadge = (
        <Badge className="ml-2 bg-destructive/20 text-destructive text-[10px] px-1.5 py-0">
          <AlertCircle className="h-2.5 w-2.5 mr-0.5" />
          HIGH
        </Badge>
      );
    } else if (line.toUpperCase().includes('MEDIUM')) {
      severityBadge = (
        <Badge className="ml-2 bg-warning/20 text-warning text-[10px] px-1.5 py-0">
          <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
          MEDIUM
        </Badge>
      );
    } else if (line.toUpperCase().includes('LOW')) {
      severityBadge = (
        <Badge className="ml-2 bg-info/20 text-info text-[10px] px-1.5 py-0">
          <Info className="h-2.5 w-2.5 mr-0.5" />
          LOW
        </Badge>
      );
    }

    return (
      <div key={i} className="flex items-start gap-2 py-0.5">
        <span className="flex-1">{highlightedLine}</span>
        {severityBadge}
      </div>
    );
  });
};

const IterationTabs = ({ iteration, totalIterations, language }: IterationTabsProps) => {
  return (
    <Tabs defaultValue="code" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
        <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-background">
          <Code2 className="h-4 w-4" />
          <span className="hidden sm:inline">Junior Dev</span>
          <span className="sm:hidden">Code</span>
        </TabsTrigger>
        <TabsTrigger value="auditor" className="gap-2 data-[state=active]:bg-background">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Auditor</span>
          <span className="sm:hidden">Audit</span>
        </TabsTrigger>
        <TabsTrigger value="lead" className="gap-2 data-[state=active]:bg-background">
          <UserCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Tech Lead</span>
          <span className="sm:hidden">Lead</span>
        </TabsTrigger>
      </TabsList>

      {/* Junior Dev Code Tab */}
      <TabsContent value="code" className="mt-4 animate-fade-in">
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code2 className="h-5 w-5 text-primary" />
                Junior Developer – Implementation
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Iteration {iteration.iteration} of {totalIterations}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CodeBlock code={iteration.junior_code} language={language} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Auditor Tab */}
      <TabsContent value="auditor" className="mt-4 animate-fade-in">
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-5 w-5 text-warning" />
              Security Auditor – Issues & Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="scrollbar-thin max-h-[400px] overflow-auto rounded-lg bg-background/50 p-4 text-sm leading-relaxed text-foreground/90">
              {renderReport(iteration.auditor_report)}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tech Lead Tab */}
      <TabsContent value="lead" className="mt-4 animate-fade-in">
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserCheck className="h-5 w-5 text-info" />
                Tech Lead – Verdict & Guidance
              </CardTitle>
              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  iteration.approved
                    ? 'bg-success/10 text-success ring-1 ring-success/20'
                    : 'bg-destructive/10 text-destructive ring-1 ring-destructive/20'
                }`}
              >
                {iteration.approved ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Ready to Merge
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5" />
                    Needs Revision
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="scrollbar-thin max-h-[400px] overflow-auto rounded-lg bg-background/50 p-4 text-sm leading-relaxed text-foreground/90">
              {iteration.tech_lead_verdict.split('\n').map((line, i) => (
                <p key={i} className={line ? 'mb-2' : 'mb-4'}>
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default IterationTabs;
