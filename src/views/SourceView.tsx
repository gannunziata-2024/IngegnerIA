import React from 'react';
import { 
  Info, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Users, 
  Award, 
  BookOpen, 
  Cpu, 
  Building2, 
  PenTool
} from 'lucide-react';
import { BrandLogo, IngegneriaWordmark } from '../components/BrandLogo';

const SOURCE_URL = 'https://www.cni.it/images/News/2026/CNI_-_Guida_pratica_AI_per_ingegnere_Aggiornamento15ott_1.pdf';

export const SourceView: React.FC = () => {
  const authors = [
    {
      name: 'Ing. Carla Cappiello',
      role: 'Vicepresidente Vicario del CNI',
      institution: 'Consiglio Nazionale degli Ingegneri',
      badge: 'Autore',
      icon: Award
    },
    {
      name: 'Ing. Gennaro Annunziata',
      role: 'Coordinatore C3i',
      institution: 'Comitato Italiano Ingegneria dell’Informazione',
      badge: 'Autore',
      icon: Cpu
    },
    {
      name: 'Ing. Valerio Lombardi',
      role: 'Ufficio Transazione Digitale (UTD) del CNI',
      institution: 'Ufficio Transazione Digitale · CNI',
      badge: 'Autore',
      icon: PenTool
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>Riferimenti Istituzionali &amp; Colophon</span>
            <span>·</span>
            <span>C3i / CNI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Info className="w-7 h-7 text-sky-400" />
            <span>Crediti e Autori</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            La presente applicazione è basata sulla <em>Guida pratica sull&rsquo;Intelligenza Artificiale per l&rsquo;Ingegnere</em>, curata dal <strong>C3i</strong> ed edita dal <strong>CNI</strong>.
          </p>
        </div>

        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Apri PDF Guida (57 pag.)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Presentation Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-6">
          <BrandLogo size="lg" animated={false} />
        </div>

        {/* SECTION 1: EDITORIAL & CURATION BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#102a4e] to-[#0b1f3a] border border-sky-500/30 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>A Cura di</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              C3i · Comitato Italiano Ingegneria dell&rsquo;Informazione
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Organo specialistico nazionale del CNI preposto alla promozione, allo sviluppo e alla diffusione della cultura dell&rsquo;ingegneria dell&rsquo;informazione e dell&rsquo;innovazione tecnologica.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#102a4e] to-[#0b1f3a] border border-sky-500/30 space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Edita da</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              CNI · Consiglio Nazionale degli Ingegneri
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ente pubblico non economico istituito per la rappresentanza istituzionale della professione di Ingegnere in Italia, custode del Codice Deontologico.
            </p>
          </div>
        </div>

        {/* SECTION 2: AUTHORS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sky-400">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Autori della Guida
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {authors.map((author, idx) => {
              const Icon = author.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 hover:border-sky-400/40 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {author.badge}
                      </span>
                      <Icon className="w-4 h-4 text-sky-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{author.name}</h4>
                    <p className="text-xs text-sky-300 font-medium leading-snug">{author.role}</p>
                  </div>
                  <div className="pt-2 border-t border-sky-500/10 text-[11px] text-slate-400">
                    {author.institution}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: LEGAL REVISION & CONTRIBUTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Scale className="w-4 h-4" />
              <span>Revisione Normativa</span>
            </div>
            <h4 className="text-sm font-bold text-white">Avv. Federico Lucarelli</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consulenza e revisione degli aspetti giuridici, conformità con il Regolamento (UE) 2024/1689 (AI Act) e quadro normativo nazionale (L. 132/2025).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-4 h-4" />
              <span>Con il Contributo di</span>
            </div>
            <h4 className="text-sm font-bold text-white">Ing. Sandro Catta</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consigliere del Consiglio Nazionale degli Ingegneri (CNI).
            </p>
          </div>
        </div>

        {/* SECTION 4: INSTITUTIONAL SOURCES AND DISCLAIMER */}
        <div className="space-y-4 pt-4 border-t border-sky-500/15">
          <h3 className="font-bold text-white text-base">
            Quadro Normativo e Deontologico di Riferimento
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
              <div className="text-sky-400 font-bold">Codice Deontologico degli Ingegneri</div>
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
            <strong>Disclaimer informativo:</strong> I contenuti presenti in questa applicazione riproducono ed elaborano a fini consultivi le linee guida emanate dal C3i e dal CNI. L&rsquo;applicazione non sostituisce l&rsquo;analisi puntuale delle normative vigenti né il parere legale e la valutazione tecnica dell&rsquo;Ingegnere incaricato per il singolo caso specifico.
          </div>
        </div>
      </div>
    </div>
  );
};
