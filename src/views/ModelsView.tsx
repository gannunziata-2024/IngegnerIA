import React, { useState } from 'react';
import { ContractModel } from '../types';
import { FileText, Copy, Check, Download, Bookmark, Sliders, CheckCircle2 } from 'lucide-react';

interface ModelsViewProps {
  models: ContractModel[];
  isSaved: (key: string) => boolean;
  onToggleSave: (key: string) => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  models,
  isSaved,
  onToggleSave
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>(models[0]?.id || 'supporto');
  const [copied, setCopied] = useState(false);

  // Live personalization variables
  const [engineerName, setEngineerName] = useState('Ing. [Nome e Cognome]');
  const [orderNumber, setOrderNumber] = useState('Ordine degli Ingegneri di [Provincia] n. [Numero]');
  const [clientName, setClientName] = useState('Sig./Società [Nome Committente]');
  const [assignmentScope, setAssignmentScope] = useState('[Oggetto dell’incarico professionale]');

  const current = models.find((m) => m.id === selectedModelId) || models[0];

  // Dynamic template substitution
  const personalizedText = current.text
    .replace(/\[Nome e Cognome\]/g, engineerName)
    .replace(/\[Ingegnere\/Studio\]/g, engineerName)
    .replace(/\[Committente\]/g, clientName)
    .replace(/\[incarico\]/g, assignmentScope);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([personalizedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CNI_Modello_${current.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <span>Appendice A &amp; F</span>
            <span>·</span>
            <span>Clausole &amp; Disciplinari CNI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-indigo-400" />
            <span>Modelli Contrattuali per l&rsquo;Ingegnere</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Clausole ufficiali predisposte dal CNI da inserire nelle lettere d&rsquo;incarico professionale per regolare l&rsquo;utilizzo dell&rsquo;IA, tutelare la responsabilità e rispettare l&rsquo;art. 13 del Codice Deontologico.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiato!' : 'Copia clausola'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Scarica .txt</span>
          </button>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {models.map((m) => {
          const active = m.id === current.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModelId(m.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                active
                  ? 'bg-[#13305a] border-sky-400 text-white shadow-lg'
                  : 'bg-[#0f274a] border-sky-500/20 text-slate-300 hover:bg-[#112d53] hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono text-sky-400 uppercase font-bold">
                Guida CNI pag. {m.page}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {m.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Customizer & Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Customizer Fields */}
        <div className="lg:col-span-4 bg-[#0f274a] border border-sky-500/25 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider border-b border-sky-500/15 pb-2">
            <Sliders className="w-4 h-4" />
            <span>Personalizzazione Immediata</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Nome Professionista / Studio:</label>
              <input
                type="text"
                value={engineerName}
                onChange={(e) => setEngineerName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#0b1f3a] border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Ordine e Matricola:</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#0b1f3a] border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Nome Committente / Ente:</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#0b1f3a] border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Oggetto dell’Incarico:</label>
              <input
                type="text"
                value={assignmentScope}
                onChange={(e) => setAssignmentScope(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#0b1f3a] border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/15 text-[11px] text-sky-200">
            I campi inseriti sostituiscono automaticamente i segnaposto nel testo a fianco.
          </div>
        </div>

        {/* Right: Document Preview */}
        <div className="lg:col-span-8 bg-[#0f274a] border border-sky-500/25 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-sky-500/15 pb-3">
            <div>
              <span className="text-xs font-bold text-sky-400">Modello Ufficiale</span>
              <h3 className="text-lg font-bold text-white">{current.title}</h3>
            </div>
            <button
              onClick={() => onToggleSave(`model-${current.id}`)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved(`model-${current.id}`)
                  ? 'text-red-400 bg-red-950/40'
                  : 'text-slate-400 bg-slate-800 hover:text-white'
              }`}
              title="Salva modello"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          <div className="p-5 rounded-xl bg-[#0b1f3a] border border-sky-500/20 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap max-h-[460px] overflow-y-auto">
            {personalizedText}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <span>Riferimento normativo: Art. 13 Codice Deontologico &amp; AI Act</span>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copia testo compilato</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
