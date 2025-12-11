import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FeatureInputPanel from '@/components/FeatureInputPanel';
import RunSummaryCard from '@/components/RunSummaryCard';
import IterationTimeline from '@/components/IterationTimeline';
import IterationTabs from '@/components/IterationTabs';
import MetricsPanel from '@/components/MetricsPanel';
import HistoryList from '@/components/HistoryList';
import EmptyState from '@/components/EmptyState';
import ErrorBanner from '@/components/ErrorBanner';
import { useCodeReview } from '@/hooks/useCodeReview';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { currentRun, history, isLoading, error, selectedIterationIndex, setSelectedIterationIndex, runReview, selectHistoryRun, clearError } = useCodeReview();

  const handleHistorySelect = (run: typeof currentRun) => {
    if (run) { selectHistoryRun(run); setHistoryOpen(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onHistoryClick={() => setHistoryOpen(true)} />
      <main className="container mx-auto px-4 py-6 lg:py-8">
        {error && <ErrorBanner message={error} onDismiss={clearError} />}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <FeatureInputPanel onSubmit={runReview} isLoading={isLoading} />
              {currentRun && <div className="hidden lg:block"><MetricsPanel run={currentRun} /></div>}
              <div className="hidden lg:block"><HistoryList history={history} onSelect={handleHistorySelect} currentRunTimestamp={currentRun?.timestamp} /></div>
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            {currentRun ? (
              <div className="space-y-6 animate-fade-in">
                <RunSummaryCard run={currentRun} />
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <IterationTimeline iterations={currentRun.iterations} selectedIndex={selectedIterationIndex} onSelect={setSelectedIterationIndex} />
                </div>
                <IterationTabs iteration={currentRun.iterations[selectedIterationIndex]} totalIterations={currentRun.stats.total_iterations} language={currentRun.language} />
                <div className="lg:hidden"><MetricsPanel run={currentRun} /></div>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card/30 p-6"><EmptyState /></div>
            )}
          </div>
        </div>
      </main>
      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader><SheetTitle>Run History</SheetTitle></SheetHeader>
          <div className="mt-6"><HistoryList history={history} onSelect={handleHistorySelect} currentRunTimestamp={currentRun?.timestamp} /></div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
