import React, { useState } from 'react';
import { X, Edit3, DollarSign, Clock, MapPin, Tag } from 'lucide-react';
import { Activity, ActivityCategory } from '../types/trip';

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  slotName: 'morning' | 'afternoon' | 'evening';
  dayNumber: number;
  onSave: (updatedActivity: Activity, slotName: 'morning' | 'afternoon' | 'evening', dayNumber: number) => void;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  isOpen,
  onClose,
  activity,
  slotName,
  dayNumber,
  onSave,
}) => {
  const [title, setTitle] = useState(activity.title);
  const [time, setTime] = useState(activity.time);
  const [duration, setDuration] = useState(activity.duration);
  const [location, setLocation] = useState(activity.location);
  const [description, setDescription] = useState(activity.description);
  const [costEstimated, setCostEstimated] = useState(activity.costEstimated);
  const [category, setCategory] = useState<ActivityCategory>(activity.category || 'sightseeing');
  const [insiderTip, setInsiderTip] = useState(activity.insiderTip || '');
  const [transportToNext, setTransportToNext] = useState(activity.transportToNext || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        ...activity,
        title,
        time,
        duration,
        location,
        description,
        costEstimated: Number(costEstimated) || 0,
        category,
        insiderTip,
        transportToNext,
      },
      slotName,
      dayNumber
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-slate-800" />
            <h2 className="text-base font-bold text-slate-950 capitalize">
              Edit {slotName} Activity (Day {dayNumber})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Activity Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 capitalize"
              >
                <option value="sightseeing">Sightseeing</option>
                <option value="culture">Culture & Heritage</option>
                <option value="outdoor">Outdoor</option>
                <option value="adventure">Adventure</option>
                <option value="wellness">Wellness & Spa</option>
                <option value="shopping">Shopping</option>
                <option value="food">Food & Dining</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Estimated Cost (USD)
              </label>
              <input
                type="number"
                value={costEstimated}
                onChange={(e) => setCostEstimated(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Location / Area
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Description & Plan
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Insider Tip
            </label>
            <input
              type="text"
              value={insiderTip}
              onChange={(e) => setInsiderTip(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Transport to Next Destination
            </label>
            <input
              type="text"
              value={transportToNext}
              onChange={(e) => setTransportToNext(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
