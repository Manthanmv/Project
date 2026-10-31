import React, { useState, useEffect } from 'react';
import { Trip } from './types/trip';
import {
  getStoredTrips,
  saveTrip,
  deleteTrip,
  toggleFavoriteTrip,
} from './services/api';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ScenarioCards } from './components/ScenarioCards';
import { ItineraryView } from './components/ItineraryView';
import { TripBuilderModal } from './components/TripBuilderModal';
import { Compass, Heart, Trash2, ChevronRight, Plus, MapPin } from 'lucide-react';

export default function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trips' | 'scenarios' | 'itinerary'>('dashboard');

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderScenario, setBuilderScenario] = useState<'solo' | 'couple' | 'group' | null>(null);

  // Initialize trips on mount
  useEffect(() => {
    const loaded = getStoredTrips();
    setTrips(loaded);
  }, []);

  const handleSelectTrip = (trip: Trip) => {
    setActiveTrip(trip);
    setActiveTab('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setActiveTrip(null);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBuilder = (scenario?: 'solo' | 'couple' | 'group') => {
    setBuilderScenario(scenario || null);
    setIsBuilderOpen(true);
  };

  const handleTripGenerated = (newTrip: Trip) => {
    const updated = saveTrip(newTrip);
    setTrips(updated);
    setActiveTrip(newTrip);
    setActiveTab('itinerary');
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    const updated = saveTrip(updatedTrip);
    setTrips(updated);
    setActiveTrip(updatedTrip);
  };

  const handleToggleFavorite = (tripId: string) => {
    const updated = toggleFavoriteTrip(tripId);
    setTrips(updated);
    if (activeTrip && activeTrip.id === tripId) {
      setActiveTrip(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    const updated = deleteTrip(tripId);
    setTrips(updated);
    if (activeTrip && activeTrip.id === tripId) {
      setActiveTrip(null);
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Bar Navigation Contract (§2) */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setActiveTrip(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBuilder={() => handleOpenBuilder()}
        savedCount={trips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'itinerary' && activeTrip ? (
          <ItineraryView
            trip={activeTrip}
            onBack={handleBackToDashboard}
            onUpdateTrip={handleUpdateTrip}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === 'scenarios' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ScenarioCards
              sampleTrips={trips}
              onSelectTrip={handleSelectTrip}
              onCustomizeScenario={(sc) => handleOpenBuilder(sc)}
            />
          </div>
        ) : activeTab === 'trips' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-bold text-slate-950">
                  Saved Trips & Itineraries
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Manage all customized travel plans ({trips.length} itineraries stored)
                </p>
              </div>

              <button
                onClick={() => handleOpenBuilder()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Trip</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => handleSelectTrip(trip)}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-slate-100 relative overflow-hidden">
                      {trip.heroImage ? (
                        <img
                          src={trip.heroImage}
                          alt={trip.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
                          <MapPin className="w-8 h-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                        {trip.destination}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-numbers">
                        <span>{trip.durationDays} Days</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{trip.travelerType}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{trip.budgetLevel}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 line-clamp-1 group-hover:text-slate-800">
                        {trip.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {trip.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 group-hover:underline flex items-center gap-1">
                      <span>View Days</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(trip.id);
                        }}
                        className={`p-1.5 rounded transition-colors ${
                          trip.isFavorite
                            ? 'text-rose-600'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${trip.isFavorite ? 'fill-current' : ''}`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete trip "${trip.title}"?`)) {
                            handleDeleteTrip(trip.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Dashboard
            trips={trips}
            onSelectTrip={handleSelectTrip}
            onOpenBuilder={() => handleOpenBuilder()}
            onCustomizeScenario={(sc) => handleOpenBuilder(sc)}
            onToggleFavorite={handleToggleFavorite}
            onDeleteTrip={handleDeleteTrip}
          />
        )}
      </main>

      {/* Subtle Site Footer (§1.B no fake telemetry engines) */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">RoamGenius</span>
            <span>· Intelligent Travel Architecture</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Powered by Gemini 3.8 Generative AI</span>
            <span>·</span>
            <span>Solo · Couple · Group Logistics</span>
          </div>
        </div>
      </footer>

      {/* Smart Trip Builder Modal */}
      <TripBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onTripGenerated={handleTripGenerated}
        initialScenario={builderScenario}
      />

    </div>
  );
}
