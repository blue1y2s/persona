import React, { useState } from 'react';

interface InputPanelProps {
  onGenerate: (text: string[]) => void;
  isExpanded: boolean;
  onExpand: () => void;
}

const PRESETS = [
  {
    title: "The Ranting Poet",
    desc: "High emotion, creative chaos.",
    data: `This world is too loud, yet silence screams.
I hate how people chew with their mouths open, it drives me insane!
But then the moon rises, and I feel this overwhelming peace.
Why can't I just finish one painting without crying?
Everyone thinks I'm dramatic, but I just feel everything at once.
My coffee was cold. A tragedy.`
  },
  {
    title: "The Humble Achiever",
    desc: "Quiet confidence, structured growth.",
    data: `Completed the marathon today. Hard work pays off.
Grateful for the team's support on the project.
Need to refine my schedule for next week.
Reading a book on stoicism, really insightful.
Quiet evening with tea. Perfect.
Promotion confirmed. I'm ready for the responsibility.`
  },
  {
    title: "The Anxious Observer",
    desc: "Detail-oriented, hesitant, warm.",
    data: `I think I said the wrong thing at dinner.
Maybe they didn't mean it that way?
The light hitting the leaves was nice.
I hope mom is okay, haven't heard from her.
Sort of feeling better, but still worried about the deadline.
Just want everyone to be happy.`
  }
];

export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isExpanded, onExpand }) => {
  const [text, setText] = useState('');

  const handleGenerate = () => {
    const lines = text.split('\n');
    onGenerate(lines);
  };

  const handlePreset = (presetText: string) => {
    setText(presetText);
    // Slight delay for UX effect
    setTimeout(() => {
        const lines = presetText.split('\n');
        onGenerate(lines);
    }, 100);
  };

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full md:w-[500px] glass-panel border-r border-white/10 p-10 flex flex-col z-20 shadow-2xl text-slate-200">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-white tracking-tight mb-2">
          Persona Sphere
        </h1>
        <p className="text-sm text-slate-400 font-sans tracking-wide uppercase">Psychological Cartography</p>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Quick Calibration</p>
        {PRESETS.map((p, i) => (
           <button
             key={i}
             onClick={() => handlePreset(p.data)}
             className="text-left p-4 rounded-xl bg-slate-800/50 hover:bg-teal-900/30 border border-white/5 hover:border-teal-500/30 transition-all group"
           >
             <div className="font-serif text-lg text-slate-200 group-hover:text-teal-200">{p.title}</div>
             <div className="text-xs text-slate-500 group-hover:text-slate-400">{p.desc}</div>
           </button>
        ))}
      </div>

      <p className="text-slate-400 text-sm mb-2">Or enter raw stream of consciousness:</p>

      <div className="flex-1 flex flex-col relative mb-4">
        <textarea
          className="flex-1 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-slate-300 text-sm focus:border-teal-500/50 focus:ring-0 focus:outline-none resize-none transition-colors placeholder-slate-600 font-sans leading-relaxed"
          placeholder="What is on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </div>

      <button 
        onClick={handleGenerate}
        disabled={!text.trim()}
        className="py-4 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 text-white font-serif text-lg shadow-lg hover:shadow-teal-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all"
      >
        Materialize Universe
      </button>

      <div className="mt-6 text-center">
        <p className="text-[10px] text-slate-600 tracking-widest uppercase">
          Local Processing • Private Environment
        </p>
      </div>
    </div>
  );
};