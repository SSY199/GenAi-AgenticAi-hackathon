import { useState } from 'react';
import { Play, Lightbulb, Loader2, Code2, Repeat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FeatureInputPanelProps {
  onSubmit: (feature: string, language: string, maxIterations: number) => void;
  isLoading: boolean;
}

const EXAMPLE_FEATURES = [
  "Create a sorting function for an array of integers using quicksort algorithm",
  "Implement a function to validate email addresses with regex",
  "Build a rate limiter class with sliding window algorithm",
  "Create a binary search tree with insert, delete, and search methods",
];

const FeatureInputPanel = ({ onSubmit, isLoading }: FeatureInputPanelProps) => {
  const [feature, setFeature] = useState('');
  const [language, setLanguage] = useState('python');
  const [maxIterations, setMaxIterations] = useState('3');

  const handleSubmit = () => {
    if (feature.trim()) {
      onSubmit(feature, language, parseInt(maxIterations));
    }
  };

  const handleTryExample = () => {
    const randomExample = EXAMPLE_FEATURES[Math.floor(Math.random() * EXAMPLE_FEATURES.length)];
    setFeature(randomExample);
  };

  return (
    <Card className="card-gradient border-border shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code2 className="h-5 w-5 text-primary" />
          Describe Your Feature
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Feature Textarea */}
        <div className="space-y-2">
          <Label htmlFor="feature" className="text-sm text-muted-foreground">
            What would you like to build?
          </Label>
          <Textarea
            id="feature"
            placeholder="e.g., I want to create a sorting function for an array of integers..."
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            disabled={isLoading}
            className="min-h-[120px] resize-none bg-background/50 font-mono text-sm placeholder:font-sans placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Language & Iterations */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Language</Label>
            <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Max Iterations</Label>
            <Select value={maxIterations} onValueChange={setMaxIterations} disabled={isLoading}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 iteration</SelectItem>
                <SelectItem value="2">2 iterations</SelectItem>
                <SelectItem value="3">3 iterations</SelectItem>
                <SelectItem value="4">4 iterations</SelectItem>
                <SelectItem value="5">5 iterations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            onClick={handleSubmit}
            disabled={!feature.trim() || isLoading}
            className="flex-1 gap-2 bg-primary font-medium text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running Review...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Review
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleTryExample}
            disabled={isLoading}
            className="gap-2 border-border text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Lightbulb className="h-4 w-4" />
            Try Example
          </Button>
        </div>

        {/* Loading Message */}
        {isLoading && (
          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4 ring-1 ring-primary/10">
            <div className="relative">
              <Repeat className="h-5 w-5 animate-spin text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Agents are collaborating...</p>
              <p className="text-xs text-muted-foreground">
                Junior Dev → Security Auditor → Tech Lead
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureInputPanel;
