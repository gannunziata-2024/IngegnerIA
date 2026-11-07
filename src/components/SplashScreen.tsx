import React, { useEffect, useState } from 'react';
import { GearSparkLogo, IngegneriaWordmark } from './BrandLogo';
import { X, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  manualOpen?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, manualOpen = false }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);
  const [isClosing, setIsClosing] = useState(false);

  const steps = [
    { text: 'Preparazione in corso', progress: 25 },
    { text: 'Caricamento degli strumenti di ingegneria', progress: 55 },
    { text: 'Verifica conformità AI Act & Codice Deontologico', progress: 85 },
    { text: 'Benvenuto in IngegnerIA', progress: 100 },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStepIndex(1);
      setProgress(55);
    }, 900);

    const t2 = setTimeout(() => {
      setStepIndex(2);
      setProgress(85);
    }, 1800);

    const t3 = setTimeout(() => {
      setStepIndex(3);
      setProgress(100);
    }, 2600);

    const t4 = setTimeout(() => {
      handleClose();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
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
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer transition-opacity duration-500 ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
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

      {/* Manual close button if opened manually */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all z-20 flex items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider border border-sky-500/20"
      >
        <span>Salta</span>
        <X className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Animated Logo */}
        <div className="mb-6 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <GearSparkLogo size={120} animated={true} />
        </div>

        {/* Title: 100% vector graphic wordmark */}
        <div className="w-full max-w-[340px] sm:max-w-[460px] flex justify-center my-3 filter drop-shadow-[0_4px_16px_rgba(56,189,248,0.3)]">
          <IngegneriaWordmark className="w-full h-auto max-h-16 sm:max-h-20" />
        </div>

        {/* Tagline */}
        <p className="mt-4 text-lg sm:text-xl font-semibold tracking-wide text-sky-300">
          Dalla guida agli strumenti
        </p>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-md leading-relaxed">
          App di supporto agli ingegneri per un utilizzo consapevole e deontologico dell'intelligenza artificiale
        </p>

        {/* Loader Bar */}
        <div className="mt-10 w-full max-w-xs">
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

        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 transition-colors">
            Clicca per iniziare subito <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-wider uppercase text-slate-400/90 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span className="text-sky-300 font-semibold">A cura del C3i</span>
        <span className="hidden sm:inline text-slate-600">·</span>
        <span>Edita dal CNI (Consiglio Nazionale Ingegneri)</span>
      </div>
    </div>
  );
};
