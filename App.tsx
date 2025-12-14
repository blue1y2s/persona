import React, { useState } from 'react';
import { SceneOrchestrator } from './components/SceneOrchestrator';
import { InputPanel } from './components/InputPanel';
import { TargetPersonaPanel } from './components/TargetPersonaPanel';
import { PersonaDiffPanel } from './components/PersonaDiffPanel';
import { LanguageInsightsPanel } from './components/LanguageInsightsPanel';
import { WhatIfStudio } from './components/WhatIfStudio';
import { usePostAnalysis } from './hooks/usePostAnalysis';
import { layoutMemorySpheres } from './utils/layout3d';
import { computePersonaDimensions } from './utils/personaDimensions';
import { MemorySphere, AnalyzedPost, PersonaDimensions, TargetPersona, ScenePhase } from './types';
import { clsx } from 'clsx';

type PresentationTab = 'target' | 'gap' | 'insights' | 'simulation' | 'hidden';

function App() {
  const [scenePhase, setScenePhase] = useState<ScenePhase>('caged');
  const [analyzedPosts, setAnalyzedPosts] = useState<AnalyzedPost[]>([]);
  const [spheres, setSpheres] = useState<MemorySphere[]>([]);
  const [currentDimensions, setCurrentDimensions] = useState<PersonaDimensions | null>(null);
  const [targetPersona, setTargetPersona] = useState<TargetPersona | null>(null);
  
  // UI States
  const [activeTab, setActiveTab] = useState<PresentationTab>('target');
  const [uiHidden, setUiHidden] = useState(false);

  const { analyzePosts } = usePostAnalysis();

  const handleGenerate = (lines: string[]) => {
    const analyzed = analyzePosts(lines);
    setAnalyzedPosts(analyzed);
    const positionedSpheres = layoutMemorySpheres(analyzed);
    setSpheres(positionedSpheres);
    const dims = computePersonaDimensions(analyzed);
    setCurrentDimensions(dims);
    setScenePhase('analyzing');
    setUiHidden(false); 
  };

  const isInputPhase = scenePhase === 'input';
  const isUniversePhase = scenePhase === 'universe';

  return (
    <div className="relative w-full h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <SceneOrchestrator 
          scenePhase={scenePhase}
          onPhaseChange={setScenePhase}
          spheres={spheres}
          analyzedPosts={analyzedPosts}
        />
      </div>

      {/* Phase 1: Input Panel (Overlay) */}
      <InputPanel 
        isExpanded={isInputPhase} 
        onExpand={() => {}} 
        onGenerate={handleGenerate} 
      />

      {/* Phase 2: Universe & Presentation Mode */}
      {isUniversePhase && !uiHidden && (
        <>
          {/* Main Floating Content Card */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-[65%] pointer-events-none z-10 flex flex-col justify-end pb-10">
            <div className="glass-panel w-full p-8 rounded-3xl shadow-2xl pointer-events-auto h-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
               {activeTab === 'target' && (
                 <TargetPersonaPanel currentTarget={targetPersona} onTargetChange={setTargetPersona} />
               )}
               {activeTab === 'gap' && (
                 <PersonaDiffPanel currentDimensions={currentDimensions} targetPersona={targetPersona} />
               )}
               {activeTab === 'insights' && (
                 <LanguageInsightsPanel posts={analyzedPosts} dimensions={currentDimensions} />
               )}
               {activeTab === 'simulation' && (
                 <WhatIfStudio currentPosts={analyzedPosts} currentDimensions={currentDimensions} targetPersona={targetPersona} />
               )}
            </div>
          </div>

          {/* Bottom Tab Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
             <div className="bg-slate-900/80 backdrop-blur-md rounded-full p-2 border border-white/10 flex gap-2 shadow-2xl">
                {(['target', 'gap', 'insights', 'simulation'] as PresentationTab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize",
                      activeTab === tab 
                        ? "bg-white text-slate-900 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {tab}
                  </button>
                ))}
             </div>
          </div>
        </>
      )}

      {/* Visibility Toggle (Top Right) */}
      {isUniversePhase && (
        <button 
          onClick={() => setUiHidden(!uiHidden)}
          className="absolute top-6 right-6 z-30 p-3 bg-slate-900/50 backdrop-blur rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          title={uiHidden ? "Show UI" : "Hide UI"}
        >
          {uiHidden ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
          )}
        </button>
      )}
    </div>
  );
}

export default App;