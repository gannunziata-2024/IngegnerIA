import React, { useState } from 'react';
import { PromptItem } from '../types';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  RotateCcw, 
  Sliders, 
  FileText, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface PromptsViewProps {
  prompts: PromptItem[];
  activePromptId?: number;
  onSelectPrompt: (id?: number) => void;
  isSaved: (key: string) => boolean;
  onToggleSave: (key: string) => void;
  onOpenAiAssistantWithPrompt: (promptText: string) => void;
}

export const PromptsView: React.FC<PromptsViewProps> = ({
  prompts,
  activePromptId,
  onSelectPrompt,
  isSaved,
  onToggleSave,
  onOpenAiAssistantWithPrompt
}) => {
  const [selectedId, setSelectedId] = useState<number>(activePromptId || prompts[0]?.id || 1);
  const [activeTab, setActiveTab] = useState<'origin' | 'custom' | 'generated'>('custom');
  const [copied, setCopied] = useState(false);
  const [customText, setCustomText] = useState<{ [id: number]: string }>({});

  const current = prompts.find((p) => p.id === selectedId) || prompts[0];

  const currentText = customText[current.id] !== undefined ? customText[current.id] : current.origin;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCustomText((prev) => ({ ...prev, [current.id]: current.origin }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span>Appendice E</span>
            <span>·</span>
            <span>Guida CNI pag. 52–55</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-amber-400" />
            <span>Prompt Ingegneristici Ufficiali CNI</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            8 template professionali collaudati per relazionare con LLM nel rispetto delle linee guida deontologiche del CNI.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenAiAssistantWithPrompt(currentText)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ottimizza con Gemini</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Prompt Selector + Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Prompt Navigation List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 px-2 mb-2">
            Catalogo Prompt CNI ({prompts.length})
          </div>
          {prompts.map((p, idx) => {
            const active = p.id === current.id;
            const saved = isSaved(`prompt-${p.id}`);
            return (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  active
                    ? 'bg-[#13305a] border-sky-400 text-white shadow-md'
                    : 'bg-[#0f274a] border-sky-500/20 text-slate-300 hover:bg-[#112d53] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                    active ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{p.title}</div>
                    <div className="text-[10px] text-slate-400">Guida pag. {p.pages?.join(', ')}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(`prompt-${p.id}`);
                  }}
                  className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                    saved ? 'text-red-400' : 'text-slate-500'
                  }`}
                  title={saved ? 'Salvato' : 'Salva prompt'}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Studio Card */}
        <div className="lg:col-span-8 bg-[#0f274a] border border-sky-500/25 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/15 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-400">Prompt #{current.id}</span>
                <span className="text-[11px] text-slate-400 font-mono">Guida CNI pag. {current.pages?.join('–')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {current.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(activeTab === 'generated' ? current.generated : currentText)}
                className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiato!' : 'Copia Prompt'}</span>
              </button>
              <button
                onClick={() => onToggleSave(`prompt-${current.id}`)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved(`prompt-${current.id}`)
                    ? 'text-red-400 bg-red-950/40 border border-red-500/30'
                    : 'text-slate-400 bg-slate-800 hover:text-white'
                }`}
                title="Salva nei preferiti"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Studio Tabs */}
          <div className="flex bg-[#0b1f3a] p-1 rounded-xl border border-sky-500/20 text-xs">
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'custom'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prompt Personalizzabile</span>
            </button>
            <button
              onClick={() => setActiveTab('origin')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'origin'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Formula Originale CNI</span>
            </button>
            <button
              onClick={() => setActiveTab('generated')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'generated'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Output d'Esempio Generato</span>
            </button>
          </div>

          {/* Tab 1: Customizable Prompt Editor */}
          {activeTab === 'custom' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Modifica e adatta i parametri al tuo incarico professionale:</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-sky-400 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ripristina testo CNI</span>
                </button>
              </div>

              <textarea
                rows={9}
                value={currentText}
                onChange={(e) => setCustomText({ ...customText, [current.id]: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/30 text-white font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              />

              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/15 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-300">
                  Pronto da incollare in ChatGPT, Claude o Gemini.
                </span>
                <button
                  onClick={() => handleCopy(currentText)}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copia testo</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Original prompt text */}
          {activeTab === 'origin' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">
                {current.origin}
              </div>
              <div className="text-[11px] text-slate-400">
                Formula testuale fedele al documento originale approvato dal CNI.
              </div>
            </div>
          )}

          {/* Tab 3: Generated output */}
          {activeTab === 'generated' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0b1f3a] border border-emerald-500/30 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto">
                {current.generated}
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-xs text-amber-200">
                <strong>Verifica deontologica necessaria:</strong> Questo output è puramente indicativo della risposta tipica del modello. Ogni dato numerico o citazione deve essere validato dall&rsquo;Ingegnere prima dell&rsquo;uso.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
