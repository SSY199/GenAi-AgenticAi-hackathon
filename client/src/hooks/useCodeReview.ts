import { useState, useCallback } from "react";
import { RunResult, Iteration } from "@/types/review";

const MAX_HISTORY = 5;
// Ensure this matches your FastAPI port (usually 8000)
const BACKEND_URL = "http://127.0.0.1:8000/api/review";

export const useCodeReview = () => {
  const [currentRun, setCurrentRun] = useState<RunResult | null>(null);
  const [history, setHistory] = useState<RunResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIterationIndex, setSelectedIterationIndex] = useState(0);

  const runReview = useCallback(
    async (feature: string, language: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Send the request to the Python Backend
        console.log(`🚀 Sending request to ${BACKEND_URL}...`);

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: feature }),
        });

        if (!response.ok) {
          throw new Error(`Backend Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Data received from Python:", data);

        // 2. Map the Backend response to the Frontend UI format
        // The backend returns a list of attempts in 'data.history'
        if (!data.history || !Array.isArray(data.history)) {
          throw new Error("Invalid response format from backend");
        }

        const iterations: Iteration[] = data.history.map(
          (step: {
            attempt: number;
            code: string;
            security_report: string;
            tech_lead_verdict: string;
            status: string;
          }) => ({
            iteration: step.attempt,
            junior_code: step.code,
            auditor_report: step.security_report,
            tech_lead_verdict: step.tech_lead_verdict,
            approved: step.status === "approved" || step.status === "success",
          })
        );

        const newRun: RunResult = {
          feature: feature,
          language: language,
          timestamp: new Date(),
          iterations: iterations,
          stats: {
            total_iterations: iterations.length,
            approved: data.final_status === "success",
          },
        };

        // 3. Update State
        setCurrentRun(newRun);
        // Select the last iteration (usually the successful one) so the user sees the green box first
        setSelectedIterationIndex(iterations.length - 1);

        // Add to sidebar history
        setHistory((prev) => {
          const newHistory = [newRun, ...prev].slice(0, MAX_HISTORY);
          return newHistory;
        });
      } catch (err) {
        console.error("❌ Review failed:", err);
        setError('Connection failed. Is "server.py" running on port 8000?');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const selectHistoryRun = useCallback((run: RunResult) => {
    setCurrentRun(run);
    setSelectedIterationIndex(run.iterations.length - 1);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    currentRun,
    history,
    isLoading,
    error,
    selectedIterationIndex,
    setSelectedIterationIndex,
    runReview,
    selectHistoryRun,
    clearError,
  };
};