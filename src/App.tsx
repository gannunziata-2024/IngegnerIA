/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import appDataRaw from './data/appData.json';
import { AppData } from './types';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { SynthesisView } from './views/SynthesisView';
import { DecisionTreeView } from './views/DecisionTreeView';
import { PromptsView } from './views/PromptsView';
import { PracticalCasesView } from './views/PracticalCasesView';
import { ModelsView } from './views/ModelsView';
import { ChecklistView } from './views/ChecklistView';
import { GuideView } from './views/GuideView';
import { GlossaryView } from './views/GlossaryView';
import { QuizView } from './views/QuizView';
import { SavedView } from './views/SavedView';
import { SourceView } from './views/SourceView';
import { BrandLogo, IngegneriaWordmark } from './components/BrandLogo';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

const appData = appDataRaw as unknown as AppData;

export default function App() {
  // Splash Screen: shown initially once, or on manual request
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('cni_splash_seen');
    } catch {
      return true;
    }
  });

  // Mobile sidebar drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Routing
  const [currentRoute, setCurrentRoute] = useState<string>('sintesi');
  const [routeArg, setRouteArg] = useState<string | undefined>(undefined);

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState<string>('');

  // Bookmarks / Saved
  const [savedKeys, setSavedKeys] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('cni_saved_keys');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setCurrentRoute('sintesi');
        setRouteArg(undefined);
        return;
      }
      const [route, ...rest] = hash.split('/');
      setCurrentRoute(route || 'sintesi');
      setRouteArg(rest.length ? decodeURIComponent(rest.join('/')) : undefined);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (route: string, arg?: string) => {
    if (arg) {
      window.location.hash = `${route}/${encodeURIComponent(arg)}`;
    } else {
      window.location.hash = route;
    }
    setCurrentRoute(route);
    setRouteArg(arg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSave = (key: string) => {
    setSavedKeys((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem('cni_saved_keys', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem('cni_splash_seen', '1');
    } catch {}
  };

  const openAiWithPrompt = (promptText: string) => {
    setAiAssistantPrompt(promptText);
    setAiAssistantOpen(true);
  };

  // If splash is active, show the splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-[#0b1f3a] text-slate-100 flex flex-col bg-tech-grid selection:bg-sky-500 selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        savedCount={savedKeys.length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onReopenSplash={() => setShowSplash(true)}
          savedCount={savedKeys.length}
          onOpenSaved={() => navigateTo('salvati')}
        />

        {/* View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentRoute === 'sintesi' && (
            <SynthesisView
              summaries={appData.summaries}
              activeSummaryId={routeArg}
              onSelectSummary={(id) => navigateTo('sintesi', id)}
              onNavigate={navigateTo}
              isSaved={(k) => savedKeys.includes(k)}
              onToggleSave={toggleSave}
            />
          )}

          {currentRoute === 'albero' && (
            <DecisionTreeView
              onNavigate={navigateTo}
              targetNodeId={routeArg}
            />
          )}

          {currentRoute === 'prompt' && (
            <PromptsView
              prompts={appData.prompts}
              activePromptId={routeArg ? parseInt(routeArg, 10) : undefined}
              onSelectPrompt={(id) => navigateTo('prompt', id ? String(id) : undefined)}
              isSaved={(k) => savedKeys.includes(k)}
              onToggleSave={toggleSave}
              onOpenAiAssistantWithPrompt={openAiWithPrompt}
            />
          )}

          {currentRoute === 'pratica' && (
            <PracticalCasesView
              cases={appData.practical}
              initialTopic={routeArg}
              isSaved={(k) => savedKeys.includes(k)}
              onToggleSave={toggleSave}
            />
          )}

          {currentRoute === 'modelli' && (
            <ModelsView
              models={appData.models}
              isSaved={(k) => savedKeys.includes(k)}
              onToggleSave={toggleSave}
            />
          )}

          {currentRoute === 'checklist' && (
            <ChecklistView checkGroups={appData.checks} />
          )}

          {currentRoute === 'guida' && (
            <GuideView
              chapters={appData.chapters}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'glossario' && (
            <GlossaryView terms={appData.glossary} />
          )}

          {currentRoute === 'quiz' && (
            <QuizView
              questions={appData.quizzes}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'salvati' && (
            <SavedView
              data={appData}
              savedKeys={savedKeys}
              onRemoveSave={toggleSave}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'fonte' && <SourceView />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-sky-500/15 bg-[#0f274a]/60 py-6 px-4 sm:px-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <IngegneriaWordmark className="h-4 sm:h-4.5 w-auto" />
                <span className="font-semibold text-slate-300">· Guida Pratica all'IA per l&rsquo;Ingegnere</span>
              </div>
              <p className="text-[11px] text-slate-400">
                A cura del <strong className="text-slate-300">C3i</strong> (Comitato Italiano Ingegneria dell&rsquo;Informazione) ed edita dal <strong className="text-slate-300">CNI</strong> (Consiglio Nazionale degli Ingegneri).
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                onClick={() => setShowSplash(true)}
                className="text-sky-400 hover:underline"
              >
                Rivedi Splash Screen
              </button>
              <span>·</span>
              <a
                href="https://www.cni.it/images/News/2026/CNI_-_Guida_pratica_AI_per_ingegnere_Aggiornamento15ott_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline"
              >
                PDF Ufficiale CNI
              </a>
              <span>·</span>
              <button
                onClick={() => navigateTo('fonte')}
                className="text-slate-400 hover:text-white"
              >
                Crediti &amp; Note
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={appData}
        onNavigate={navigateTo}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        initialQuery={aiAssistantPrompt}
        initialAction={aiAssistantPrompt ? 'optimize-prompt' : 'general'}
      />
    </div>
  );
}
