import React, { useState } from 'react';
import { Chapter } from '../types';
import { BookOpen, ExternalLink, FileText, ArrowRight, Download, Search, ShieldCheck } from 'lucide-react';

interface GuideViewProps {
  chapters: Chapter[];
  onNavigate: (route: string, arg?: string) => void;
}

const SOURCE_URL = 'https://www.cni.it/images/News/2026/CNI_-_Guida_pratica_AI_per_ingegnere_Aggiornamento15ott_1.pdf';

export const GuideView: React.FC<GuideViewProps> = ({ chapters, onNavigate }) => {
  const [targetPage, setTargetPage] = useState<string>('');

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(targetPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 60) {
      window.open(`${SOURCE_URL}#page=${pageNum}`, '_blank');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-sky-400" />
            <span>Guida Pratica all'IA per l&rsquo;Ingegnere</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Indice navigabile dei 9 capitoli della Guida curata dal C3i ed edita dal CNI (aggiornamento 15 ottobre 2026), con collegamenti diretti a ciascuna pagina del testo originale.
          </p>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="p-5 rounded-2xl bg-[#0f274a] border border-sky-500/25 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-sm">Salta direttamente a una pagina del PDF</h3>
          <p className="text-xs text-slate-300">Inserisci il numero di pagina compreso tra 1 e 57</p>
        </div>

        <form onSubmit={handlePageJump} className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={60}
            value={targetPage}
            onChange={(e) => setTargetPage(e.target.value)}
            placeholder="Es. 22"
            className="w-24 px-3 py-2 rounded-xl bg-[#0b1f3a] border border-sky-500/30 text-white text-xs font-mono focus:outline-none focus:border-sky-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
          >
            <span>Apri pagina</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((ch, idx) => (
          <div
            key={ch.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between group shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-400/30">
                  {idx + 1}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Pagine {ch.start}–{ch.end}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                {ch.title}
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-sky-500/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {ch.end - ch.start + 1} facciate nel PDF
              </span>
              <a
                href={`${SOURCE_URL}#page=${ch.start}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Apri nel PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
