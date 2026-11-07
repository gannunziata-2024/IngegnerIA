import React from 'react';
import { Menu, Search, Sparkles, Play, LogOut, Bookmark, FileText } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenAiAssistant: () => void;
  onReopenSplash: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenAiAssistant,
  onReopenSplash,
  savedCount,
  onOpenSaved
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0b1f3a]/90 backdrop-blur-md border-b border-sky-500/20 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & small logo on mobile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-sky-950/60 lg:hidden"
          aria-label="Apri menu di navigazione"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden">
          <BrandLogo size="sm" showSubtitle={false} />
        </div>
      </div>

      {/* Middle: Global Search Input / Trigger */}
      <div className="flex-1 max-w-md hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/25 text-slate-400 text-xs sm:text-sm transition-all group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
            <span className="truncate">Cerca nella Guida CNI, prompt, quiz...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-900 border border-slate-700 rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-sky-950/60 sm:hidden"
          aria-label="Cerca"
        >
          <Search className="w-5 h-5 text-sky-400" />
        </button>

        {/* AI Assistant button */}
        <button
          onClick={onOpenAiAssistant}
          className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span className="hidden xs:inline">Assistente AI</span>
        </button>

        {/* Saved Items badge */}
        <button
          onClick={onOpenSaved}
          className="p-2 rounded-xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 text-slate-300 hover:text-white transition-colors relative"
          title="Elementi Salvati"
        >
          <Bookmark className="w-4 h-4" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#cd061e] text-white text-[10px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        {/* Replay splash screen */}
        <button
          onClick={onReopenSplash}
          className="p-2 rounded-xl bg-[#0f274a] hover:bg-[#13305a] border border-sky-500/20 text-slate-300 hover:text-white transition-colors hidden md:flex"
          title="Vedi schermata di avvio IngegnerIA"
        >
          <Play className="w-4 h-4 text-sky-400" />
        </button>
      </div>
    </header>
  );
};
