import React, { useState } from 'react';
import { AnalyzedPost, PersonaDimensions, TargetPersona } from '../types';
import { usePostAnalysis } from '../hooks/usePostAnalysis';
import { computePersonaDimensions } from '../utils/personaDimensions';

interface WhatIfStudioProps {
  currentPosts: AnalyzedPost[];
  currentDimensions: PersonaDimensions | null;
  targetPersona: TargetPersona | null;
}

export const WhatIfStudio: React.FC<WhatIfStudioProps> = ({ currentPosts, currentDimensions, targetPersona }) => {
  const [draft, setDraft] = useState('');
  const [simulatedDims, setSimulatedDims] = useState<PersonaDimensions | null>(null);
  const { analyzePosts } = usePostAnalysis(); 

  const handleSimulate = () => {
    if (!draft.trim()) return;
    const newPostAnalysis = analyzePosts([draft])[0];
    const combinedPosts = [...currentPosts, newPostAnalysis];
    const newDims = computePersonaDimensions(combinedPosts);
    setSimulatedDims(newDims);
  };

  return (
    <div className="h-full flex flex-col">
       <div className="mb-6">
        <h2 className="text-3xl font-serif text-white mb-2">Simulation</h2>
        <p className="text-slate-400 text-sm">Test how new thoughts shift your psychological geometry.</p>
      </div>
      
      <div className="flex-1 flex flex-col">
        <textarea
          className="w-full bg-slate-900/50 border border-white/10 p-6 text-lg text-slate-200 mb-4 focus:border-teal-500/50 outline-none resize-none rounded-xl h-40 placeholder-slate-600 font-serif"
          placeholder="Draft a thought to see how it reshapes the universe..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        
        <button 
          onClick={handleSimulate}
          disabled={!draft}
          className="w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors disabled:opacity-30 border border-white/5 mb-6"
        >
          Run Simulation
        </button>

        {simulatedDims && currentDimensions && (
          <div className="p-6 bg-teal-900/20 rounded-xl border border-teal-500/20">
              <h4 className="text-xs font-bold text-teal-300 uppercase mb-4 tracking-widest">Predicted Shift</h4>
              <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(simulatedDims) as Array<keyof PersonaDimensions>).map(k => {
                      const diff = simulatedDims[k] - currentDimensions[k];
                      if (Math.abs(diff) < 0.005) return null;
                      return (
                          <div key={k} className="flex justify-between text-sm">
                              <span className="text-slate-400 capitalize">{k}</span>
                              <span className={diff > 0 ? "text-teal-400" : "text-rose-400"}>
                                  {diff > 0 ? "↑" : "↓"} {(Math.abs(diff) * 100).toFixed(2)}%
                              </span>
                          </div>
                      )
                  })}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};