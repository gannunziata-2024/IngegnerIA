import React, { useState } from 'react';
import { PracticalCase } from '../types';
import { Wrench, Search, Bookmark, Copy, Check, ChevronDown, ChevronUp, Filter, BookOpen } from 'lucide-react';

interface PracticalCasesViewProps {
  cases: PracticalCase[];
  initialTopic?: string;
  isSaved: (key: string) => boolean;
  onToggleSave: (key: string) => void;
}

export const PracticalCasesView: React.FC<PracticalCasesViewProps> = ({
  cases,
  initialTopic,
  isSaved,
  onToggleSave
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'Tutti');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCases, setExpandedCases] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const topics = ['Tutti', ...Array.from(new Set(cases.map((c) => c.topic)))];

  const filtered = cases.filter((c) => {
    const matchTopic = selectedTopic === 'Tutti' || c.topic === selectedTopic;
    const q = searchTerm.toLowerCase();
    const matchSearch = 
      !q ||
      c.label.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.blocks.some((b) => 'text' in b && b.text.toLowerCase().includes(q));
    return matchTopic && matchSearch;
  });

  const toggleExpand = (key: string) => {
    setExpandedCases((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (c: PracticalCase, key: string) => {
    const text = `${c.label} · ${c.topic}\n(Guida CNI pag. ${c.page})\n\n` +
      c.blocks.map((b) => {
        if ('text' in b) return b.text;
        if ('items' in b) return b.items.map((i) => `• ${i}`).join('\n');
        return '';
      }).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <span>Appendice B</span>
            <span>·</span>
            <span>65 Schede Operative</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Wrench className="w-7 h-7 text-emerald-400" />
            <span>Casi Pratici di Ingegneria</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Raccolta completa di 65 situazioni operative reali affrontate dalla Guida CNI, suddivise per settori tecnici, responsabilità e conformità AI Act.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-sky-500/20">
          Visualizzati <strong className="text-emerald-400 font-mono">{filtered.length}</strong> di 65 casi
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca per parola chiave (es. responsabilità penale, LLM, computo, D.Lgs. 231/2001, privacy)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f274a] border border-sky-500/25 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1" />
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'bg-[#0f274a] text-slate-300 hover:text-white border border-sky-500/20 hover:border-sky-400/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-[#0f274a] rounded-2xl border border-sky-500/20">
            Nessun caso pratico trovato per i criteri selezionati.
          </div>
        ) : (
          filtered.map((c, idx) => {
            const key = `case-${c.label}-${c.page}`;
            const isExpanded = expandedCases[key] !== false; // Default open or toggleable
            const saved = isSaved(key);
            const isCopied = copiedKey === key;

            return (
              <div
                key={key}
                className="p-5 sm:p-6 rounded-2xl bg-[#0f274a] border border-sky-500/20 hover:border-sky-400/40 transition-all space-y-4 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        {c.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Guida CNI pag. {c.page}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {c.topic}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(c, key)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Copia testo del caso pratico"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onToggleSave(key)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        saved ? 'text-red-400 bg-red-950/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                      title={saved ? 'Salvato' : 'Salva caso'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Blocks content */}
                <div className="space-y-3 pt-2 border-t border-sky-500/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {c.blocks.map((block, bIdx) => {
                    if (block.type === 'p') {
                      return <p key={bIdx}>{block.text}</p>;
                    }
                    if (block.type === 'ul') {
                      return (
                        <ul key={bIdx} className="space-y-1.5 pl-4 list-disc text-slate-300">
                          {block.items.map((item, iIdx) => (
                            <li key={iIdx}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === 'note') {
                      return (
                        <div key={bIdx} className="p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-xs text-amber-200">
                          {block.title && <strong className="block text-amber-300 mb-1">{block.title}</strong>}
                          {block.text}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
