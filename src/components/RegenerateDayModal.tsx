import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { Trip, DayPlan } from '../types/trip';
import { regenerateDayAPI } from '../services/api';

interface RegenerateDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
  currentDayNumber: number;
  onDayRegenerated: (updatedDay: DayPlan) => void;
}

const PRESET_ADJUSTMENTS = [
  'Focus more on authentic food markets and cooking experiences',
  'Make it a relaxed, scenic day with zero rush and a sunset cocktail spot',
  'Swap museums for outdoor nature hikes and scenic viewpoints',
  'Rainy-day indoor alternatives with cozy cafes and local crafts',
  'Budget-friendly activities with free walking tours and street food',
  'Romantic dinner and evening walk for a couple',
];

export const RegenerateDayModal: React.FC<RegenerateDayModalProps> = ({
  isOpen,
  onClose,
  trip,
  currentDayNumber,
  onDayRegenerated,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState(currentDayNumber);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const targetDay = trip.days.find(d => d.dayNumber === selectedDayNumber) || trip.days[0];

  const handleRegenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegenerating(true);
    setErrorMessage('');

    try {
      const updatedDay = await regenerateDayAPI({
        tripId: trip.id,
        dayNumber: selectedDayNumber,
        destination: trip.destination,
        travelerType: trip.travelerType,
        budgetLevel: trip.budgetLevel,
        pace: trip.pace,
        interests: trip.interests,
        currentDay: targetDay,
        customPrompt: customPrompt || 'Refresh this day with engaging alternative sights and seasonal dining.',
      });

      onDayRegenerated(updatedDay);
      onClose();
    } catch (err: any) {
      console.error('Day regeneration failed:', err);
      setErrorMessage(err.message || 'Failed to regenerate day. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Regenerate Single Day
              </h2>
              <p className="text-xs text-slate-500">
                AI re-engineers morning, afternoon, evening & dining
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isRegenerating}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRegenerate} className="p-6 space-y-5">
          {/* Day Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Select Day to Regenerate
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {trip.days.map((d) => (
                <button
                  type="button"
                  key={d.dayNumber}
                  onClick={() => setSelectedDayNumber(d.dayNumber)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    selectedDayNumber === d.dayNumber
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Day {d.dayNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Current Day Preview */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="font-semibold text-slate-900">Current Theme: </span>
            <span className="text-slate-700">{targetDay?.theme}</span>
          </div>

          {/* Prompt Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Adjustment Presets
            </label>
            <div className="space-y-1.5">
              {PRESET_ADJUSTMENTS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCustomPrompt(preset)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border ${
                    customPrompt === preset
                      ? 'bg-slate-100 border-slate-900 font-medium text-slate-950'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Instruction Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Or Specify Custom Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Focus on artisan pottery shops, add a sunset harbor cruise, and choose a seafood pasta dinner..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isRegenerating}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isRegenerating}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Regenerating Day {selectedDayNumber}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Regenerate Day {selectedDayNumber}</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
