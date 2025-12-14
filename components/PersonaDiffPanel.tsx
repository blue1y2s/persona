import React, { useMemo } from 'react';
import { PersonaDimensions, TargetPersona } from '../types';
import { computeDimensionDiff } from '../utils/personaDimensions';
import { clsx } from 'clsx';

interface PersonaDiffPanelProps {
  currentDimensions: PersonaDimensions | null;
  targetPersona: TargetPersona | null;
}

export const PersonaDiffPanel: React.FC<PersonaDiffPanelProps> = ({ currentDimensions, targetPersona }) => {
  const diffs = useMemo(() => {
    if (!currentDimensions || !targetPersona) return null;
    return computeDimensionDiff(currentDimensions, targetPersona.dimensions);
  }, [currentDimensions, targetPersona]);

  if (!currentDimensions) return <div className="text-slate-500 italic p-8">No consciousness detected yet.</div>;
  if (!targetPersona) return <div className="text-slate-500 italic p-8">Select a target archetype to reveal gaps.</div>;

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
       <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">Gap Analysis</h2>
        <p className="text-slate-400 text-sm">Visualizing the dissonance between reality and ideal.</p>
      </div>

      <div className="space-y-8">
        {(Object.keys(currentDimensions) as Array<keyof PersonaDimensions>).map((key) => {
          const currentVal = currentDimensions[key];
          const targetVal = targetPersona.dimensions[key];
          const diff = targetVal - currentVal;
          const isAligned = Math.abs(diff) < 0.1;
          
          return (
            <div key={key} className="relative group">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{key}</span>
                <span className={clsx("font-serif text-2xl", isAligned ? "text-slate-500" : (diff > 0 ? "text-teal-400" : "text-rose-400"))}>
                   {diff > 0 ? '+' : ''}{(diff * 100).toFixed(0)}%
                </span>
              </div>
              
              {/* Track */}
              <div className="h-4 w-full bg-slate-900 rounded-full relative overflow-hidden border border-white/5">
                
                {/* Current Value Bar (Glowing) */}
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_currentColor]"
                  style={{ 
                      width: `${currentVal * 100}%`,
                      backgroundColor: isAligned ? '#94a3b8' : (diff > 0 ? '#f43f5e' : '#2dd4bf'),
                      color: isAligned ? '#94a3b8' : (diff > 0 ? '#f43f5e' : '#2dd4bf')
                  }}
                />

                {/* Target Marker */}
                <div 
                  className="absolute top-0 bottom-0 w-[4px] bg-white/80 z-20 shadow-[0_0_10px_white]"
                  style={{ left: `${targetVal * 100}%` }}
                />
              </div>

              {/* Tooltip hint */}
              <div className="mt-1 text-right">
                <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Target: {(targetVal * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};