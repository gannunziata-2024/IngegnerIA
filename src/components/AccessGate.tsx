import React, { useState } from 'react';
import { GearSparkLogo, IngegneriaWordmark } from './BrandLogo';
import { KeyRound, ShieldCheck, ArrowRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface AccessGateProps {
  onUnlock: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (password.trim() === 'guidacni') {
      setLoading(true);
      setError(false);
      localStorage.setItem('cni_auth_token', 'guidacni');
      setTimeout(() => {
        onUnlock();
      }, 300);
    } else {
      setError(true);
    }
  };

  const handleQuickAccess = () => {
    setPassword('guidacni');
    setLoading(true);
    setError(false);
    localStorage.setItem('cni_auth_token', 'guidacni');
    setTimeout(() => {
      onUnlock();
    }, 250);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-tech-grid"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #13305a 0%, #0b1f3a 80%)'
      }}
    >
      {/* Decorative glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#cd061e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0f274a]/90 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-7 sm:p-9 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center mb-7">
          <div className="p-3 bg-sky-950/60 rounded-2xl border border-sky-400/20 shadow-inner mb-4">
            <GearSparkLogo size={64} animated={true} />
          </div>

          <div className="w-full max-w-[260px] flex justify-center mb-1">
            <IngegneriaWordmark className="w-full h-auto max-h-10" />
          </div>

          <p className="text-sky-300 font-semibold text-sm mt-1">
            Dalla guida all'app
          </p>
          <p className="text-xs text-slate-300/80 mt-2 max-w-xs leading-relaxed">
            Piattaforma interattiva per l'applicazione delle linee guida CNI sull'Intelligenza Artificiale e AI Act
          </p>
        </div>

        {/* Quick access banner */}
        <div className="mb-6 p-3.5 bg-sky-900/30 border border-sky-400/30 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Password di accesso</div>
              <div className="text-[11px] text-sky-200/90 font-mono tracking-wider">guidacni</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickAccess}
            className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md hover:shadow-sky-500/30 flex items-center gap-1 shrink-0"
          >
            <span>Accedi subito</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
              Inserimento credenziale
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Digita password..."
                className={`w-full px-4 py-3 bg-[#0b1f3a] text-white placeholder-slate-500 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  error 
                    ? 'border-red-500 focus:ring-red-500/40 bg-red-950/20' 
                    : 'border-sky-500/30 focus:border-sky-400 focus:ring-sky-500/30'
                }`}
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Password non valida. Inserisci <strong>guidacni</strong></span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Verifica in corso...
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Entra nella Guida</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-sky-500/15 flex items-center justify-between text-[11px] text-slate-400">
          <span>Consiglio Nazionale Ingegneri</span>
          <span className="text-sky-400/90 font-medium">L. 132/2025 · AI Act</span>
        </div>
      </div>
    </div>
  );
};
