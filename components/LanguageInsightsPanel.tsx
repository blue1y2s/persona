import React, { useMemo } from 'react';
import { AnalyzedPost, PersonaDimensions } from '../types';

interface LanguageInsightsPanelProps {
  posts: AnalyzedPost[];
  dimensions: PersonaDimensions | null;
}

export const LanguageInsightsPanel: React.FC<LanguageInsightsPanelProps> = ({ posts, dimensions }) => {
  const insights = useMemo(() => {
    if (posts.length === 0 || !dimensions) return [];
    
    const results: string[] = [];
    const count = posts.length;
    const rants = posts.filter(p => p.category === 'rant').length;
    const achievements = posts.filter(p => p.category === 'achievement').length;
    const relationships = posts.filter(p => p.category === 'relationship').length;

    if (rants > achievements * 2 && rants > 3) results.push(`Frustration expression (${((rants/count)*100).toFixed(0)}%) dominates celebration.`);
    if (achievements > rants * 3) results.push(`Strong achievement focus suggests high drive but potential emotional suppression.`);
    if (relationships < 2) results.push(`Internal narrative detected; limited social connection in current memory stream.`);
    if (dimensions.emotionality > 0.8) results.push(`High emotional volatility indicates passionate but potentially unstable states.`);
    if (dimensions.confidence < 0.4) results.push(`Hesitant language patterns ("maybe", "sort of") are undermining perceived authority.`);
    if (results.length === 0) results.push("Psychological equilibrium detected across all dimensions.");

    return results;
  }, [posts, dimensions]);

  if (!dimensions) return <div className="text-slate-500 italic p-8">No data to analyze.</div>;

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-serif text-white mb-2">Deep Insights</h2>
        <p className="text-slate-400 text-sm">Pattern recognition from the subconscious stream.</p>
      </div>
      
      <div className="space-y-4">
        {insights.map((text, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex gap-4 items-start">
            <span className="text-teal-400 text-2xl font-serif mt-[-5px]">“</span>
            <p className="text-slate-300 font-serif leading-relaxed text-lg">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};