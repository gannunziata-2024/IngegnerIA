import React, { useEffect, useState } from 'react';
import { GearSparkLogo, IngegneriaWordmark } from './BrandLogo';
import { InstitutionLogosBanner } from './InstitutionLogos';
import { X, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  manualOpen?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, manualOpen = false }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const steps = [
    { text: 'Preparazione in corso', progress: 25 },
    { text: 'Caricamento degli strumenti di ingegneria', progress: 55 },
    { text: 'Verifica conformità AI Act & Codice Deontologico', progress: 85 },
    { text: 'Pronto per l\'accesso', progress: 100 },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStepIndex(1);
      setProgress(55);
    }, 800);

    const t2 = setTimeout(() => {
      setStepIndex(2);
      setProgress(85);
    }, 1600);

    const t3 = setTimeout(() => {
      setStepIndex(3);
      setProgress(100);
      setIsLoaded(true);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onFinish();
    }, 450);
  };

  return (
    <div
      onClick={() => {
        if (isLoaded) handleClose();
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 text-center select-none transition-opacity duration-500 overflow-y-auto ${
        isLoaded ? 'cursor-pointer' : 'cursor-default'
      } ${isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(circle at 50% 35%, #13305a 0%, #0b1f3a 70%)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Caricamento IngegnerIA"
    >
      {/* Blueprint grid watermark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(125, 211, 252, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125, 211, 252, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, #000 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, #000 35%, transparent 75%)',
        }}
      />

      {/* Manual skip button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all z-20 flex items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider border border-sky-500/25 cursor-pointer"
      >
        <span>Salta</span>
        <X className="w-4 h-4" />
      </button>

      <div className="my-auto relative z-10 flex flex-col items-center max-w-lg w-full py-8">
        {/* Animated Logo */}
        <div className="mb-6 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <GearSparkLogo size={110} animated={true} />
        </div>

        {/* Title: 100% vector graphic wordmark */}
        <div className="w-full max-w-[340px] sm:max-w-[460px] flex justify-center my-3 filter drop-shadow-[0_4px_16px_rgba(56,189,248,0.3)]">
          <IngegneriaWordmark className="w-full h-auto max-h-16 sm:max-h-20" />
        </div>

        {/* Tagline */}
        <p className="mt-3 text-lg sm:text-xl font-semibold tracking-wide text-sky-300">
          Dalla guida all'app
        </p>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-md leading-relaxed font-medium">
          A supporto degli ingegneri per un utilizzo consapevole, responsabile e deontologico dell'intelligenza artificiale
        </p>

        {/* Loader Bar */}
        <div className="mt-8 w-full max-w-xs">
          <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-sky-300 to-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs tracking-wider font-medium text-sky-200/90 h-5">
            {steps[stepIndex].text}
          </p>
        </div>

        {/* Action Button when loaded */}
        <div className="mt-8 min-h-[50px] flex items-center justify-center">
          {isLoaded ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="px-8 py-3.5 rounded-xl bg-[#cd061e] hover:bg-[#b9051a] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(205,6,30,0.5)] hover:shadow-[0_0_35px_rgba(205,6,30,0.7)] transform hover:-translate-y-0.5 transition-all flex items-center gap-3 border border-red-400/40 cursor-pointer animate-bounce"
            >
              <span>Entra in IngegnerIA</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <span className="text-xs text-slate-400 animate-pulse tracking-wide">
              Caricamento in corso...
            </span>
          )}
        </div>
      </div>

      {/* Footer with Vectorized CNI-C3i Institutional Logo Banner */}
      <div className="relative z-10 w-full max-w-xl mx-auto pt-4 pb-2 border-t border-sky-500/15 flex flex-col items-center justify-center">
        <InstitutionLogosBanner className="w-full max-w-md sm:max-w-lg h-auto" />
      </div>
    </div>
  );
};
