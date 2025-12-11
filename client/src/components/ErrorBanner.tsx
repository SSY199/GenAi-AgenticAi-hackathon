import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

const ErrorBanner = ({ message, onDismiss }: ErrorBannerProps) => {
  return (
    <div className="animate-fade-in mb-4 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 ring-1 ring-destructive/20">
      <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
      <p className="flex-1 text-sm text-destructive">{message}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDismiss}
        className="h-7 w-7 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ErrorBanner;
