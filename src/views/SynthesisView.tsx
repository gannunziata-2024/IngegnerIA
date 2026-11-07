import React, { useState } from 'react';
import { Summary } from '../types';
import { 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  Bookmark, 
  Share2, 
  ExternalLink,
  Compass,
  Shield,
  Wrench,
  AlertTriangle,
  Clock,
  GitFork,
  Calendar,
  Check
} from 'lucide-react';

interface SynthesisViewProps {
  summaries: Summary[];
  activeSummaryId?: string;
  onSelectSummary: (id?: string) => void;
  onNavigate: (route: string, arg?: string) => void;
  isSaved: (key: string) => boolean;
  onToggleSave: (key: string) => void;
}

export const SynthesisView: React.FC<SynthesisViewProps> = ({
  summaries,
  activeSummaryId,
  onSelectSummary,
  onNavigate,
  isSaved,
  onToggleSave
}) => {
  const [viewAll, setViewAll] = useState(false);

  const selected = activeSummaryId 
    ? summaries.find((s) => s.id === activeSummaryId)
    : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>A cura del C3i</span>
            <span>·</span>
            <span>Edita dal CNI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {selected ? selected.title : 'Schede di Sintesi Operative'}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            {selected 
              ? selected.lead 
              : 'I 10 concetti cardine per comprendere e applicare l’Intelligenza Artificiale nella professione di Ingegnere.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selected || viewAll ? (
            <button
              onClick={() => {
                onSelectSummary(undefined);
                setViewAll(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tutte le 10 schede</span>
            </button>
          ) : (
            <button
              onClick={() => setViewAll(true)}
              className="px-3.5 py-2 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vista complessiva</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Stampa schede</span>
          </button>
        </div>
      </div>

      {/* Hero Banner when viewing index */}
      {!selected && !viewAll && (
        <>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#102a4e] to-[#0f274a] border border-sky-500/25 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-400/20 text-sky-300 border border-sky-400/30">
                Principio Fondamentale Deontologico
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white max-w-2xl leading-snug">
                Supporto dell'IA. Controllo e responsabilità esclusiva dell'Ingegnere.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-sky-500/20">
                <div className="p-4 rounded-xl bg-sky-950/50 border border-sky-500/15">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold mb-2">1</div>
                  <h4 className="text-sm font-bold text-white mb-1">Strumento, non sostituto</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    L’IA può accelerare computi, revisioni e bozze, ma il giudizio tecnico e l'interpretazione rimangono umani.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-sky-950/50 border border-sky-500/15">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold mb-2">2</div>
                  <h4 className="text-sm font-bold text-white mb-1">Verifica di ogni output</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nessun calcolo o relazione generata da LLM può essere firmata senza controllo rigoroso e validazione.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-sky-950/50 border border-sky-500/15">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-300 flex items-center justify-center font-bold mb-2">3</div>
                  <h4 className="text-sm font-bold text-white mb-1">Tutela e Riservatezza</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Vietato inserire dati sensibili, particelle catastali o segreti del committente su piattaforme cloud aperte.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick link spotlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => onNavigate('albero')}
              className="p-5 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/50 transition-all cursor-pointer group flex items-start gap-4 shadow-lg"
            >
              <div className="p-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Strumento Interattivo</span>
                <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                  Albero Decisionale AI Act (Appendice D)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Naviga lo schema ufficiale CNI per qualificare il rischio dell'IA e individuare obblighi da Provider o Deployer.
                </p>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('quiz')}
              className="p-5 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/50 transition-all cursor-pointer group flex items-start gap-4 shadow-lg"
            >
              <div className="p-3 rounded-xl bg-[#cd061e]/20 text-red-400 border border-[#cd061e]/30 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Autovalutazione</span>
                <h3 className="font-bold text-white group-hover:text-red-300 transition-colors text-base">
                  Simulatore Quiz Ufficiale CNI
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  50 domande a risposta multipla con spiegazioni normative e punteggio per testare le tue competenze.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((s, index) => {
              const saved = isSaved(`summary-${s.id}`);
              return (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-400/30">
                          {index + 1}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Guida pag. {s.pages?.join('–')}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(`summary-${s.id}`);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          saved ? 'text-red-400 bg-red-950/40' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={saved ? 'Rimuovi dai salvati' : 'Salva scheda'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => onSelectSummary(s.id)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {s.lead}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sky-500/10 flex items-center justify-between">
                    <span className="text-[11px] text-sky-400 font-medium">
                      {s.blocks?.length || 0} punti di analisi
                    </span>
                    <button
                      onClick={() => onSelectSummary(s.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Leggi scheda</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Single Summary Detail View OR View All */}
      {(selected || viewAll) && (
        <div className="space-y-10">
          {(viewAll ? summaries : [selected!]).map((item, idx) => (
            <article 
              key={item.id} 
              id={`summary-${item.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-6 shadow-xl print-page"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/15 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-sky-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                    {summaries.findIndex((s) => s.id === item.id) + 1}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {item.title}
                    </h2>
                    <p className="text-xs text-sky-300 font-medium">
                      Riferimento: Guida CNI pag. {item.pages?.join('–')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSave(`summary-${item.id}`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isSaved(`summary-${item.id}`)
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isSaved(`summary-${item.id}`) ? 'Salvata' : 'Salva'}</span>
                  </button>
                </div>
              </div>

              {item.lead && (
                <div className="p-4 rounded-xl bg-sky-950/40 border-l-4 border-sky-400 text-slate-200 text-sm leading-relaxed">
                  {item.lead}
                </div>
              )}

              {/* Blocks */}
              <div className="space-y-6">
                {item.blocks?.map((block, bIdx) => renderSummaryBlock(block, bIdx, onNavigate))}
              </div>

              {/* Action Link if provided */}
              {item.action && (
                <div className="pt-4 border-t border-sky-500/15 flex justify-end">
                  <button
                    onClick={() => {
                      const [route, arg] = item.action!.href.replace('#', '').split('/');
                      onNavigate(route, arg);
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>{item.action.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </article>
          ))}

          {/* Stepper navigation at bottom of single sheet */}
          {selected && !viewAll && (
            <div className="flex items-center justify-between pt-6 border-t border-sky-500/15">
              {(() => {
                const currentIndex = summaries.findIndex((s) => s.id === selected.id);
                const prev = summaries[currentIndex - 1];
                const next = summaries[currentIndex + 1];

                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => onSelectSummary(prev.id)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Precedente: Scheda {currentIndex}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {next ? (
                      <button
                        onClick={() => onSelectSummary(next.id)}
                        className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                      >
                        <span>Successiva: Scheda {currentIndex + 2}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('prompt')}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                      >
                        <span>Passa ai Prompt Ingegneristici</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Render helper for different block types within summary sheets
function renderSummaryBlock(block: any, key: number, onNavigate: (route: string, arg?: string) => void) {
  // 1. CARDS BLOCK
  if (block.type === 'cards' && block.items) {
    const colsClass = block.cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
    return (
      <div key={key} className="space-y-3">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className={`grid grid-cols-1 ${colsClass} gap-3`}>
          {block.items.map((item: any, i: number) => {
            let IconComp = Layers;
            if (item.icon === 'tools') IconComp = Wrench;
            if (item.icon === 'compass') IconComp = Compass;
            if (item.icon === 'check') IconComp = CheckCircle2;
            if (item.icon === 'shield') IconComp = Shield;
            if (item.icon === 'alert') IconComp = AlertTriangle;

            return (
              <div key={i} className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 space-y-2 hover:border-sky-400/40 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-950 text-sky-400 border border-sky-500/30">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. FLOW / STEP-BY-STEP BLOCK
  if (block.type === 'flow' && (block.items || block.steps)) {
    const flowItems = block.items || block.steps || [];
    return (
      <div key={key} className="space-y-3">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {flowItems.map((st: any, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-500/30">
                  {i + 1}
                </span>
                <h4 className="text-sm font-bold text-white truncate">{st.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{st.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. CALLOUT / DEONTOLOGICAL ALERT BLOCK
  if (block.type === 'callout') {
    const isRed = block.tone === 'red';
    return (
      <div 
        key={key} 
        className={`p-4 rounded-xl border flex items-start gap-3.5 ${
          isRed 
            ? 'bg-red-950/30 border-red-500/40 text-red-100' 
            : 'bg-amber-950/30 border-amber-500/40 text-amber-100'
        }`}
      >
        <div className={`p-2 rounded-lg shrink-0 ${isRed ? 'bg-red-900/40 text-red-400' : 'bg-amber-900/40 text-amber-400'}`}>
          {isRed ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        <div className="space-y-1 min-w-0">
          {block.title && <h4 className="text-sm font-bold text-white">{block.title}</h4>}
          <p className="text-xs leading-relaxed text-slate-200">{block.text}</p>
        </div>
      </div>
    );
  }

  // 4. RISK CLASSES MAP (AI ACT ART. 6)
  if (block.type === 'risk' && block.rows && Array.isArray(block.rows)) {
    const headers = block.rows[0] || ['CLASSE DI RISCHIO', 'ESEMPI', 'DESCRIZIONE'];
    const dataRows = block.rows.slice(1);

    const getRiskBadge = (clsName: string) => {
      const lower = clsName.toLowerCase();
      if (lower.includes('inaccettabile') || lower.includes('vietato')) {
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-950 text-red-400 border border-red-500/40 uppercase tracking-wide">Inaccettabile</span>;
      }
      if (lower.includes('alto')) {
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-950 text-amber-400 border border-amber-500/40 uppercase tracking-wide">Alto Rischio</span>;
      }
      if (lower.includes('limitato')) {
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-950 text-sky-300 border border-sky-500/40 uppercase tracking-wide">Rischio Limitato</span>;
      }
      return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40 uppercase tracking-wide">Rischio Minimo</span>;
    };

    return (
      <div key={key} className="space-y-2.5">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className="overflow-x-auto rounded-xl border border-sky-500/25 bg-[#0b1f3a] shadow-inner">
          <table className="w-full text-left text-xs divide-y divide-sky-500/15">
            <thead className="bg-[#13305a] text-sky-200 font-bold uppercase tracking-wider">
              <tr>
                {headers.map((h: string, hIdx: number) => (
                  <th key={hIdx} className="p-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {dataRows.map((row: string[], rIdx: number) => (
                <tr key={rIdx} className="hover:bg-sky-950/40 transition-colors">
                  <td className="p-3 font-semibold text-white whitespace-nowrap align-top">
                    <div className="space-y-1">
                      <div>{row[0]}</div>
                      {getRiskBadge(row[0])}
                    </div>
                  </td>
                  <td className="p-3 text-slate-300 leading-relaxed align-top">
                    {row[1]}
                  </td>
                  <td className="p-3 text-slate-300 leading-relaxed align-top">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 5. TABLE / COMPARATIVE MATRIX (Art. 13 Codice Deontologico, Cloud vs On-Premise, Responsabilità, etc.)
  if (block.type === 'table' && block.rows && Array.isArray(block.rows)) {
    const headers = block.rows[0] || [];
    const dataRows = block.rows.slice(1);

    return (
      <div key={key} className="space-y-2.5">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className="overflow-x-auto rounded-xl border border-sky-500/25 bg-[#0b1f3a] shadow-inner">
          <table className="w-full text-left text-xs divide-y divide-sky-500/15">
            <thead className="bg-[#13305a] text-sky-200 font-bold uppercase tracking-wider">
              <tr>
                {headers.map((h: string, hIdx: number) => (
                  <th key={hIdx} className={`p-3 ${hIdx === 0 ? 'w-24 sm:w-36 whitespace-nowrap' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {dataRows.map((row: string[], rIdx: number) => (
                <tr key={rIdx} className="hover:bg-sky-950/40 transition-colors">
                  {row.map((cell: string, cellIdx: number) => (
                    <td 
                      key={cellIdx} 
                      className={`p-3 align-top leading-relaxed ${
                        cellIdx === 0 
                          ? 'font-bold text-white whitespace-nowrap text-sky-300 font-mono' 
                          : 'text-slate-300'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 6. FORK / COMPARATIVE BRANCHES (Deployer vs Provider)
  if (block.type === 'fork' && block.branches) {
    return (
      <div key={key} className="space-y-3">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {block.branches.map((br: any, i: number) => (
            <div key={i} className="p-5 rounded-xl bg-[#0b1f3a] border border-sky-500/25 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {br.role}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{br.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{br.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. PROMPTMAP / QUICK LINK TO 8 PROMPTS
  if (block.type === 'promptmap') {
    const promptNames = [
      '1. Sintetizzare una norma',
      '2. Revisionare una relazione tecnica',
      '3. Analizzare un capitolato',
      '4. Confrontare testi normativi',
      '5. Generare una checklist',
      '6. Riassumere una sentenza',
      '7. Tabella comparativa',
      '8. Individuare criticità'
    ];

    return (
      <div key={key} className="space-y-3 p-5 rounded-2xl bg-[#0b1f3a] border border-amber-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">{block.title || 'Modelli Pronti (Appendice E)'}</h4>
          </div>
          <button
            onClick={() => onNavigate('prompt')}
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Apri studio prompt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {promptNames.map((name, pIdx) => (
            <button
              key={pIdx}
              onClick={() => onNavigate('prompt', String(pIdx + 1))}
              className="p-2.5 rounded-lg bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 text-left text-xs font-semibold text-slate-300 hover:text-white transition-all truncate"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 8. TIMELINE BLOCK (Date e scadenze normative)
  if (block.type === 'timeline' && block.items) {
    return (
      <div key={key} className="space-y-3">
        {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
        <div className="space-y-2.5">
          {block.items.map((it: any, i: number) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#0b1f3a] border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-sky-950 text-sky-300 font-mono font-bold text-xs border border-sky-500/30 shrink-0">
                  {it.date}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{it.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{it.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. NOTE BANNER
  if (block.type === 'note' || block.note) {
    return (
      <div key={key} className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-xs text-amber-200/90 leading-relaxed">
        {block.title && <strong className="block text-amber-300 mb-1">{block.title}</strong>}
        {block.text || block.note}
      </div>
    );
  }

  // 10. DEFAULT / GENERIC LIST FALLBACK
  return (
    <div key={key} className="space-y-2">
      {block.title && <h3 className="text-base font-bold text-white">{block.title}</h3>}
      {block.text && <p className="text-sm text-slate-300 leading-relaxed">{block.text}</p>}
      {block.items && Array.isArray(block.items) && (
        <ul className="space-y-2 pl-4 list-disc text-sm text-slate-300">
          {block.items.map((it: any, i: number) => (
            <li key={i} className="leading-relaxed">
              {typeof it === 'string' ? it : <span><strong>{it.title}:</strong> {it.text}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
