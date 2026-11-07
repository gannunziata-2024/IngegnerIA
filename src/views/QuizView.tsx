import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { GraduationCap, CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Clock, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onNavigate: (route: string, arg?: string) => void;
}

const quizParts = [
  { id: 1, title: 'Quadro normativo (AI Act & L. 132/2025)' },
  { id: 2, title: 'Codice Deontologico degli Ingegneri (Art. 13)' },
  { id: 3, title: 'Rischi legali, sanzioni e assicurazioni' },
  { id: 4, title: 'Aggiornamento e competenze professionali' },
  { id: 5, title: 'Uso corretto degli LLM e prompt engineering' },
];

export const QuizView: React.FC<QuizViewProps> = ({ questions, onNavigate }) => {
  const [activeSession, setActiveSession] = useState<{
    ids: number[];
    currentIndex: number;
    answers: { [id: number]: string };
    finished: boolean;
  } | null>(null);

  const [instantFeedback, setInstantFeedback] = useState(true);

  const startQuiz = (selectedIds: number[]) => {
    setActiveSession({
      ids: selectedIds,
      currentIndex: 0,
      answers: {},
      finished: false,
    });
  };

  const startRandom10 = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    startQuiz(shuffled.slice(0, 10).map((q) => q.id));
  };

  const startPart = (partNum: number) => {
    const partQuestions = questions.filter((q) => q.part === partNum);
    startQuiz(partQuestions.map((q) => q.id));
  };

  const startFull50 = () => {
    startQuiz(questions.map((q) => q.id));
  };

  const handleSelectOption = (questionId: number, optionId: string) => {
    if (!activeSession || activeSession.finished) return;
    setActiveSession({
      ...activeSession,
      answers: {
        ...activeSession.answers,
        [questionId]: optionId,
      },
    });
  };

  const handleNext = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex < activeSession.ids.length - 1) {
      setActiveSession({
        ...activeSession,
        currentIndex: activeSession.currentIndex + 1,
      });
    } else {
      setActiveSession({
        ...activeSession,
        finished: true,
      });
    }
  };

  const handlePrev = () => {
    if (!activeSession || activeSession.currentIndex === 0) return;
    setActiveSession({
      ...activeSession,
      currentIndex: activeSession.currentIndex - 1,
    });
  };

  // Score calculations
  const calculateScore = () => {
    if (!activeSession) return { correct: 0, wrong: 0, unanswered: 0, total: 0 };
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    activeSession.ids.forEach((id) => {
      const q = questions.find((item) => item.id === id);
      const ans = activeSession.answers[id];
      if (!ans) {
        unanswered++;
      } else if (ans === q?.answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    return { correct, wrong, unanswered, total: activeSession.ids.length };
  };

  // If in quiz test mode
  if (activeSession && !activeSession.finished) {
    const currentQId = activeSession.ids[activeSession.currentIndex];
    const currentQ = questions.find((q) => q.id === currentQId)!;
    const selectedAnswer = activeSession.answers[currentQId];
    const isAnswered = !!selectedAnswer;
    const isCorrect = selectedAnswer === currentQ.answer;

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b border-sky-500/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Quesito {activeSession.currentIndex + 1} di {activeSession.ids.length}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-mono">
              Parte {currentQ.part} · Pag. {currentQ.page}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={instantFeedback}
                onChange={(e) => setInstantFeedback(e.target.checked)}
                className="rounded text-sky-400 focus:ring-sky-400 bg-slate-900 border-slate-700"
              />
              <span>Spiegazione immediata</span>
            </label>
            <button
              onClick={() => setActiveSession(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Esci
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-300 transition-all duration-300"
            style={{ width: `${((activeSession.currentIndex + 1) / activeSession.ids.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 space-y-6 shadow-xl">
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              let optClass = 'bg-[#0b1f3a] border-sky-500/20 text-slate-200 hover:bg-sky-950/40';

              if (instantFeedback && isAnswered) {
                if (opt.id === currentQ.answer) {
                  optClass = 'bg-emerald-950/50 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400';
                } else if (isSelected) {
                  optClass = 'bg-red-950/50 border-red-400 text-red-200 ring-1 ring-red-400';
                }
              } else if (isSelected) {
                optClass = 'bg-sky-500/20 border-sky-400 text-white ring-1 ring-sky-400';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQId, opt.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${optClass}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                    {opt.id}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Instant feedback explanation */}
          {instantFeedback && isAnswered && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
              isCorrect ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-red-950/40 border-red-500/30 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                <span>{isCorrect ? 'Risposta Corretta!' : 'Risposta da Rivedere'}</span>
              </div>
              <p>{currentQ.explanation}</p>
              {currentQ.evidence && (
                <div className="pt-2 border-t border-sky-500/15 text-xs text-slate-300 italic">
                  &ldquo;{currentQ.evidence}&rdquo; (Guida CNI pag. {currentQ.page})
                </div>
              )}
            </div>
          )}

          {/* Stepper buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-500/15">
            <button
              onClick={handlePrev}
              disabled={activeSession.currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-semibold"
            >
              Precedente
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <span>{activeSession.currentIndex < activeSession.ids.length - 1 ? 'Prossima Domanda' : 'Concludi Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If in quiz finished / results mode
  if (activeSession && activeSession.finished) {
    const score = calculateScore();
    const percent = Math.round((score.correct / score.total) * 100);

    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f274a] border border-sky-500/25 text-center space-y-4 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Riepilogo Test CNI</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Punteggio Finale: {score.correct} / {score.total} ({percent}%)
          </h2>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto pt-2">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold text-lg">{score.correct}</span>
              <div className="text-[11px] text-slate-400">Corrette</div>
            </div>
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30">
              <span className="text-red-400 font-bold text-lg">{score.wrong}</span>
              <div className="text-[11px] text-slate-400">Da rivedere</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-300 font-bold text-lg">{score.unanswered}</span>
              <div className="text-[11px] text-slate-400">Non risposte</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => startRandom10()}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nuovo Test Rapido (10 quesiti)</span>
            </button>
            <button
              onClick={() => setActiveSession(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Torna al menu quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Landing: Choose test type
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
            <span>Autovalutazione Ufficiale</span>
            <span>·</span>
            <span>50 Domande &amp; Risposte</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-red-400" />
            <span>Simulatore Quiz CNI</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Testa la tua padronanza sui principi della Legge 132/2025, dell&rsquo;AI Act e dell&rsquo;articolo 13 del Codice Deontologico degli Ingegneri.
          </p>
        </div>
      </div>

      {/* Main Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={startRandom10}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#102a4e] to-[#0f274a] border border-sky-500/30 hover:border-sky-400/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Consigliato
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
              Test Rapido · 10 Domande
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              10 quesiti estratti casualmente tra tutte le 5 sezioni per una verifica immediata in 5 minuti con spiegazione su ogni risposta.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-sky-500/15 flex items-center justify-between">
            <span className="text-xs text-sky-400 font-semibold">Tempo stimato: ~5 min</span>
            <span className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
              Inizia test <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div 
          onClick={startFull50}
          className="p-6 rounded-2xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/50 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
              Simulazione Completa
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
              Tutte le 50 Domande CNI
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Il percorso integrale per verificare punto per punto tutti gli aspetti normativi, deontologici, sanzionatori e tecnici della Guida.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-sky-500/15 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">50 quesiti ufficiali</span>
            <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 group-hover:bg-sky-500 group-hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors">
              Avvia completo <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Parts breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
          Oppure esercitati su una specifica parte
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {quizParts.map((part) => {
            const count = questions.filter((q) => q.part === part.id).length;
            return (
              <div
                key={part.id}
                onClick={() => startPart(part.id)}
                className="p-4 rounded-xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 hover:border-sky-400/40 transition-all cursor-pointer group shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-sky-400">
                    PARTE {part.id}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {count} domande
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                  {part.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
