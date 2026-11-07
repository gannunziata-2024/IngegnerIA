import React, { useState, useEffect } from 'react';
import { ChecklistGroup } from '../types';
import { CheckSquare, RotateCcw, Copy, Check, Printer, FileDown, ShieldCheck } from 'lucide-react';

interface ChecklistViewProps {
  checkGroups: ChecklistGroup[];
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({ checkGroups }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('cni_checklist_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cni_checklist_state', JSON.stringify(checkedItems));
    } catch {}
  }, [checkedItems]);

  const toggleCheck = (groupIndex: number, itemIndex: number) => {
    const key = `${groupIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    if (window.confirm('Vuoi davvero azzerare tutte le spunte delle checklist?')) {
      setCheckedItems({});
    }
  };

  const totalItems = checkGroups.reduce((acc, g) => acc + g.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const handleExportMarkdown = () => {
    const md = checkGroups
      .map((g, gIdx) => {
        const items = g.items
          .map((item, iIdx) => {
            const isChecked = !!checkedItems[`${gIdx}-${iIdx}`];
            return `- [${isChecked ? 'x' : ' '}] ${item}`;
          })
          .join('\n');
        return `## ${g.title} (Guida CNI pag. ${g.page})\n${items}`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <span>Appendice C</span>
            <span>·</span>
            <span>Guida CNI pag. 48–49</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-teal-400" />
            <span>Checklist Operative di Controllo Deontologico</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Protocolli di verifica obbligatoria stabiliti dal CNI prima di avviare l&rsquo;elaborazione con IA e prima della firma e consegna degli elaborati progettuali.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportMarkdown}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiato Markdown!' : 'Esporta Markdown'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Stampa</span>
          </button>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="p-5 rounded-2xl bg-[#0f274a] border border-sky-500/25 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-white text-base">Avanzamento Verifiche Deontologiche</h3>
          </div>
          <p className="text-xs text-slate-300">
            Completati <strong className="text-teal-400">{completedCount}</strong> su <strong className="text-white">{totalItems}</strong> punti di controllo stabiliti dal CNI
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48 sm:w-60 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono font-bold text-teal-300 text-sm">
            {progressPercent}%
          </span>
          <button
            onClick={resetAll}
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Azzera tutte le spunte"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Checklists */}
      <div className="space-y-6">
        {checkGroups.map((group, gIdx) => {
          const groupCompleted = group.items.filter((_, i) => checkedItems[`${gIdx}-${i}`]).length;
          const isAllChecked = groupCompleted === group.items.length;

          return (
            <div
              key={gIdx}
              className="p-6 rounded-2xl bg-[#0f274a] border border-sky-500/20 space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-500/15 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-500/30">
                    {gIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {group.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      Guida CNI pag. {group.page}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400">
                  <span className={isAllChecked ? 'text-teal-400 font-bold' : ''}>
                    {groupCompleted} / {group.items.length} completati
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {group.items.map((item, iIdx) => {
                  const isChecked = !!checkedItems[`${gIdx}-${iIdx}`];
                  return (
                    <label
                      key={iIdx}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-teal-950/30 border-teal-500/40 text-slate-100'
                          : 'bg-[#0b1f3a] border-sky-500/15 text-slate-300 hover:bg-sky-950/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(gIdx, iIdx)}
                        className="mt-0.5 w-4 h-4 rounded text-teal-500 focus:ring-teal-400 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                      <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
