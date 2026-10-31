import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Compass,
  DollarSign,
  Heart,
  MapPin,
  RefreshCw,
  Share2,
  Users,
  Utensils,
  Hotel,
  CheckCircle2,
  Circle,
  ExternalLink,
  Edit3,
  Navigation,
  Sparkles,
  Info,
  ChevronRight,
  Plus,
  Landmark,
  Camera,
  Coffee,
  Footprints,
  ShoppingBag,
  Sparkle,
} from 'lucide-react';
import { Trip, DayPlan, Activity, ActivityCategory } from '../types/trip';
import { RegenerateDayModal } from './RegenerateDayModal';
import { BudgetSplitterModal } from './BudgetSplitterModal';
import { LogisticsModal } from './LogisticsModal';
import { EditActivityModal } from './EditActivityModal';
import { ExportShareModal } from './ExportShareModal';

interface ItineraryViewProps {
  trip: Trip;
  onBack: () => void;
  onUpdateTrip: (updatedTrip: Trip) => void;
  onToggleFavorite: (tripId: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  onBack,
  onUpdateTrip,
  onToggleFavorite,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  // Modals state
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isLogisticsOpen, setIsLogisticsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<{
    activity: Activity;
    slotName: 'morning' | 'afternoon' | 'evening';
    dayNumber: number;
  } | null>(null);

  // Completed activities state stored locally
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const toggleActivityCompletion = (activityId: string) => {
    setCompletedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  const activeDay = trip.days.find(d => d.dayNumber === selectedDayNumber) || trip.days[0];

  // Callback when single day is regenerated via AI
  const handleDayRegenerated = (updatedDay: DayPlan) => {
    const updatedDays = trip.days.map(d =>
      d.dayNumber === updatedDay.dayNumber ? updatedDay : d
    );
    const updatedTrip: Trip = {
      ...trip,
      days: updatedDays,
      updatedAt: new Date().toISOString(),
    };
    onUpdateTrip(updatedTrip);
  };

  // Callback when activity is manually edited
  const handleSaveActivity = (
    updatedActivity: Activity,
    slotName: 'morning' | 'afternoon' | 'evening',
    dayNumber: number
  ) => {
    const updatedDays = trip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          [slotName]: updatedActivity,
        };
      }
      return d;
    });
    const updatedTrip: Trip = {
      ...trip,
      days: updatedDays,
      updatedAt: new Date().toISOString(),
    };
    onUpdateTrip(updatedTrip);
  };

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'culture':
        return Landmark;
      case 'outdoor':
      case 'adventure':
        return Footprints;
      case 'food':
        return Coffee;
      case 'shopping':
        return ShoppingBag;
      case 'wellness':
        return Sparkle;
      case 'sightseeing':
      default:
        return Camera;
    }
  };

  const travelerLabel =
    trip.travelerType === 'solo'
      ? 'Solo Traveler'
      : trip.travelerType === 'couple'
      ? 'Couple Vacation'
      : `Group of ${trip.groupSize}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Breadcrumb & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRegenerateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Regenerate Day</span>
          </button>

          <button
            onClick={() => setIsBudgetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Budget & Splitter</span>
          </button>

          <button
            onClick={() => setIsLogisticsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span>Logistics & Packing</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Export & Share</span>
          </button>

          <button
            onClick={() => onToggleFavorite(trip.id)}
            className={`p-1.5 border rounded-lg transition-colors cursor-pointer shadow-2xs ${
              trip.isFavorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title={trip.isFavorite ? 'Saved in favorites' : 'Mark as favorite'}
          >
            <Heart className={`w-4 h-4 ${trip.isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Trip Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white border border-slate-800">
        {trip.heroImage && (
          <div className="absolute inset-0">
            <img
              src={trip.heroImage}
              alt={trip.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-8 space-y-3">
          {/* Zero-Pill Unboxed Metadata with separators (§1.A) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono-numbers">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{trip.destination}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{trip.durationDays} Days</span>
            <span aria-hidden="true">·</span>
            <span>{travelerLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{trip.budgetLevel} Tier</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{trip.pace} Pace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
            {trip.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {trip.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 font-mono-numbers border-t border-slate-800/80">
            <div>
              <span className="text-slate-500">Dates: </span>
              <span className="text-slate-200 font-medium">
                {trip.startDate} to {trip.endDate}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Est. Total: </span>
              <span className="text-slate-200 font-medium">
                ${trip.totalBudgetEstimate?.toLocaleString() || trip.budgetBreakdown.stayEstimatedTotal + trip.budgetBreakdown.diningEstimatedTotal} USD
              </span>
            </div>
            {trip.accommodationStyle && (
              <div>
                <span className="text-slate-500">Style: </span>
                <span className="text-slate-200 font-medium capitalize">
                  {trip.accommodationStyle.replace('-', ' ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {trip.days.map((day) => {
          const isSelected = day.dayNumber === selectedDayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayNumber(day.dayNumber)}
              className={`flex-shrink-0 text-left px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                <span>Day {day.dayNumber}</span>
                <span className={`text-[10px] font-mono-numbers opacity-80 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                  {day.date}
                </span>
              </div>
              <div className={`text-[11px] truncate max-w-[170px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                {day.theme}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Content */}
      {activeDay && (
        <div className="space-y-6">
          
          {/* Day Header Theme & Summary */}
          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5 font-mono-numbers">
                Day {activeDay.dayNumber} Theme · {activeDay.date}
              </div>
              <h2 className="text-lg font-bold text-slate-950">
                {activeDay.theme}
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {activeDay.summary}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedDayNumber(activeDay.dayNumber);
                setIsRegenerateOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Regenerate This Day</span>
            </button>
          </div>

          {/* Activities Timeline (Morning, Afternoon, Evening) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Day Schedule & Transit Routing
            </h3>

            {(['morning', 'afternoon', 'evening'] as const).map((slotName) => {
              const activity = activeDay[slotName];
              if (!activity) return null;

              const isCompleted = Boolean(completedActivities[activity.id]);
              const CategoryIcon = getCategoryIcon(activity.category);
              const slotLabel = slotName === 'morning' ? 'Morning' : slotName === 'afternoon' ? 'Afternoon' : 'Evening';
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                activity.location + ', ' + trip.destination
              )}`;

              return (
                <div
                  key={activity.id || slotName}
                  className={`bg-white border rounded-xl p-5 transition-all relative ${
                    isCompleted
                      ? 'border-slate-200 opacity-60 bg-slate-50/70'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Left: Time & Slot Badge */}
                    <div className="sm:w-48 shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleActivityCompletion(activity.id)}
                          className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                          title={isCompleted ? 'Mark unvisited' : 'Mark as visited'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                          )}
                        </button>
                        <span className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                          {slotLabel}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-700 font-mono-numbers sm:pl-7">
                        {activity.time}
                      </div>
                      <div className="text-[11px] text-slate-500 sm:pl-7">
                        {activity.duration}
                      </div>
                    </div>

                    {/* Middle: Activity Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {/* Unboxed category label */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                            <CategoryIcon className="w-3.5 h-3.5 text-slate-600" />
                            <span className="capitalize">{activity.category}</span>
                            <span aria-hidden="true">·</span>
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-slate-900 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>{activity.location}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          </div>

                          <h4 className={`text-base font-bold text-slate-950 ${isCompleted ? 'line-through' : ''}`}>
                            {activity.title}
                          </h4>
                        </div>

                        {/* Estimated Cost badge */}
                        <div className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                          {activity.costEstimated > 0 ? `$${activity.costEstimated}` : 'Free'}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Insider Tip Callout */}
                      {activity.insiderTip && (
                        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Insider Tip: </span>
                            <span>{activity.insiderTip}</span>
                          </div>
                        </div>
                      )}

                      {/* Transport to next stop */}
                      {activity.transportToNext && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                          <Navigation className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Next: {activity.transportToNext}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Inline Edit Button */}
                    <div className="shrink-0 flex items-center justify-end">
                      <button
                        onClick={() =>
                          setEditingActivity({
                            activity,
                            slotName,
                            dayNumber: activeDay.dayNumber,
                          })
                        }
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
                        title="Edit activity"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Spotlight Cards Grid: Curated Dining & Lodging */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Dining Recommendation */}
            {activeDay.diningRecommendation && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Curated Dining Pick
                      </h4>
                      <div className="text-[11px] text-slate-500">
                        {activeDay.diningRecommendation.neighborhood}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {activeDay.diningRecommendation.priceRange}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-950">
                    {activeDay.diningRecommendation.name}
                  </h5>
                  <div className="text-xs text-slate-600 font-medium">
                    {activeDay.diningRecommendation.cuisine}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                  <div>
                    <span className="text-slate-500">Recommended Dish: </span>
                    <span className="font-semibold text-slate-800">
                      {activeDay.diningRecommendation.recommendedDish}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Atmosphere: </span>
                    <span className="text-slate-700">
                      {activeDay.diningRecommendation.vibe}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    {activeDay.diningRecommendation.reservationNeeded
                      ? '⚠️ Advance reservation recommended'
                      : '✓ Walk-ins typically accommodated'}
                  </span>
                </div>
              </div>
            )}

            {/* Lodging Spotlight */}
            {activeDay.accommodation && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Hotel className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Recommended Stay
                      </h4>
                      <div className="text-[11px] text-slate-500">
                        {activeDay.accommodation.neighborhood}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-900">
                    ~${activeDay.accommodation.pricePerNightApprox}/night
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-950">
                    {activeDay.accommodation.name}
                  </h5>
                  <div className="text-xs text-slate-600 font-medium">
                    {activeDay.accommodation.type}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg">
                  {activeDay.accommodation.whyRecommended}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  Strategically selected for daily walking distance & morning departures
                </div>
              </div>
            )}

          </div>

          {/* Highlights of the Day */}
          {activeDay.dayHighlights && activeDay.dayHighlights.length > 0 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">
                Key Day Highlights
              </span>
              <div className="flex flex-wrap gap-4">
                {activeDay.dayHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Modals */}
      <RegenerateDayModal
        isOpen={isRegenerateOpen}
        onClose={() => setIsRegenerateOpen(false)}
        trip={trip}
        currentDayNumber={selectedDayNumber}
        onDayRegenerated={handleDayRegenerated}
      />

      <BudgetSplitterModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        trip={trip}
      />

      <LogisticsModal
        isOpen={isLogisticsOpen}
        onClose={() => setIsLogisticsOpen(false)}
        trip={trip}
      />

      <ExportShareModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        trip={trip}
      />

      {editingActivity && (
        <EditActivityModal
          isOpen={Boolean(editingActivity)}
          onClose={() => setEditingActivity(null)}
          activity={editingActivity.activity}
          slotName={editingActivity.slotName}
          dayNumber={editingActivity.dayNumber}
          onSave={handleSaveActivity}
        />
      )}

    </div>
  );
};
