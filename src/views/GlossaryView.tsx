import React, { useState } from 'react';
import { GlossaryTerm } from '../types';
import { HelpCircle, Search, Copy, Check, Bookmark } from 'lucide-react';

interface GlossaryViewProps {
  terms: GlossaryTerm[];
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ terms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('TUTTI');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const letters = ['TUTTI', ...Array.from(new Set(terms.map((t) => t.term[0].toUpperCase()))).sort()];

  const filtered = terms.filter((t) => {
    const matchLetter = selectedLetter === 'TUTTI' || t.term[0].toUpperCase() === selectedLetter;
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || t.term.toLowerCase().includes(q) || t.text.toLowerCase().includes(q);
    return matchLetter && matchSearch;
  });

  const handleCopy = (term: GlossaryTerm) => {
    navigator.clipboard.writeText(`${term.term} (Guida CNI pag. ${term.page}):\n${term.text}`);
    setCopiedTerm(term.term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <span>Glossario Essenziale</span>
            <span>·</span>
            <span>Guida CNI pag. 8–9</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-cyan-400" />
            <span>Glossario Tecnico-Giuridico dell&rsquo;IA</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            23 definizioni ufficiali per orientarsi tra i termini cardine del Regolamento Europeo AI Act, della Legge 132/2025 e dell&rsquo;Ingegneria dei Dati.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-sky-500/20">
          <strong className="text-cyan-400 font-mono">{filtered.length}</strong> lemmi trovati
        </div>
      </div>

      {/* Search and Alphabet Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca definizione (es. Deployer, Allucinazione, High-Risk, RAG, Provider)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f274a] border border-sky-500/25 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        {/* Alphabet Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedLetter === letter
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'bg-[#0f274a] text-slate-300 hover:text-white border border-sky-500/20'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => {
          const isCopied = copiedTerm === t.term;
          return (
            <div
              key={t.term}
              className="p-5 sm:p-6 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between space-y-3 shadow-md group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {t.term}
                  </h3>
                  <button
                    onClick={() => handleCopy(t)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copia definizione"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.text}
                </p>
              </div>

              <div className="pt-3 border-t border-sky-500/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Riferimento: Guida CNI</span>
                <span>Pag. {t.page}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
