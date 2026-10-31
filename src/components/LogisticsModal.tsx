import React, { useState } from 'react';
import { X, CheckSquare, Square, ShieldCheck, Bus, Sun, Compass } from 'lucide-react';
import { Trip } from '../types/trip';

interface LogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const LogisticsModal: React.FC<LogisticsModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const packingList = trip.packingTips || [
    'Passport & travel insurance documents',
    'Comfortable broken-in walking shoes',
    'Universal power adapter & power bank',
    'Weather-appropriate layered clothing',
  ];

  const totalPacked = packingList.filter(item => checkedItems[item]).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Compass className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Logistics & Packing Guide
              </h2>
              <p className="text-xs text-slate-500">
                Essential intelligence for {trip.destination}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Best Time to Visit */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Climate & Timing Insight</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {trip.bestTimeToVisit}
            </p>
          </div>

          {/* Interactive Packing Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-slate-600" />
                <span>Interactive Packing Checklist</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {totalPacked} of {packingList.length} packed
              </span>
            </div>

            <div className="space-y-2">
              {packingList.map((item, idx) => {
                const isDone = Boolean(checkedItems[item]);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isDone
                        ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    )}
                    <span className="text-xs">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transit Advice */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Bus className="w-4 h-4 text-slate-600" />
              <span>Transit & Route Navigation Hacks</span>
            </h3>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              {trip.transportationTips}
            </div>
          </div>

          {/* Local Etiquette */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Local Etiquette & Cultural Rules</span>
            </h3>
            <ul className="space-y-1.5">
              {(trip.localEtiquette || []).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
