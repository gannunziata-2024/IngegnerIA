import React from 'react';
import { Info, ExternalLink, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

const SOURCE_URL = 'https://www.cni.it/images/News/2026/CNI_-_Guida_pratica_AI_per_ingegnere_Aggiornamento15ott_1.pdf';

export const SourceView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>Riferimenti Istituzionali</span>
            <span>·</span>
            <span>Quadro Giuridico</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Info className="w-7 h-7 text-sky-400" />
            <span>Note, Fonti e Quadro Normativo</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            IngegnerIA è basata sul documento ufficiale pubblicato dal Consiglio Nazionale degli Ingegneri (CNI).
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-6 shadow-xl">
        <div className="flex items-center gap-4 border-b border-sky-500/15 pb-6">
          <BrandLogo size="lg" animated={false} />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <p>
            La presente applicazione web è stata concepita per supportare i professionisti ingegneri nell&rsquo;adozione consapevole, responsabile e deontologicamente conforme degli strumenti di intelligenza artificiale.
          </p>

          <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 space-y-3">
            <h4 className="font-bold text-sky-300 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Documento Istituzionale di Riferimento
            </h4>
            <div className="text-xs text-slate-300 space-y-1">
              <div><strong>Titolo:</strong> Guida pratica sull&rsquo;Intelligenza Artificiale per l&rsquo;Ingegnere</div>
              <div><strong>Editore:</strong> Consiglio Nazionale degli Ingegneri (CNI)</div>
              <div><strong>Versione:</strong> Aggiornamento 15 Ottobre</div>
              <div><strong>Pagine:</strong> 57 pagine ufficiali con allegati da A a F</div>
            </div>
            <div className="pt-2">
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Consulta il PDF ufficiale sul portale CNI</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <h3 className="font-bold text-white text-base pt-2">
            Fonti Normative e Deontologiche
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/15 space-y-1">
              <div className="text-sky-400 font-bold">Regolamento (UE) 2024/1689 (AI Act)</div>
              <p className="text-slate-300">
                Come modificato dal Reg. (UE) 2026/1744. Stabilisce requisiti uniformi di mercato, divieti per pratiche a rischio inaccettabile e regimi di conformità per sistemi ad alto rischio.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/15 space-y-1">
              <div className="text-sky-400 font-bold">Legge 132/2025 (Italia)</div>
              <p className="text-slate-300">
                Disposizioni e deleghe in materia di intelligenza artificiale, tutela delle professioni intellettuali protette, vigilanza AgID/ACN e sanzioni penali (art. 26).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/15 space-y-1">
              <div className="text-sky-400 font-bold">Codice Deontologico Ingegneri</div>
              <p className="text-slate-300">
                Articoli 13.1–13.7: riserva di competenza e giudizio intellettuale umano, divieto di delega cieca alle macchine, informativa al committente e formazione continua obbligatoria.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/15 space-y-1">
              <div className="text-sky-400 font-bold">GDPR &amp; D.Lgs. 196/2003 s.m.i.</div>
              <p className="text-slate-300">
                Principi di minimizzazione dei dati, limitazione della finalità e divieto di alimentazione non autorizzata di LLM con dati personali di terzi.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-xs text-amber-200">
            <strong>Disclaimer informativo:</strong> I contenuti presenti in questa applicazione riproducono ed elaborano a fini consultivi le linee guida emanate dal Consiglio Nazionale degli Ingegneri. L&rsquo;applicazione non sostituisce l&rsquo;analisi puntuale delle normative vigenti né il parere legale e la valutazione tecnica dell&rsquo;Ingegnere incaricato per il singolo caso specifico.
          </div>
        </div>
      </div>
    </div>
  );
};
