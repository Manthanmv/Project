import React, { useState } from 'react';
import { X, DollarSign, Users, PieChart, Info, Check } from 'lucide-react';
import { Trip } from '../types/trip';

interface BudgetSplitterModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const BudgetSplitterModal: React.FC<BudgetSplitterModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [splitCount, setSplitCount] = useState<number>(Math.max(1, trip.groupSize || 1));
  const { stayEstimatedTotal, activitiesEstimatedTotal, diningEstimatedTotal, transportEstimatedTotal, currency, budgetTip } = trip.budgetBreakdown;

  if (!isOpen) return null;

  const total = stayEstimatedTotal + activitiesEstimatedTotal + diningEstimatedTotal + transportEstimatedTotal;
  const perPerson = Math.round(total / Math.max(1, splitCount));

  const stayPct = Math.round((stayEstimatedTotal / total) * 100) || 0;
  const actPct = Math.round((activitiesEstimatedTotal / total) * 100) || 0;
  const dinePct = Math.round((diningEstimatedTotal / total) * 100) || 0;
  const transPct = Math.round((transportEstimatedTotal / total) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Budget Tracker & Group Splitter
              </h2>
              <p className="text-xs text-slate-500">
                Estimated logistics, lodging, dining, and per-person breakdown
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
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Total & Per Person KPI */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                Estimated Total Trip Cost
              </div>
              <div className="text-2xl font-bold text-slate-950 font-mono-numbers">
                ${total.toLocaleString()} <span className="text-xs font-normal text-slate-500">{currency}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {trip.durationDays} days · {trip.budgetLevel} tier
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="text-xs text-emerald-800 uppercase tracking-wider font-medium mb-1">
                Cost Per Person
              </div>
              <div className="text-2xl font-bold text-emerald-950 font-mono-numbers">
                ${perPerson.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 mt-1">
                Split evenly among {splitCount} {splitCount === 1 ? 'person' : 'people'}
              </div>
            </div>
          </div>

          {/* Group Split Controller */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-500" />
                <span>Adjust Group Split Size</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded">
                {splitCount} travelers
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={12}
              value={splitCount}
              onChange={(e) => setSplitCount(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Solo (1)</span>
              <span>Couple (2)</span>
              <span>Group (5)</span>
              <span>Expedition (12)</span>
            </div>
          </div>

          {/* Stacked Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-800">
              <span>Category Allocation</span>
              <span className="font-mono-numbers text-slate-500">100% of Total</span>
            </div>
            
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div style={{ width: `${stayPct}%` }} className="bg-indigo-600" title={`Lodging: ${stayPct}%`} />
              <div style={{ width: `${actPct}%` }} className="bg-amber-500" title={`Activities: ${actPct}%`} />
              <div style={{ width: `${dinePct}%` }} className="bg-rose-500" title={`Dining: ${dinePct}%`} />
              <div style={{ width: `${transPct}%` }} className="bg-emerald-500" title={`Transit: ${transPct}%`} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                <span className="text-slate-600">Lodging ({stayPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-600">Activities ({actPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-600">Dining ({dinePct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-600">Transit ({transPct}%)</span>
              </div>
            </div>
          </div>

          {/* Category Detail Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 text-left">Category</th>
                  <th className="py-2.5 px-3 text-right">Total Est.</th>
                  <th className="py-2.5 px-3 text-right">Per Person</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers">
                <tr>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">Accommodations & Stays</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">${stayEstimatedTotal.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">${Math.round(stayEstimatedTotal / splitCount).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">Attractions & Excursions</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">${activitiesEstimatedTotal.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">${Math.round(activitiesEstimatedTotal / splitCount).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">Dining & Culinary</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">${diningEstimatedTotal.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">${Math.round(diningEstimatedTotal / splitCount).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">Transit & Transfers</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">${transportEstimatedTotal.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">${Math.round(transportEstimatedTotal / splitCount).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI Budget Tip Callout */}
          {budgetTip && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2.5 text-amber-900">
              <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <span className="font-bold">AI Budget Optimization Tip: </span>
                <span>{budgetTip}</span>
              </div>
            </div>
          )}

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
