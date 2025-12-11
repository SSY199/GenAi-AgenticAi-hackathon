import { useState, useCallback } from 'react';
import { RunResult, ReviewRequest } from '@/types/review';

// Mock API response for demo
const mockApiResponse = (request: ReviewRequest): Promise<RunResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const iterations = [];
      const maxIter = request.maxIterations;
      const willApprove = Math.random() > 0.3;
      const approveAt = willApprove ? Math.min(maxIter, Math.ceil(Math.random() * maxIter)) : -1;

      for (let i = 1; i <= (willApprove ? approveAt : maxIter); i++) {
        const isApproved = i === approveAt;
        
        iterations.push({
          iteration: i,
          junior_code: generateMockCode(request.feature, request.language, i),
          auditor_report: generateMockAuditReport(i, isApproved),
          tech_lead_verdict: generateMockVerdict(i, isApproved),
          approved: isApproved,
        });
      }

      resolve({
        feature: request.feature,
        iterations,
        stats: {
          total_iterations: iterations.length,
          approved: willApprove,
        },
        language: request.language,
        timestamp: new Date(),
      });
    }, 2000 + Math.random() * 1500);
  });
};

const generateMockCode = (feature: string, language: string, iteration: number): string => {
  const pythonCode = `# Iteration ${iteration} - Implementation
# Feature: ${feature}

def solution(arr: list) -> list:
    """
    ${feature}
    
    Args:
        arr: Input array of integers
        
    Returns:
        Processed array based on requirements
    """
    if not arr:
        return []
    
    # Implementation logic${iteration > 1 ? ' (revised based on feedback)' : ''}
    result = []
    
    for item in arr:
        # Process each element
        processed = self._process_item(item)
        result.append(processed)
    
    return sorted(result)

def _process_item(self, item: int) -> int:
    """Process individual item with validation."""
    if not isinstance(item, int):
        raise TypeError("Expected integer value")
    return item * 2

# Unit tests
def test_solution():
    assert solution([3, 1, 2]) == [2, 4, 6]
    assert solution([]) == []
    assert solution([1]) == [2]
`;

  const jsCode = `// Iteration ${iteration} - Implementation
// Feature: ${feature}

/**
 * ${feature}
 * @param {number[]} arr - Input array of integers
 * @returns {number[]} Processed array
 */
function solution(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  // Implementation logic${iteration > 1 ? ' (revised based on feedback)' : ''}
  const result = arr
    .map(item => processItem(item))
    .sort((a, b) => a - b);

  return result;
}

function processItem(item) {
  if (typeof item !== 'number') {
    throw new TypeError('Expected number value');
  }
  return item * 2;
}

// Tests
console.assert(JSON.stringify(solution([3, 1, 2])) === '[2,4,6]');
console.assert(JSON.stringify(solution([])) === '[]');

module.exports = { solution };
`;

  return language === 'python' ? pythonCode : jsCode;
};

const generateMockAuditReport = (iteration: number, isApproved: boolean): string => {
  if (isApproved) {
    return `## Security Audit Report - Iteration ${iteration}

### Summary
✅ All previous issues have been addressed. The code is now ready for production.

### Checks Performed
- Input validation: PASSED
- Type safety: PASSED  
- Error handling: PASSED
- Edge cases: PASSED

### Notes
- Proper type checking implemented
- Empty array handling is correct
- No SQL injection or XSS vulnerabilities
- Memory usage is optimal

### Recommendation
LOW risk - Code is safe to deploy.`;
  }

  const issues = [
    `### Issue 1: Missing Input Validation (HIGH)
The function does not validate input types before processing. An attacker could pass malicious data.

**Recommendation:** Add type checking at function entry point.`,
    `### Issue 2: Potential Memory Leak (MEDIUM)
Large arrays could cause memory issues without proper bounds checking.

**Recommendation:** Implement array size limits and streaming for large datasets.`,
    `### Issue 3: Insufficient Error Handling (MEDIUM)
Exceptions are not properly caught and could leak stack traces.

**Recommendation:** Wrap critical sections in try-catch blocks.`,
    `### Issue 4: Missing Documentation (LOW)
Function lacks proper docstrings explaining parameters and return values.

**Recommendation:** Add comprehensive documentation.`,
  ];

  return `## Security Audit Report - Iteration ${iteration}

### Summary
⚠️ ${4 - iteration} issues found that need to be addressed before approval.

${issues.slice(0, 4 - iteration).join('\n\n')}

### Next Steps
Please address the above issues and resubmit for review.`;
};

const generateMockVerdict = (iteration: number, isApproved: boolean): string => {
  if (isApproved) {
    return `## Tech Lead Review - Iteration ${iteration}

### Decision: ✅ APPROVED

Great work on addressing all the feedback! The code is now production-ready.

### What Was Fixed
- Input validation is now comprehensive
- Error handling follows best practices
- Code is well-documented and readable
- All edge cases are properly handled

### Final Notes
The implementation is clean, efficient, and follows our coding standards. 
Ready to merge into main branch.

Good job on the iterative improvements! 🎉`;
  }

  return `## Tech Lead Review - Iteration ${iteration}

### Decision: ❌ NEEDS REVISION

The code shows promise but requires additional work before approval.

### Key Concerns
1. Security issues identified by the auditor must be fixed
2. Code structure could be more modular
3. Consider adding more comprehensive tests

### Guidance for Next Iteration
- Focus on the HIGH severity issues first
- Add defensive programming patterns
- Consider edge cases more thoroughly
- Follow the team's style guide

### Encouragement
You're making progress! Address the security concerns and this should be ready to go.`;
};

const MAX_HISTORY = 5;

export const useCodeReview = () => {
  const [currentRun, setCurrentRun] = useState<RunResult | null>(null);
  const [history, setHistory] = useState<RunResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIterationIndex, setSelectedIterationIndex] = useState(0);

  const runReview = useCallback(async (feature: string, language: string, maxIterations: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In production, replace with actual API call:
      // const response = await fetch('/api/review', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ feature, maxIterations, language }),
      // });
      // const result = await response.json();
      
      const result = await mockApiResponse({ feature, maxIterations, language });
      
      setCurrentRun(result);
      setSelectedIterationIndex(result.iterations.length - 1);
      
      // Add to history
      setHistory(prev => {
        const newHistory = [result, ...prev].slice(0, MAX_HISTORY);
        return newHistory;
      });
    } catch (err) {
      console.error('Review failed:', err);
      setError('Something went wrong while running the review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
