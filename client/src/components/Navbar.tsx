import { History, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onHistoryClick: () => void;
}

const Navbar = ({ onHistoryClick }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Agentic Code Reviewer
              </span>
              <span className="text-xs text-muted-foreground">
                Multi-Agent AI System
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Powered By Pill */}
            <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5 ring-1 ring-border sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Powered by Multi-Agent AI
              </span>
            </div>

            {/* History Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onHistoryClick}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Run History</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
