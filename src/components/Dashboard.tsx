import React, { useState } from 'react';
import {
  Compass,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Heart,
  Trash2,
  ExternalLink,
  Users,
  User,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Trip, TravelerType, BudgetLevel } from '../types/trip';
import { ScenarioCards } from './ScenarioCards';

interface DashboardProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  onOpenBuilder: () => void;
  onCustomizeScenario: (scenarioType: 'solo' | 'couple' | 'group') => void;
  onToggleFavorite: (tripId: string) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  trips,
  onSelectTrip,
  onOpenBuilder,
  onCustomizeScenario,
  onToggleFavorite,
  onDeleteTrip,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [travelerFilter, setTravelerFilter] = useState<'all' | TravelerType>('all');
  const [budgetFilter, setBudgetFilter] = useState<'all' | BudgetLevel>('all');

  // Filtered trips
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTraveler =
      travelerFilter === 'all' || trip.travelerType === travelerFilter;

    const matchesBudget =
      budgetFilter === 'all' || trip.budgetLevel === budgetFilter;

    return matchesSearch && matchesTraveler && matchesBudget;
  });

  // KPI calculations
  const totalDays = trips.reduce((acc, t) => acc + t.durationDays, 0);
  const totalBudget = trips.reduce((acc, t) => acc + (t.totalBudgetEstimate || 0), 0);
  const totalActivities = trips.reduce((acc, t) => acc + t.days.length * 3, 0);
  const estimatedHoursSaved = totalDays * 4.5; // ~4.5 hours research automated per day

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Banner with Generated Travel Horizon */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-sm">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_travel_horizon_1793463439803.jpg"
            alt="Travel Horizon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Automated Travel Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Personalized Travel Itineraries Engineered by AI
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            Skip dozens of open tabs. RoamGenius structures customized day-by-day itineraries, optimizes travel logistics, recommends vetted local dining, and balances budgets for solo travelers, couples, and groups.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Itinerary</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('scenarios-anchor');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 cursor-pointer whitespace-nowrap"
            >
              <span>View Example Scenarios</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row (§2.B Tabular Figures) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Active Plans</span>
            <Compass className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-950 font-mono-numbers">
            {trips.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across {trips.length} global destinations
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Days Organized</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-950 font-mono-numbers">
            {totalDays}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {totalActivities} structured activities
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Managed Budget</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-950 font-mono-numbers">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Optimized category tracking
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Research Saved</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono-numbers">
            ~{Math.round(estimatedHoursSaved)} hrs
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Decision fatigue eliminated
          </div>
        </div>
      </div>

      {/* Curated Scenarios Component */}
      <div id="scenarios-anchor">
        <ScenarioCards
          onSelectTrip={onSelectTrip}
          onCustomizeScenario={onCustomizeScenario}
          sampleTrips={trips}
        />
      </div>

      {/* Trips Section Header & Filter Toolbar */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950 tracking-tight">
              Your Itineraries
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review, edit, or regenerate customized schedules
            </p>
          </div>

          {/* Interactive filter controls styled per §1.A */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setTravelerFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                travelerFilter === 'all'
                  ? 'bg-white text-slate-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTravelerFilter('solo')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                travelerFilter === 'solo'
                  ? 'bg-white text-slate-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Solo
            </button>
            <button
              onClick={() => setTravelerFilter('couple')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                travelerFilter === 'couple'
                  ? 'bg-white text-slate-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Couple
            </button>
            <button
              onClick={() => setTravelerFilter('group')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                travelerFilter === 'group'
                  ? 'bg-white text-slate-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Group
            </button>
          </div>
        </div>

        {/* Search Input & Secondary Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by destination (e.g. Kyoto, Amalfi, Iceland, Paris)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value as any)}
              aria-label="Filter itineraries by budget level"
              className="px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            >
              <option value="all">All Budgets</option>
              <option value="budget">Budget-Friendly</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury / Premium</option>
            </select>
          </div>
        </div>

        {/* Trip Cards Grid */}
        {filteredTrips.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <Compass className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No itineraries found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search criteria or create a brand new personalized trip.
            </p>
            <button
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Trip</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => {
              const travelerLabel =
                trip.travelerType === 'solo'
                  ? 'Solo Traveler'
                  : trip.travelerType === 'couple'
                  ? 'Couple Vacation'
                  : `Group of ${trip.groupSize}`;

              return (
                <div
                  key={trip.id}
                  onClick={() => onSelectTrip(trip)}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all hover:shadow-md flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Header Image or Graphic */}
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      {trip.heroImage ? (
                        <img
                          src={trip.heroImage}
                          alt={trip.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white">
                          <MapPin className="w-10 h-10 text-slate-400" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(trip.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                          trip.isFavorite
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-black/30 text-white hover:text-rose-400'
                        }`}
                        title={trip.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart
                          className={`w-4 h-4 ${trip.isFavorite ? 'fill-current' : ''}`}
                        />
                      </button>

                      {/* Destination Overlay */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-amber-300" />
                          <span>{trip.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5">
                      {/* Zero-Pill Unboxed Metadata with separators (§1.A) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono-numbers">
                        <span>{trip.durationDays} Days</span>
                        <span aria-hidden="true">·</span>
                        <span>{travelerLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{trip.budgetLevel}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-950 mb-2 group-hover:text-slate-800 transition-colors line-clamp-1">
                        {trip.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {trip.tagline}
                      </p>

                      {/* Highlights */}
                      <div className="text-xs text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <span>Dates:</span>
                          <span className="font-mono-numbers text-slate-800 font-medium">
                            {trip.startDate} to {trip.endDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Est. Total Budget:</span>
                          <span className="font-mono-numbers text-slate-800 font-medium">
                            ${trip.totalBudgetEstimate?.toLocaleString() || trip.budgetBreakdown.stayEstimatedTotal + trip.budgetBreakdown.diningEstimatedTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                    <span className="text-xs font-semibold text-slate-900 group-hover:underline inline-flex items-center gap-1">
                      <span>Open Itinerary</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete itinerary for "${trip.title}"?`)) {
                          onDeleteTrip(trip.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                      title="Delete trip"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
