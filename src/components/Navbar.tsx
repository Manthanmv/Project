import React from 'react';
import { Compass, Sparkles, Plus, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'trips' | 'scenarios' | 'itinerary';
  onNavigate: (tab: 'dashboard' | 'trips' | 'scenarios') => void;
  onOpenBuilder: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenBuilder,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with icon */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-slate-900 hover:text-slate-700 transition-colors shrink-0 group text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-950 font-sans whitespace-nowrap">
            RoamGenius
          </span>
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => onNavigate('scenarios')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'scenarios'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Curated Scenarios
          </button>

          <button
            onClick={() => onNavigate('trips')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'trips'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            <span>My Trips</span>
            <span className="text-xs px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-mono">
              {savedCount}
            </span>
          </button>

          <button
            onClick={onOpenBuilder}
            className="whitespace-nowrap hover:text-slate-900 transition-colors py-1 cursor-pointer"
          >
            Trip Builder
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBuilder}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-xs cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>

      </div>
    </header>
  );
};
