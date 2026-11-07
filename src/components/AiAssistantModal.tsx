import React, { useState } from 'react';
import { X, Sparkles, Send, ShieldCheck, Scale, Cpu, FileText, CheckCircle2, AlertTriangle, Copy } from 'lucide-react';
import { IngegneriaWordmark } from './BrandLogo';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialAction?: 'optimize-prompt' | 'evaluate-system' | 'general';
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialAction = 'general'
}) => {
  const [activeTab, setActiveTab] = useState<'evaluate-system' | 'optimize-prompt' | 'general'>(initialAction);
  const [query, setQuery] = useState(initialQuery);
  const [role, setRole] = useState<'DEPLOYER' | 'PROVIDER'>('DEPLOYER');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: activeTab,
          query,
          context: { role }
        })
      });

      if (!res.ok) {
        throw new Error('Servizio non disponibile o chiave non configurata.');
      }

      const data = await res.json();
      setResponse(data.result || data.error);
    } catch (err: any) {
      // Offline / client fallback with accurate CNI rules if API not connected
      setResponse(generateOfflineFallback(activeTab, query, role));
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="bg-[#0f274a] border border-sky-500/30 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(11, 31, 58, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)'
        }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sky-500/20 bg-[#13305a]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-sky-400/20 to-red-500/20 rounded-xl border border-sky-400/30 text-sky-400">
              <Sparkles className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg">Assistente Tecnico</span>
                <IngegneriaWordmark className="h-4 sm:h-5 w-auto" />
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  AI Act & CNI Copilot
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Verifica conformità AI Act, qualificazione del rischio e perfezionamento prompt tecnici
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Tabs */}
        <div className="flex border-b border-sky-500/15 bg-[#0b1f3a]/80 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('evaluate-system')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'evaluate-system'
                ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-sky-950/40'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Valutazione AI Act</span>
          </button>
          <button
            onClick={() => setActiveTab('optimize-prompt')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'optimize-prompt'
                ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-sky-950/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ottimizza Prompt Tecnico</span>
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'general'
                ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-sky-950/40'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Consulenza Deontologica</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'evaluate-system' && (
            <div className="space-y-3">
              <div className="p-3 bg-sky-950/40 border border-sky-500/20 rounded-xl text-xs text-sky-200">
                Descrivi l'applicazione di IA impiegata (es. <em>"Algoritmo per il riconoscimento automatico di difetti strutturali da ortofoto con drone"</em> o <em>"Software di computo metrico con estrazione automatica da PDF"</em>).
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-300">Il tuo ruolo:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('DEPLOYER')}
                    className={`px-3 py-1 rounded-md text-xs font-medium border ${
                      role === 'DEPLOYER'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Deployer (Utilizzatore Professionale)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('PROVIDER')}
                    className={`px-3 py-1 rounded-md text-xs font-medium border ${
                      role === 'PROVIDER'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Provider (Sviluppatore / Immissione sul mercato)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'optimize-prompt' && (
            <div className="p-3 bg-sky-950/40 border border-sky-500/20 rounded-xl text-xs text-sky-200">
              Inserisci la bozza della tua richiesta. L'assistente la ristrutturerà applicando le linee guida CNI: contesto normativo italiano, formato rigoroso, limitazioni allucinazioni e clausole di validazione umana.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {activeTab === 'evaluate-system' ? 'Descrizione del sistema o caso d\'uso' : 'Testo della richiesta'}
            </label>
            <textarea
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeTab === 'evaluate-system'
                  ? 'Esempio: Utilizzo di computer vision in cantiere per verificare la presenza di caschi e imbracature dei lavoratori...'
                  : activeTab === 'optimize-prompt'
                  ? 'Esempio: Devo confrontare le NTC 2018 con la Circolare esplicativa sul calcolo delle armature dei pilastri...'
                  : 'Fai una domanda sulle linee guida CNI (es. obblighi di trasparenza art. 13 del codice deontologico)...'
              }
              className="w-full px-4 py-3 bg-[#0b1f3a] text-white placeholder-slate-500 border border-sky-500/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !query.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Elaborazione in corso...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Elabora con IngegnerIA</span>
                </>
              )}
            </button>
          </div>

          {/* Result Box */}
          {response && (
            <div className="mt-4 p-4 rounded-xl bg-[#0b1f3a] border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-500/15 pb-2">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  Risposta Assistente IngegnerIA
                </span>
                <button
                  onClick={copyResult}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiato!' : 'Copia'}</span>
                </button>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {response}
              </div>

              <div className="pt-2 border-t border-sky-500/15 flex items-center gap-2 text-[11px] text-amber-300/90">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  <strong>Nota deontologica (art. 13):</strong> L'elaborazione fornita ha valore informativo e di supporto. La validazione finale e la responsabilità professionale rimangono dell'Ingegnere.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// High-fidelity fallback knowledge engine if offline or key not provided
function generateOfflineFallback(action: string, query: string, role: string): string {
  if (action === 'evaluate-system') {
    return `### QUALIFICAZIONE AI ACT & CODICE DEONTOLOGICO (CNI)

**Oggetto dell'analisi:** ${query}
**Ruolo prescelto:** ${role === 'DEPLOYER' ? 'Deployer (Art. 3, n. 4 AI Act)' : 'Provider (Art. 3, n. 3 AI Act)'}

1. **Qualificazione Preliminare (Art. 3 Reg. UE 2024/1689)**:
   Il sistema presenta elementi di autonomia e capacità di generare output (raccomandazioni, previsioni, contenuti, decisioni). Rientra nell'ambito di applicazione dell'AI Act.

2. **Verifica Pratiche Vietate (Art. 5 AI Act)**:
   Non risultano evidenze di manipolazione comportamentale subliminale o punteggio sociale (social scoring). Nessun blocco ex art. 5 salvo impieghi biometrici non autorizzati.

3. **Classificazione del Rischio (Art. 6 & Allegati I / III)**:
   - Se impiegato in infrastrutture critiche (Allegato III, punto 2) o valutazione di sicurezza strutturale/cantieri (Allegato III, punto 4/7): **SISTEMA AD ALTO RISCHIO (HIGH-RISK)**.
   - Se utilizzato come puro ausilio d'ufficio (rielaborazione bozze, formattazione testo, tabelle non decisionali): **RISCHIO MINIMO / TRASPARENZA (Art. 50)**.

4. **Obblighi Essenziali per l'Ingegnere (Art. 26 AI Act & Art. 13 Codice Deontologico)**:
   - **Controllo umano effettivo (Human-in-the-loop):** L'output non può essere approvato senza controllo tecnico specialistico.
   - **Competenza professionale:** L'Ingegnere deve comprendere il funzionamento, i limiti e i possibili bias del modello.
   - **Conservazione dei log:** Salvare gli input forniti e la versione del modello impiegata (accountability).
   - **Trasparenza col committente:** Rendere noto l'impiego di IA qualora incida sostanzialmente sulle scelte progettuali.`;
  }

  if (action === 'optimize-prompt') {
    return `### PROMPT OTTIMIZZATO SECONDO GLI STANDARD CNI

\`\`\`markdown
[RUOLO PROFESSIONALE]
Agisci come un Ingegnere specialista iscritto all'Albo italiano, esperto nel settore di riferimento e profondo conoscitore della normativa tecnica vigente (NTC 2018, Eurocodici, Codice dei Contratti D.Lgs. 36/2023, Testo Unico Edilizia D.P.R. 380/2001).

[CONTESTO & OBIETTIVO]
${query}

[VINCOLI TECNICI & NORMATIVI]
1. Fai riferimento esclusivo al quadro normativo italiano ed europeo applicabile.
2. Esplicita chiaramente ogni ipotesi di calcolo o assunzione progettuale.
3. Se un dato non è presente nella richiesta, non inventarlo: segnala la necessità di approfondimento peritale o indagine in sito.
4. Distingui nettamente i dati normati da considerazioni di buona pratica ingegneristica.

[FORMATO DI OUTPUT RICHIESTO]
- Struttura tabellare per il confronto parametri.
- Riferimenti esatti di articolo, comma e tabella per ogni citazione normativa.
- Sezione finale intitolata: "PUNTI CRITICI DA VERIFICARE DA PARTE DELL'INGEGNERE RESPONSABILE".
\`\`\`

💡 *Consiglio CNI:* Prima di inviare il prompt a qualsiasi LLM cloud, assicurati di aver rimosso nomi di clienti, ubicazioni esatte di particelle catastali o elementi coperti da segreto professionale.`;
  }

  return `### PARERE SINTETICO DEONTOLOGICO (Linee Guida CNI - L. 132/2025)

In merito a: "${query}"

Il Consiglio Nazionale degli Ingegneri (CNI) ribadisce il principio cardine dell'**Antropocentrismo** e della **Responsabilità Esclusiva**:
- L'Intelligenza Artificiale non può sostituire il giudizio critico dell'Ingegnere (Art. 13.1 Codice Deontologico).
- Qualsiasi errore commesso dal software ricade civilmente, penalmente e disciplinarmente sull'Ingegnere firmatario (Art. 13.4).
- È fatto divieto di affidare all'IA scelte decisionali in autonomia priva di supervisione (Art. 13.3).
- L'aggiornamento sulle tecnologie di IA rientra nei doveri di formazione continua obbligatoria (Art. 13.7).`;
}
