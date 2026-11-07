import React, { useState, useEffect } from 'react';
import { 
  GitFork, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  ExternalLink, 
  Compass, 
  Layers, 
  Printer, 
  Maximize2, 
  Eye,
  RefreshCw
} from 'lucide-react';

interface DecisionTreeViewProps {
  onNavigate: (route: string, arg?: string) => void;
  targetNodeId?: string;
}

export const DecisionTreeView: React.FC<DecisionTreeViewProps> = ({
  onNavigate,
  targetNodeId
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'wizard' | 'diagram'>('map');
  const [focusedNode, setFocusedNode] = useState<string | null>(targetNodeId || null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [wIsAi, setWIsAi] = useState<boolean | null>(null);
  const [wRole, setWRole] = useState<'DEPLOYER' | 'PROVIDER' | 'ALTRO'>('DEPLOYER');
  const [wProhibited, setWProhibited] = useState<boolean | null>(null);
  const [wRegulatedProduct, setWRegulatedProduct] = useState<boolean | null>(null);
  const [wAnnex3, setWAnnex3] = useState<boolean | null>(null);
  const [wIsGpai, setWIsGpai] = useState<boolean | null>(null);

  useEffect(() => {
    if (targetNodeId) {
      setFocusedNode(targetNodeId);
      const el = document.getElementById(`tree-${targetNodeId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetNodeId]);

  const handleJump = (nodeId: string) => {
    setFocusedNode(nodeId);
    const el = document.getElementById(`tree-${nodeId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const resetWizard = () => {
    setWizardStep(1);
    setWIsAi(null);
    setWRole('DEPLOYER');
    setWProhibited(null);
    setWRegulatedProduct(null);
    setWAnnex3(null);
    setWIsGpai(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>Appendice D</span>
            <span>·</span>
            <span>Guida pag. 50 (PDF pag. 52)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <GitFork className="w-7 h-7 text-sky-400" />
            <span>Albero Decisionale di Qualificazione AI Act</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Schema ufficiale CNI per qualificare il sistema di IA ai sensi del Reg. (UE) 2024/1689 (AI Act) come modificato dal Reg. (UE) 2026/1744, della Legge 132/2025 e del Codice Deontologico (artt. 13.1–13.7).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/albero-ai-act.png"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Grafico originale</span>
          </a>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Stampa</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#0f274a] p-1.5 rounded-xl border border-sky-500/20 max-w-md">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'map'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mappa Nodi CNI</span>
        </button>
        <button
          onClick={() => setActiveTab('wizard')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'wizard'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Wizard Guidato</span>
        </button>
        <button
          onClick={() => setActiveTab('diagram')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'diagram'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Schema Grafico</span>
        </button>
      </div>

      {/* MODE 1: INTERACTIVE MAP OF ALL CNI NODES */}
      {activeTab === 'map' && (
        <div className="space-y-10">
          {/* Phase Quick Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'preliminare', num: '01', title: 'Qualificazione preliminare' },
              { id: 'classificazione', num: '02', title: 'Classificazione High-Risk' },
              { id: 'complementari', num: '03', title: 'Verifiche complementari' },
              { id: 'output', num: '04', title: 'Output & Accountability' },
            ].map((p) => (
              <a
                key={p.id}
                href={`#tree-${p.id}`}
                className="p-3 rounded-xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400 text-left transition-all group"
              >
                <div className="text-[10px] font-mono font-bold text-sky-400 group-hover:text-sky-300">
                  FASE {p.num}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-sky-300 truncate mt-0.5">
                  {p.title}
                </div>
              </a>
            ))}
          </div>

          {/* FASE 01 */}
          <section id="tree-preliminare" className="space-y-4">
            <div className="flex items-center gap-3 border-b border-sky-500/20 pb-3">
              <span className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-black text-sm">
                01
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Qualificazione preliminare</h2>
                <p className="text-xs text-slate-300">Ambito di applicazione, ruolo e pratiche vietate.</p>
              </div>
            </div>

            {/* Nodo 1 */}
            <div 
              id="tree-q1" 
              className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                focusedNode === 'q1' ? 'border-sky-400 ring-2 ring-sky-400/40' : 'border-sky-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                  Nodo 1 · Art. 3 Reg. UE 2024/1689
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                È un &ldquo;sistema di IA&rdquo; ai sensi dell&rsquo;art. 3?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Il sistema, con diversi livelli di autonomia, è progettato per generare output (contenuti, previsioni, raccomandazioni o decisioni) che influenzano l’ambiente per raggiungere specifici obiettivi?
              </p>
              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-sky-200 mb-4">
                <strong>Verifica preliminare:</strong> ambito di applicazione dell’AI Act (art. 2), incluse eventuali esclusioni per attività personali, difesa nazionale, o regimi specifici per ricerca scientifica (R&amp;D pre-market) e open source puro.
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-sky-500/10">
                <button
                  onClick={() => handleJump('fuori')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>NO · Fuori dall'AI Act come sistema di IA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleJump('ruolo')}
                  className="px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>SÌ · Individua il ruolo professionale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Fork: Fuori & Ruolo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                id="tree-fuori" 
                className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                  focusedNode === 'fuori' ? 'border-emerald-400 ring-2 ring-emerald-400/40' : 'border-emerald-500/25'
                }`}
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  ESITO: NO
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-1.5">
                  Fuori dall'AI Act come sistema di IA*
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  Restano pienamente applicabili tutte le altre normative: GDPR, normativa di prodotto (direttiva macchine, CPR), cybersecurity, contratti e doveri deontologici professionali (artt. 13.1–13.7).
                </p>
                <div className="text-[11px] text-slate-400">
                  * Salvo future estensioni o modifiche normative.
                </div>
              </div>

              <div 
                id="tree-ruolo" 
                className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                  focusedNode === 'ruolo' ? 'border-sky-400 ring-2 ring-sky-400/40' : 'border-sky-500/20'
                }`}
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                  Nodo 2 · Ruolo Professionale
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  Quale ruolo hai nel ciclo di vita del sistema?
                </h3>
                <p className="text-xs text-slate-300 mb-3">
                  Individua e annota il tuo ruolo. Può cambiare in funzione delle attività svolte. Verifica anche se assumi gli obblighi del provider ai sensi dell’art. 25 AI Act (es. modifiche sostanziali).
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-[#0b1f3a] border border-sky-500/15 flex justify-between">
                    <strong className="text-sky-300">DEPLOYER</strong>
                    <span className="text-slate-300">Utilizzo sotto propria autorità professionale</span>
                  </div>
                  <div className="p-2 rounded bg-[#0b1f3a] border border-sky-500/15 flex justify-between">
                    <strong className="text-amber-300">PROVIDER</strong>
                    <span className="text-slate-300">Sviluppo o immissione sul mercato a proprio nome</span>
                  </div>
                  <div className="p-2 rounded bg-[#0b1f3a] border border-sky-500/15 flex justify-between">
                    <strong className="text-slate-300">PRODUTTORE</strong>
                    <span className="text-slate-400">Incorpora l'IA nel prodotto</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-sky-500/10 flex justify-end">
                  <button
                    onClick={() => handleJump('vietata')}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Prosegui al Nodo 3 · Pratiche vietate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Nodo 3 & Stop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                id="tree-vietata" 
                className={`md:col-span-2 p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                  focusedNode === 'vietata' ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-amber-500/25'
                }`}
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  Nodo 3 · Art. 5 AI Act
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  Pratica di IA vietata?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Verifica che il sistema non rientri tra le pratiche a rischio inaccettabile vietate dall’art. 5 (manipolazione subliminale ingannevole, sfruttamento di vulnerabilità, social scoring, categorizzazione biometrica per dedurre opinioni politiche o convinzioni religiose).
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleJump('stop')}
                    className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white text-xs font-semibold transition-colors"
                  >
                    SÌ · Stop (Uso vietato)
                  </button>
                  <button
                    onClick={() => handleJump('classificazione')}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>NO · Passa alla Fase 02 Classificazione</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div 
                id="tree-stop" 
                className={`p-5 rounded-2xl bg-red-950/40 border transition-all ${
                  focusedNode === 'stop' ? 'border-red-400 ring-2 ring-red-400/40' : 'border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">STOP AI ACT</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Uso / immissione non consentiti</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  L'utilizzo e la messa in servizio sono severamente vietati in tutta l'Unione Europea, salve le tassative eccezioni previste per finalità giudiziarie/forze di polizia.
                </p>
              </div>
            </div>
          </section>

          {/* FASE 02 */}
          <section id="tree-classificazione" className="space-y-4 pt-6 border-t border-sky-500/20">
            <div className="flex items-center gap-3 border-b border-sky-500/20 pb-3">
              <span className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-black text-sm">
                02
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Classificazione del sistema (High-Risk)</h2>
                <p className="text-xs text-slate-300">Punto 4 · È ad alto rischio ai sensi dell&rsquo;art. 6? Percorsi paralleli A e B.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Percorso A */}
              <div className="space-y-4 p-5 rounded-2xl bg-[#0f274a] border border-sky-500/25">
                <div className="flex items-center gap-2 text-sky-400">
                  <Layers className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Percorso A · Art. 6(1)
                  </h3>
                </div>
                <p className="text-xs text-slate-300">IA in prodotti o componenti di sicurezza regolamentati (All. I)</p>

                <div 
                  id="tree-a1"
                  className={`p-4 rounded-xl bg-[#0b1f3a] border transition-all ${
                    focusedNode === 'a1' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/15'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                    A1
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 mb-1">
                    L’IA è un prodotto o componente di sicurezza coperto dall’Allegato I?
                  </h4>
                  <p className="text-xs text-slate-300 mb-3">
                    Macchinari (Reg. Macchine), dispositivi medici, ascensori, apparecchi a pressione, DPI.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJump('a2')}
                      className="px-2.5 py-1 rounded bg-sky-500 text-slate-950 font-bold text-xs"
                    >
                      SÌ · Verifica A2
                    </button>
                    <button
                      onClick={() => handleJump('b1')}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs"
                    >
                      NO · Percorso B
                    </button>
                  </div>
                </div>

                <div 
                  id="tree-a2"
                  className={`p-4 rounded-xl bg-[#0b1f3a] border transition-all ${
                    focusedNode === 'a2' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/15'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                    A2
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 mb-1">
                    È soggetto a valutazione di conformità con organismo terzo?
                  </h4>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleJump('high1')}
                      className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      SÌ · HIGH-RISK Art. 6(1)
                    </button>
                    <button
                      onClick={() => handleJump('b1')}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs"
                    >
                      NO · Percorso B
                    </button>
                  </div>
                </div>

                <div 
                  id="tree-high1"
                  className={`p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 ${
                    focusedNode === 'high1' ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  <span className="text-xs font-bold text-amber-300">ESITO A: HIGH-RISK ex art. 6(1)</span>
                  <p className="text-xs text-slate-300 mt-1 mb-2">
                    Si applicano gli obblighi completi per sistemi ad alto rischio.
                  </p>
                  <button
                    onClick={() => handleJump('complementari')}
                    className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>Vai alle Verifiche Complementari (Fase 03)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Percorso B */}
              <div className="space-y-4 p-5 rounded-2xl bg-[#0f274a] border border-sky-500/25">
                <div className="flex items-center gap-2 text-sky-400">
                  <FileText className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Percorso B · Art. 6(2)
                  </h3>
                </div>
                <p className="text-xs text-slate-300">Casi d’uso specifici dell’Allegato III (Infrastrutture, Lavoro, Sicurezza)</p>

                <div 
                  id="tree-b1"
                  className={`p-4 rounded-xl bg-[#0b1f3a] border transition-all ${
                    focusedNode === 'b1' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/15'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                    B1
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 mb-1">
                    La destinazione d’uso rientra in uno dei casi dell’Allegato III?
                  </h4>
                  <p className="text-xs text-slate-300 mb-3">
                    Es. componenti di sicurezza nella gestione e funzionamento del traffico stradale, fornitura di acqua, gas, riscaldamento ed elettricità (infrastrutture critiche).
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJump('b2')}
                      className="px-2.5 py-1 rounded bg-sky-500 text-slate-950 font-bold text-xs"
                    >
                      SÌ · Verifica deroga art. 6(3)
                    </button>
                    <button
                      onClick={() => handleJump('nonhigh')}
                      className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs"
                    >
                      NO · NON HIGH-RISK
                    </button>
                  </div>
                </div>

                <div 
                  id="tree-b2"
                  className={`p-4 rounded-xl bg-[#0b1f3a] border transition-all ${
                    focusedNode === 'b2' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/15'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                    B2
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 mb-1">
                    Ricorrono le condizioni dell’art. 6(3) per non considerarlo high-risk?
                  </h4>
                  <p className="text-xs text-slate-300 mb-2">
                    Attività puramente preparatorie, miglioramento di attività precedenti, ecc. Se effettua profiling è sempre HIGH-RISK.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJump('high2')}
                      className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      NO · HIGH-RISK Art. 6(2)
                    </button>
                    <button
                      onClick={() => handleJump('nonhigh')}
                      className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs"
                    >
                      SÌ · NON HIGH-RISK
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div 
                    id="tree-high2"
                    className={`p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 ${
                      focusedNode === 'high2' ? 'ring-2 ring-amber-400' : ''
                    }`}
                  >
                    <span className="text-xs font-bold text-amber-300">HIGH-RISK (Art. 6.2)</span>
                    <button
                      onClick={() => handleJump('complementari')}
                      className="text-[11px] font-semibold text-sky-300 block mt-2 hover:underline"
                    >
                      Prosegui FASE 03 →
                    </button>
                  </div>

                  <div 
                    id="tree-nonhigh"
                    className={`p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 ${
                      focusedNode === 'nonhigh' ? 'ring-2 ring-emerald-400' : ''
                    }`}
                  >
                    <span className="text-xs font-bold text-emerald-300">NON HIGH-RISK</span>
                    <button
                      onClick={() => handleJump('complementari')}
                      className="text-[11px] font-semibold text-sky-300 block mt-2 hover:underline"
                    >
                      Prosegui FASE 03 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FASE 03 */}
          <section id="tree-complementari" className="space-y-4 pt-6 border-t border-sky-500/20">
            <div className="flex items-center gap-3 border-b border-sky-500/20 pb-3">
              <span className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-black text-sm">
                03
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Verifiche complementari</h2>
                <p className="text-xs text-slate-300">
                  Da effettuare sempre, indipendentemente dall&rsquo;esito della classificazione del sistema (Fase 02).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Trasparenza art. 50 */}
              <div 
                id="tree-trasparenza"
                className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                  focusedNode === 'trasparenza' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/20'
                }`}
              >
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                  Nodo 5 · Trasparenza Art. 50
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  Si applicano obblighi di trasparenza?
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 mb-4 list-disc pl-4">
                  <li><strong>Interazione con persone:</strong> informare che si sta interagendo con un&rsquo;IA.</li>
                  <li><strong>Contenuti sintetici:</strong> marcatura machine-readable per testo, immagini e audio.</li>
                  <li><strong>Deepfake:</strong> esplicita dichiarazione di generazione sintetica.</li>
                  <li><strong>Testo informativo di interesse pubblico:</strong> disclosure obbligatoria.</li>
                </ul>
              </div>

              {/* GPAI Capo V */}
              <div 
                id="tree-gpai"
                className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                  focusedNode === 'gpai' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/20'
                }`}
              >
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                  Nodo 6 · GPAI &amp; LLM (Capo V)
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  È coinvolto un modello GPAI (General Purpose AI)?
                </h3>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Utilizzi LLM commerciali (es. GPT-4, Claude, Gemini, LLaMA)? Se sei solo Deployer, non ricadono su di te gli obblighi del Capo V propri del Provider del modello. Se addestri o modifichi sostanzialmente il modello GPAI, verificalo con cura.
                </p>
                <div className="p-3 rounded-xl bg-sky-950/40 text-xs text-sky-200">
                  Ingegnere Deployer: esente dagli obblighi del fornitore GPAI ma vincolato all&rsquo;uso diligente e deontologico.
                </div>
              </div>
            </div>

            {/* Nodo 7 Altre Norme */}
            <div 
              id="tree-altre"
              className={`p-5 rounded-2xl bg-[#0f274a] border transition-all ${
                focusedNode === 'altre' ? 'border-sky-400 ring-2 ring-sky-400/30' : 'border-sky-500/20'
              }`}
            >
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                Nodo 7 · Quadro Regolatorio Aggiuntivo
              </span>
              <h3 className="text-base font-bold text-white mt-2 mb-2">
                Altre normative applicabili &amp; Doveri Deontologici
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-[#0b1f3a] border border-sky-500/15">
                  <strong className="text-white block mb-1">GDPR &amp; Privacy</strong>
                  Divieto di inserire dati personali di committenti senza idonea base giuridica e accordo responsabile.
                </div>
                <div className="p-3 rounded-lg bg-[#0b1f3a] border border-sky-500/15">
                  <strong className="text-white block mb-1">Codice Deontologico</strong>
                  Artt. 13.1–13.7: riserva intellettuale, trasparenza e responsabilità personale esclusiva.
                </div>
                <div className="p-3 rounded-lg bg-[#0b1f3a] border border-sky-500/15">
                  <strong className="text-white block mb-1">Cybersecurity &amp; IP</strong>
                  Direttiva NIS2, Cyber Resilience Act, rispetto del copyright e del segreto industriale.
                </div>
              </div>
            </div>
          </section>

          {/* FASE 04 OUTPUT */}
          <section id="tree-output" className="space-y-4 pt-6 border-t border-sky-500/20">
            <div className="flex items-center gap-3 border-b border-sky-500/20 pb-3">
              <span className="w-9 h-9 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black text-sm">
                04
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Output &amp; Accountability</h2>
                <p className="text-xs text-slate-300">Esito finale del percorso di qualificazione.</p>
              </div>
            </div>

            <div 
              id="tree-documenta"
              className="p-6 rounded-2xl bg-gradient-to-br from-[#102a4e] to-[#0f274a] border border-sky-400/40 space-y-4 shadow-xl"
            >
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-400 text-slate-950">
                Nodo 8 · Determinazione Obblighi e Documentazione
              </span>
              <h3 className="text-lg font-bold text-white">
                Conserva le evidenze e redigi il fascicolo di qualificazione (Accountability)
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Sulla base del percorso effettuato, l&rsquo;Ingegnere formalizza la propria analisi documentando la qualificazione del sistema, il ruolo rivestito, le misure di mitigazione del rischio adottate e le verifiche umane svolte.
              </p>
              <div className="p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/25 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-sky-300">Elementi minimi da conservare nel fascicolo di commessa:</div>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Esito della classificazione: High-Risk / Non High-Risk.</li>
                  <li>Evidenza del controllo umano effettivo (human-in-the-loop) e firma degli elaborati.</li>
                  <li>Trasparenza al committente con apposita clausola contrattuale (v. Modelli contrattuali CNI).</li>
                  <li>Log degli input/output significativi o archivio dei prompt tecnici impiegati.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('modelli')}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Vedi i Modelli contrattuali CNI</span>
                </button>
                <button
                  onClick={() => onNavigate('checklist')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Compila la Checklist Operativa</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* MODE 2: GUIDED WIZARD */}
      {activeTab === 'wizard' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-sky-500/15 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                Assistente Guidato Passo-Passo
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Valutazione di Conformità AI Act
              </h2>
            </div>
            <button
              onClick={resetWizard}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ricomincia</span>
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  wizardStep >= s ? 'bg-sky-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Is it AI? */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-sky-400">Fase 1 di 5 · Definizione Sistema</span>
              <h3 className="text-lg font-bold text-white">
                1. Il software o algoritmo rientra nella definizione di &ldquo;sistema di IA&rdquo; (art. 3)?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                È un sistema automatizzato progettato per funzionare con vari livelli di autonomia e che può mostrare adattabilità dopo l’implementazione, e che, per obiettivi espliciti o impliciti, deduce dall&rsquo;input ricevuto come generare output quali previsioni, contenuti, raccomandazioni o decisioni che possono influenzare ambienti fisici o virtuali.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setWIsAi(true);
                    setWizardStep(2);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                >
                  SÌ · È un sistema di IA
                </button>
                <button
                  onClick={() => {
                    setWIsAi(false);
                    setWizardStep(5);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
                >
                  NO · Semplice software deterministico / foglio calcolo
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Role */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-sky-400">Fase 2 di 5 · Ruolo Professionale</span>
              <h3 className="text-lg font-bold text-white">
                2. Quale ruolo rivesti in relazione al sistema di IA?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setWRole('DEPLOYER');
                    setWizardStep(3);
                  }}
                  className="p-4 rounded-xl bg-[#0b1f3a] hover:bg-[#13305a] border border-sky-500/20 text-left transition-all"
                >
                  <strong className="block text-white text-sm">DEPLOYER (Utilizzatore Professionale)</strong>
                  <span className="text-xs text-slate-300 mt-1 block">
                    Utilizzi un software o modello sviluppato da terzi per svolgere perizie, calcoli, computi o progetti per conto del committente.
                  </span>
                </button>
                <button
                  onClick={() => {
                    setWRole('PROVIDER');
                    setWizardStep(3);
                  }}
                  className="p-4 rounded-xl bg-[#0b1f3a] hover:bg-[#13305a] border border-sky-500/20 text-left transition-all"
                >
                  <strong className="block text-white text-sm">PROVIDER (Fornitore / Sviluppatore)</strong>
                  <span className="text-xs text-slate-300 mt-1 block">
                    Sviluppi o fai sviluppare un sistema di IA e lo immetti sul mercato o lo metti in servizio con il tuo marchio o nome professionale.
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Prohibited? */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-sky-400">Fase 3 di 5 · Pratiche Vietate</span>
              <h3 className="text-lg font-bold text-white">
                3. Il sistema ricade nelle pratiche vietate dall&rsquo;art. 5?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Manipolazione comportamentale subliminale, social scoring o identificazione biometrica remota non conforme.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setWProhibited(false);
                    setWizardStep(4);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm"
                >
                  NO · Non è una pratica vietata
                </button>
                <button
                  onClick={() => {
                    setWProhibited(true);
                    setWizardStep(5);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-semibold text-xs sm:text-sm"
                >
                  SÌ · Rientra nell'art. 5
                </button>
              </div>
            </div>
          )}

          {/* Step 4: High-Risk check */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-sky-400">Fase 4 di 5 · Classificazione del Rischio</span>
              <h3 className="text-lg font-bold text-white">
                4. È applicato a infrastrutture critiche, componenti di sicurezza o casi dell&rsquo;Allegato III?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Include: gestione di ponti, dighe, reti elettriche o idriche, dispositivi medici, DPI, oppure selezione di personale e valutazione dell’affidabilità creditizia.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setWAnnex3(true);
                    setWizardStep(5);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm"
                >
                  SÌ · Rientra in Allegato I o III (Alto Rischio)
                </button>
                <button
                  onClick={() => {
                    setWAnnex3(false);
                    setWizardStep(5);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm"
                >
                  NO · Strumento ordinario di studio / ufficio (Rischio Minimo)
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Report outcome */}
          {wizardStep === 5 && (
            <div className="p-6 rounded-2xl bg-[#0b1f3a] border border-sky-500/30 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 border-b border-sky-500/15 pb-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <h4 className="text-base font-bold text-white">Report di Qualificazione Generato</h4>
              </div>

              {wIsAi === false ? (
                <div className="space-y-2">
                  <div className="text-emerald-400 font-bold text-sm">ESITO: FUORI DALL'AI ACT COME SISTEMA DI IA</div>
                  <p className="text-xs text-slate-300">
                    Il software non presenta l'autonomia definita dall'art. 3. Si applicano le norme ordinarie di ingegneria, contratti e il Codice Deontologico.
                  </p>
                </div>
              ) : wProhibited ? (
                <div className="space-y-2">
                  <div className="text-red-400 font-bold text-sm">ESITO: PRATICA VIETATA (ART. 5)</div>
                  <p className="text-xs text-slate-300">
                    L'attività o il sistema sono vietati su tutto il territorio dell'Unione Europea. Non procedere.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs text-slate-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#0f274a] border border-sky-500/20">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Ruolo accertato</span>
                      <strong className="block text-white text-sm mt-0.5">{wRole}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f274a] border border-sky-500/20">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Livello di Rischio</span>
                      <strong className={`block text-sm mt-0.5 ${wAnnex3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {wAnnex3 ? 'HIGH-RISK (Art. 6)' : 'NON HIGH-RISK / RISCHIO MINIMO'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/20 space-y-2">
                    <strong className="text-sky-300 block">Obblighi Primari per l&rsquo;Ingegnere:</strong>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Human-in-the-loop:</strong> Controllo e validazione obbligatoria prima di qualsiasi firma o consegna.</li>
                      <li><strong>Art. 13 Codice Deontologico:</strong> Trasparenza col committente se l'IA incide sostanzialmente sul lavoro.</li>
                      <li><strong>GDPR:</strong> Verificare l'accordo sul trattamento dei dati (DPA) con il fornitore dell'IA.</li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onNavigate('checklist')}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                    >
                      Completa la Checklist Operativa
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: HIGH-RES DIAGRAM VIEWER */}
      {activeTab === 'diagram' && (
        <div className="p-6 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Grafico Originale di Pagina 50</h3>
              <p className="text-xs text-slate-300">Riproduzione ad alta risoluzione del diagramma CNI</p>
            </div>
            <a
              href="/albero-ai-act.png"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Apri a schermo intero</span>
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-sky-500/20 bg-white p-2">
            <img
              src="/albero-ai-act.png"
              alt="Albero decisionale di qualificazione AI Act, pagina 50 Guida CNI"
              className="w-full h-auto object-contain max-h-[750px] mx-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};
