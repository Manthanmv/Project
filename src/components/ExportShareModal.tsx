import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, Share2 } from 'lucide-react';
import { Trip } from '../types/trip';

interface ExportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format as readable plain text / markdown for group messaging
  const generateTextItinerary = () => {
    let text = `✈️ ${trip.title} (${trip.destination})\n`;
    text += `📅 ${trip.startDate} to ${trip.endDate} (${trip.durationDays} Days)\n`;
    text += `👥 ${trip.travelerType.toUpperCase()} · ${trip.groupSize} Traveler(s) · Pace: ${trip.pace}\n`;
    text += `💰 Estimated Total: $${trip.totalBudgetEstimate} USD\n\n`;
    text += `📖 Summary: ${trip.tagline}\n\n`;

    trip.days.forEach((day) => {
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `📍 DAY ${day.dayNumber} (${day.date}): ${day.theme}\n`;
      text += `Summary: ${day.summary}\n\n`;
      text += `🌅 Morning (${day.morning.time}): ${day.morning.title}\n`;
      text += `   - ${day.morning.description}\n`;
      text += `   - Tip: ${day.morning.insiderTip}\n\n`;
      text += `☀️ Afternoon (${day.afternoon.time}): ${day.afternoon.title}\n`;
      text += `   - ${day.afternoon.description}\n`;
      text += `   - Next stop: ${day.afternoon.transportToNext}\n\n`;
      text += `🌙 Evening (${day.evening.time}): ${day.evening.title}\n`;
      text += `   - ${day.evening.description}\n\n`;
      text += `🍽️ Dining Pick: ${day.diningRecommendation.name} (${day.diningRecommendation.cuisine})\n`;
      text += `   - Try: ${day.diningRecommendation.recommendedDish}\n`;
      text += `   - Reservation: ${day.diningRecommendation.reservationNeeded ? 'Required' : 'Walk-in fine'}\n\n`;
    });

    text += `🎒 Packing Advice: ${trip.packingTips.join(', ')}\n`;
    text += `💡 Generated via RoamGenius AI Planner`;
    return text;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateTextItinerary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${trip.destination.toLowerCase().replace(/[^a-z0-9]/g, '_')}_itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Share2 className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Export & Share Itinerary
              </h2>
              <p className="text-xs text-slate-500">
                Share with travel companions or save offline
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

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleCopyText}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-600 mb-1" />
              ) : (
                <Copy className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform mb-1" />
              )}
              <span className="text-xs font-semibold text-slate-900">
                {copied ? 'Copied!' : 'Copy to Chat'}
              </span>
              <span className="text-[10px] text-slate-500">
                Formatted text
              </span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <Download className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-semibold text-slate-900">
                Download JSON
              </span>
              <span className="text-[10px] text-slate-500">
                Full trip backup
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <Printer className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-semibold text-slate-900">
                Print / PDF
              </span>
              <span className="text-[10px] text-slate-500">
                Printable layout
              </span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Preview Text Export
            </label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap">
              {generateTextItinerary()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
