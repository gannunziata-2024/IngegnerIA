import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sparkles, CheckSquare, FileText, HelpCircle, ArrowRight, Layers } from 'lucide-react';
import { AppData } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
  onNavigate: (route: string, arg?: string) => void;
}

interface SearchResult {
  category: 'sintesi' | 'prompt' | 'pratica' | 'modelli' | 'checklist' | 'glossario' | 'quiz';
  categoryLabel: string;
  title: string;
  snippet: string;
  route: string;
  arg?: string;
  page?: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results: SearchResult[] = [];
  const q = searchTerm.toLowerCase().trim();

  if (q.length >= 2) {
    // 1. Summaries
    data.summaries.forEach((s) => {
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchLead = s.lead.toLowerCase().includes(q);
      const matchBlocks = s.blocks.some((b) => 
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.text && b.text.toLowerCase().includes(q))
      );
      if (matchTitle || matchLead || matchBlocks) {
        results.push({
          category: 'sintesi',
          categoryLabel: 'Scheda di Sintesi',
          title: s.title,
          snippet: s.lead || 'Approfondimento concettuale CNI',
          route: 'sintesi',
          arg: s.id,
          page: s.pages?.[0]
        });
      }
    });

    // 2. Prompts
    data.prompts.forEach((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchOrigin = p.origin.toLowerCase().includes(q);
      const matchGen = p.generated.toLowerCase().includes(q);
      if (matchTitle || matchOrigin || matchGen) {
        results.push({
          category: 'prompt',
          categoryLabel: 'Prompt Ingegneristico',
          title: p.title,
          snippet: p.origin.slice(0, 120) + '...',
          route: 'prompt',
          arg: String(p.id),
          page: p.pages?.[0]
        });
      }
    });

    // 3. Practical cases
    data.practical.forEach((pc) => {
      const matchLabel = pc.label.toLowerCase().includes(q);
      const matchTopic = pc.topic.toLowerCase().includes(q);
      const matchBlock = pc.blocks.some((b) => 'text' in b && b.text.toLowerCase().includes(q));
      if (matchLabel || matchTopic || matchBlock) {
        const firstText = pc.blocks.find((b) => 'text' in b) as { text: string } | undefined;
        results.push({
          category: 'pratica',
          categoryLabel: 'Caso Pratico',
          title: `${pc.label} · ${pc.topic}`,
          snippet: firstText ? firstText.text.slice(0, 110) + '...' : pc.topic,
          route: 'pratica',
          arg: pc.topic,
          page: pc.page
        });
      }
    });

    // 4. Contract models
    data.models.forEach((m) => {
      if (m.title.toLowerCase().includes(q) || m.text.toLowerCase().includes(q)) {
        results.push({
          category: 'modelli',
          categoryLabel: 'Modello Contrattuale',
          title: m.title,
          snippet: m.text.slice(0, 110) + '...',
          route: 'modelli',
          arg: m.id,
          page: m.page
        });
      }
    });

    // 5. Checklists
    data.checks.forEach((c, idx) => {
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchItem = c.items.some((i) => i.toLowerCase().includes(q));
      if (matchTitle || matchItem) {
        results.push({
          category: 'checklist',
          categoryLabel: 'Checklist Operativa',
          title: c.title,
          snippet: `Verifica di conformità composta da ${c.items.length} punti di controllo.`,
          route: 'checklist',
          page: c.page
        });
      }
    });

    // 6. Glossary
    data.glossary.forEach((g) => {
      if (g.term.toLowerCase().includes(q) || g.text.toLowerCase().includes(q)) {
        results.push({
          category: 'glossario',
          categoryLabel: 'Glossario CNI',
          title: g.term,
          snippet: g.text.slice(0, 120) + '...',
          route: 'glossario',
          page: g.page
        });
      }
    });

    // 7. Quiz
    data.quizzes.forEach((quiz) => {
      if (quiz.question.toLowerCase().includes(q) || quiz.explanation.toLowerCase().includes(q)) {
        results.push({
          category: 'quiz',
          categoryLabel: 'Domanda Quiz CNI',
          title: `Parte ${quiz.part}: ${quiz.question}`,
          snippet: quiz.explanation.slice(0, 110) + '...',
          route: 'quiz',
          page: quiz.page
        });
      }
    });
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sintesi': return <Layers className="w-4 h-4 text-sky-400" />;
      case 'prompt': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'pratica': return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'modelli': return <FileText className="w-4 h-4 text-indigo-400" />;
      case 'checklist': return <CheckSquare className="w-4 h-4 text-teal-400" />;
      case 'glossario': return <HelpCircle className="w-4 h-4 text-cyan-400" />;
      default: return <HelpCircle className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="bg-[#0f274a] border border-sky-500/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(11, 31, 58, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)'
        }}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-sky-500/20 bg-[#13305a]/80 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca nella Guida CNI, prompt, casi pratici, clausole, quiz..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto flex-1 divide-y divide-sky-500/10">
          {searchTerm.length < 2 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>Digita almeno 2 caratteri per effettuare la ricerca.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['High-Risk', 'Art. 13', 'LLM', 'Computo metrico', 'NTC 2018', 'Deployer', 'Privacy'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setSearchTerm(keyword)}
                    className="px-2.5 py-1 text-xs rounded-full bg-sky-950/60 border border-sky-500/20 text-sky-300 hover:bg-sky-900/60 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Nessun risultato trovato per &ldquo;<span className="text-white font-medium">{searchTerm}</span>&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider px-3 py-1">
                Trovati {results.length} elementi
              </div>
              {results.map((res, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onNavigate(res.route, res.arg);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-sky-950/60 cursor-pointer transition-colors group flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(res.category)}
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        {res.categoryLabel}
                      </span>
                      {res.page && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          Pag. {res.page}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
                      {res.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
