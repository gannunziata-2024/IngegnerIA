import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, X, Smartphone, CheckCircle } from 'lucide-react';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, suppress the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-sky-950/70 hover:bg-sky-900 border border-sky-400/40 text-sky-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${className}`}
        title="Installa IngegnerIA come applicazione sul tuo dispositivo"
      >
        <Download className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline">Installa App</span>
      </button>
    );
  }

  // iOS Safari flow (WebKit doesn't fire beforeinstallprompt)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-sky-950/70 hover:bg-sky-900 border border-sky-400/40 text-sky-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${className}`}
          title="Istruzioni per installare su iPhone/iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Installa su iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#0f274a] border border-sky-500/30 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Installa IngegnerIA su iOS</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-[#0b1f3a] border border-sky-500/20 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <p>In Safari, tocca il pulsante <strong className="text-white">Condividi</strong> (<Share2 className="w-3.5 h-3.5 inline text-sky-400" />) in basso.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0b1f3a] border border-sky-500/20 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <p>Scorri l'elenco e seleziona <strong className="text-white">Aggiungi alla schermata Home</strong>.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0b1f3a] border border-sky-500/20 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <p>Conferma toccando <strong className="text-white">Aggiungi</strong> in alto a destra.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                Ho capito
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback prompt button for browsers that support install or manual prompt
  return (
    <button
      onClick={() => {
        // Show general help modal or alert
        alert("Per installare l'app: apri il menu del browser (i 3 puntini ⋮ o l'icona di installazione nella barra degli indirizzi) e seleziona 'Installa IngegnerIA' oppure 'Aggiungi a schermata Home'.");
      }}
      className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-sky-950/50 hover:bg-sky-900 border border-sky-500/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${className}`}
      title="Installa l'app sul tuo dispositivo"
    >
      <Download className="w-3.5 h-3.5 text-sky-400" />
      <span className="hidden md:inline">Installa App</span>
    </button>
  );
};
