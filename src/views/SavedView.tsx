import React from 'react';
import { Bookmark, ArrowRight, Trash2, Sparkles, Layers, FileText, Wrench } from 'lucide-react';
import { AppData } from '../types';

interface SavedViewProps {
  data: AppData;
  savedKeys: string[];
  onRemoveSave: (key: string) => void;
  onNavigate: (route: string, arg?: string) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  data,
  savedKeys,
  onRemoveSave,
  onNavigate
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>Area Personale</span>
            <span>·</span>
            <span>Segnalibri</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-sky-400 fill-current" />
            <span>Elementi Salvati ({savedKeys.length})</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Tutti i contenuti contrassegnati con il segnalibro salvati in locale nel tuo browser per una rapida consultazione professionale.
          </p>
        </div>
      </div>

      {savedKeys.length === 0 ? (
        <div className="p-12 text-center bg-[#0f274a] rounded-2xl border border-sky-500/20 text-slate-400 space-y-3">
          <Bookmark className="w-10 h-10 mx-auto text-slate-500" />
          <h3 className="text-base font-bold text-white">Nessun elemento salvato</h3>
          <p className="text-xs max-w-md mx-auto">
            Puoi salvare schede di sintesi, prompt, modelli contrattuali o casi pratici cliccando sull'icona del segnalibro presente in ciascuna scheda.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('sintesi')}
              className="px-4 py-2 bg-sky-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              Esplora le Schede di Sintesi
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedKeys.map((key) => {
            let title = key;
            let subtitle = '';
            let route = 'sintesi';
            let arg: string | undefined = undefined;
            let Icon = Layers;

            if (key.startsWith('summary-')) {
              const id = key.replace('summary-', '');
              const s = data.summaries.find((item) => item.id === id);
              title = s ? s.title : `Scheda di Sintesi #${id}`;
              subtitle = 'Scheda di Sintesi CNI';
              route = 'sintesi';
              arg = id;
              Icon = Layers;
            } else if (key.startsWith('prompt-')) {
              const id = parseInt(key.replace('prompt-', ''), 10);
              const p = data.prompts.find((item) => item.id === id);
              title = p ? p.title : `Prompt Ingegneristico #${id}`;
              subtitle = 'Prompt Ufficiale CNI';
              route = 'prompt';
              arg = String(id);
              Icon = Sparkles;
            } else if (key.startsWith('model-')) {
              const id = key.replace('model-', '');
              const m = data.models.find((item) => item.id === id);
              title = m ? m.title : `Modello Contrattuale #${id}`;
              subtitle = 'Clausola contrattuale CNI';
              route = 'modelli';
              arg = id;
              Icon = FileText;
            } else if (key.startsWith('case-')) {
              title = key.replace('case-', '');
              subtitle = 'Caso Pratico Operativo';
              route = 'pratica';
              Icon = Wrench;
            }

            return (
              <div
                key={key}
                className="p-5 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 flex flex-col justify-between space-y-3 shadow-md group transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {subtitle}
                    </span>
                    <button
                      onClick={() => onRemoveSave(key)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      title="Rimuovi dai salvati"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-sky-500/10 flex justify-end">
                  <button
                    onClick={() => onNavigate(route, arg)}
                    className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Apri scheda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
