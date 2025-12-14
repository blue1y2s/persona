import React, { useState } from 'react';
import { TargetPersona, PersonaDimensions } from '../types';
import { getDefaultTargetPersonas } from '../utils/personaDimensions';
import { clsx } from 'clsx';

interface TargetPersonaPanelProps {
  currentTarget: TargetPersona | null;
  onTargetChange: (target: TargetPersona) => void;
}

export const TargetPersonaPanel: React.FC<TargetPersonaPanelProps> = ({ currentTarget, onTargetChange }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const presets = getDefaultTargetPersonas();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-serif text-white mb-2">Target Ideal</h2>
        <p className="text-slate-400 text-sm">Select an archetype to compare your current mental state against.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {presets.map(p => (
          <div 
            key={p.id}
            onClick={() => onTargetChange(p)}
            className={clsx(
              "cursor-pointer p-6 rounded-2xl border transition-all duration-300",
              currentTarget?.id === p.id 
                ? "bg-white/10 border-teal-400/50 shadow-[0_0_20px_rgba(45,212,191,0.1)]" 
                : "bg-slate-900/40 border-white/5 hover:bg-white/5 hover:border-white/20"
            )}
          >
            <div className="flex justify-between items-center mb-2">
                 <div className={clsx("font-serif text-xl", currentTarget?.id === p.id ? "text-teal-200" : "text-slate-200")}>{p.name}</div>
                 {currentTarget?.id === p.id && <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />}
            </div>
            <div className="text-sm text-slate-400 leading-relaxed">{p.description}</div>
          </div>
        ))}

        <div className="mt-8 p-6 rounded-2xl border border-dashed border-white/10 text-center">
             <p className="text-slate-500 text-sm">Custom parameter tuning available in Pro version.</p>
        </div>
      </div>
    </div>
  );
};