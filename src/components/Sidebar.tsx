import React from 'react';
import { 
  Layers, 
  GitFork, 
  Sparkles, 
  Wrench, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  HelpCircle, 
  GraduationCap, 
  Bookmark, 
  Info,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BrandLogo, IngegneriaWordmark } from './BrandLogo';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  savedCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  savedCount,
  isOpen,
  onClose
}) => {
  const navItems = [
    { id: 'guida', label: 'Guida completa', icon: BookOpen, badge: '57 pag.' },
    { id: 'sintesi', label: 'Schede di Sintesi', icon: Layers, badge: '10' },
    { id: 'albero', label: 'Albero Decisionale AI Act', icon: GitFork, badge: 'Schema + Wizard' },
    { id: 'prompt', label: 'Prompt Ingegneristici', icon: Sparkles, badge: '8' },
    { id: 'pratica', label: 'Casi Pratici Operativi', icon: Wrench, badge: '65' },
    { id: 'modelli', label: 'Modelli & Contratti', icon: FileText, badge: '3' },
    { id: 'checklist', label: 'Checklist di Controllo', icon: CheckSquare, badge: '3' },
    { id: 'glossario', label: 'Glossario Tecnico', icon: HelpCircle, badge: '23' },
    { id: 'quiz', label: 'Autovalutazione', icon: GraduationCap, badge: '50 quesiti' },
    { id: 'salvati', label: 'Elementi Salvati', icon: Bookmark, badge: savedCount > 0 ? String(savedCount) : undefined },
    { id: 'fonte', label: 'Crediti e Autori', icon: Info },
  ];

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#0b1f3a] border-r border-sky-500/20 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Area */}
        <div className="p-5 border-b border-sky-500/15 bg-[#102a4e]/60">
          <button 
            onClick={() => handleSelect('sintesi')} 
            className="text-left w-full cursor-pointer hover:opacity-95 transition-opacity"
          >
            <BrandLogo size="md" animated={true} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-400/80">
            Strumenti della Guida
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-sky-500/20 to-sky-500/10 text-white border-l-4 border-sky-400 pl-2.5 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-sky-950/40 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-sky-300' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                    active 
                      ? 'bg-sky-400 text-slate-950 font-bold' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-sky-500/15 bg-[#0f274a]/70">
          <a
            href="https://www.cni.it/images/News/2026/CNI_-_Guida_pratica_AI_per_ingegnere_Aggiornamento15ott_1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/20 text-xs text-sky-300 transition-colors group"
          >
            <span className="font-semibold text-white truncate">Scarica il PDF della guida</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 shrink-0" />
          </a>

          <div className="mt-3 text-[10px] text-slate-400/90 text-center flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-1.5">
              <IngegneriaWordmark className="h-3 w-auto inline-block" />
            </div>
            <span className="text-[10px] text-sky-400/80">A cura del C3i · Edita dal CNI</span>
          </div>
        </div>
      </aside>
    </>
  );
};
