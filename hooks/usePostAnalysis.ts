import { useCallback } from 'react';
import { AnalyzedPost } from '../types';
import { analyzeTextRuleBased } from '../utils/sentimentRules';

export function usePostAnalysis() {
  const analyzePosts = useCallback((lines: string[]): AnalyzedPost[] => {
    // Filter empty lines and take max 50
    const validLines = lines
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .slice(0, 50);

    return validLines.map((line, index) => {
      const { sentimentScore, intensity, category } = analyzeTextRuleBased(line, index);
      
      return {
        id: `post-${index}-${Date.now()}`,
        originalText: line,
        sentimentScore,
        intensity,
        category,
        timestampIndex: index,
      };
    });
  }, []);

  return { analyzePosts };
}