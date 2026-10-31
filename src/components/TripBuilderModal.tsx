import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Compass,
  Clock,
  Heart,
  User,
  Coffee,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  TravelerType,
  BudgetLevel,
  TripPace,
  TripGenerationRequest,
  Trip,
} from '../types/trip';
import { generateItineraryAPI } from '../services/api';

interface TripBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripGenerated: (trip: Trip) => void;
  initialScenario?: 'solo' | 'couple' | 'group' | null;
}

const POPULAR_DESTINATIONS = [
  'Kyoto, Japan',
  'Amalfi Coast, Italy',
  'Reykjavik & South Coast, Iceland',
  'Tokyo, Japan',
  'Paris, France',
  'Barcelona, Spain',
  'Swiss Alps, Switzerland',
  'New York City, USA',
  'Banff & Canadian Rockies, Canada',
  'Bali, Indonesia',
];

const AVAILABLE_INTERESTS = [
  'Food & Dining',
  'Sightseeing & Monuments',
  'Culture & History',
  'Nature & Adventure',
  'Hidden Gems & Local Spots',
  'Wellness & Spa',
  'Photography & Scenic',
  'Nightlife & Cocktails',
  'Shopping & Local Markets',
];

export const TripBuilderModal: React.FC<TripBuilderModalProps> = ({
  isOpen,
  onClose,
  onTripGenerated,
  initialScenario,
}) => {
  // Form State
  const [destination, setDestination] = useState(
    initialScenario === 'solo'
      ? 'Kyoto, Japan'
      : initialScenario === 'couple'
      ? 'Amalfi Coast, Italy'
      : initialScenario === 'group'
      ? 'Reykjavik & South Coast, Iceland'
      : 'Kyoto, Japan'
  );

  const [startDate, setStartDate] = useState('2026-11-15');
  const [durationDays, setDurationDays] = useState(
    initialScenario === 'solo' ? 3 : initialScenario === 'couple' ? 5 : 5
  );

  const [travelerType, setTravelerType] = useState<TravelerType>(
    initialScenario || 'solo'
  );

  const [groupSize, setGroupSize] = useState(
    initialScenario === 'solo' ? 1 : initialScenario === 'couple' ? 2 : 5
  );

  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>(
    initialScenario === 'couple' ? 'luxury' : initialScenario === 'solo' ? 'budget' : 'moderate'
  );

  const [totalBudgetEstimate, setTotalBudgetEstimate] = useState<number>(
    initialScenario === 'solo' ? 500 : initialScenario === 'couple' ? 2800 : 4500
  );

  const [pace, setPace] = useState<TripPace>(
    initialScenario === 'couple' ? 'relaxed' : initialScenario === 'group' ? 'fast-paced' : 'balanced'
  );

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialScenario === 'couple'
      ? ['Food & Dining', 'Photography & Scenic', 'Wellness & Spa', 'Hidden Gems & Local Spots']
      : initialScenario === 'group'
      ? ['Nature & Adventure', 'Sightseeing & Monuments', 'Photography & Scenic', 'Food & Dining']
      : ['Food & Dining', 'Sightseeing & Monuments', 'Culture & History', 'Photography & Scenic']
  );

  const [accommodationStyle, setAccommodationStyle] = useState<string>(
    initialScenario === 'couple' ? 'boutique' : initialScenario === 'group' ? 'vacation-rental' : 'hostel-guesthouse'
  );

  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleTravelerTypeChange = (type: TravelerType) => {
    setTravelerType(type);
    if (type === 'solo') {
      setGroupSize(1);
      setBudgetLevel('budget');
      setTotalBudgetEstimate(500);
      setDurationDays(3);
    } else if (type === 'couple') {
      setGroupSize(2);
      setBudgetLevel('luxury');
      setTotalBudgetEstimate(2800);
      setDurationDays(5);
    } else if (type === 'group') {
      setGroupSize(5);
      setBudgetLevel('moderate');
      setTotalBudgetEstimate(4500);
      setDurationDays(5);
      setAccommodationStyle('vacation-rental');
    }
  };

  const calculateEndDate = () => {
    try {
      const d = new Date(startDate);
      d.setDate(d.getDate() + (durationDays - 1));
      return d.toISOString().split('T')[0];
    } catch {
      return startDate;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setErrorMessage('Please provide a destination');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');

    // Progressive stage feedback
    setGenerationStage('Analyzing destination topology and best timing...');
    const stageTimeout1 = setTimeout(() => {
      setGenerationStage('Curating authentic dining, scenic highlights & transit logistics...');
    }, 1400);

    const stageTimeout2 = setTimeout(() => {
      setGenerationStage('Synthesizing day-by-day itinerary and balancing budget breakdown...');
    }, 2800);

    try {
      const payload: TripGenerationRequest = {
        destination,
        startDate,
        endDate: calculateEndDate(),
        durationDays,
        travelerType,
        groupSize,
        budgetLevel,
        totalBudgetEstimate,
        pace,
        interests: selectedInterests,
        accommodationStyle,
        dietaryRestrictions,
        customNotes,
      };

      const newTrip = await generateItineraryAPI(payload);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe if confetti fails
      }

      onTripGenerated(newTrip);
      onClose();
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      clearTimeout(stageTimeout1);
      clearTimeout(stageTimeout2);
      setIsGenerating(false);
      setGenerationStage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950 tracking-tight">
                Smart Trip Builder
              </h2>
              <p className="text-xs text-slate-500">
                AI-driven customized day-by-day travel architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Quick Scenario Pre-sets */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Select Traveler Profile
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleTravelerTypeChange('solo')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  travelerType === 'solo'
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Solo Traveler</span>
                </div>
                <div className="text-[11px] opacity-80">
                  Weekend, flexible walkability & budget
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTravelerTypeChange('couple')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  travelerType === 'couple'
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Romantic Couple</span>
                </div>
                <div className="text-[11px] opacity-80">
                  Relaxed pace, scenic stays & dining
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTravelerTypeChange('group')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  travelerType === 'group'
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>Friends Group</span>
                </div>
                <div className="text-[11px] opacity-80">
                  Coordinated logistics & split costs
                </div>
              </button>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Target Destination
            </label>
            <div className="relative mb-2">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Destination Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 mr-1">Popular:</span>
              {POPULAR_DESTINATIONS.slice(0, 5).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDestination(d)}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    destination === d
                      ? 'bg-slate-900 text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Dates & Duration & Group Size */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Duration (Days)
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value={2}>2 Days (Weekend Express)</option>
                <option value={3}>3 Days (Long Weekend)</option>
                <option value={4}>4 Days (Extended Break)</option>
                <option value={5}>5 Days (Complete Highlights)</option>
                <option value={7}>7 Days (Full Immersion)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Total Travelers
              </label>
              <input
                type="number"
                min={1}
                max={16}
                value={groupSize}
                onChange={(e) => setGroupSize(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>
          </div>

          {/* Budget & Pacing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Budget Tier
              </label>
              <select
                value={budgetLevel}
                onChange={(e) => setBudgetLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value="budget">Budget-Friendly ($)</option>
                <option value="moderate">Balanced Moderate ($$)</option>
                <option value="luxury">Luxury & Premium ($$$)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Target Budget (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                  $
                </span>
                <input
                  type="number"
                  step={50}
                  value={totalBudgetEstimate}
                  onChange={(e) => setTotalBudgetEstimate(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-mono-numbers"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Daily Pacing
              </label>
              <select
                value={pace}
                onChange={(e) => setPace(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value="relaxed">Relaxed (Unhurried Leisure)</option>
                <option value="balanced">Balanced (Optimal Pacing)</option>
                <option value="fast-paced">Fast-Paced (Active & Packed)</option>
              </select>
            </div>
          </div>

          {/* Traveler Interests */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Traveler Interests & Priorities
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accommodation & Special Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Accommodation Style
              </label>
              <select
                value={accommodationStyle}
                onChange={(e) => setAccommodationStyle(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value="boutique">Boutique & Heritage Hotel</option>
                <option value="luxury-resort">Luxury Resort & Terrace Suites</option>
                <option value="central-hotel">Central Modern Hotel</option>
                <option value="vacation-rental">Vacation Rental / Shared Villa</option>
                <option value="hostel-guesthouse">Design Hostel / Guesthouse</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Dietary & Dining Preferences
              </label>
              <input
                type="text"
                placeholder="e.g. Vegetarian, seafood lover, local street food"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Specific Requests or Logistics Constraints
            </label>
            <input
              type="text"
              placeholder="e.g. Arrive via train, avoid steep stair hikes, sunset aperitivo every day"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isGenerating ? (
              <span className="flex items-center gap-2 text-slate-800 font-medium animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-900" />
                <span>{generationStage || 'Synthesizing customized itinerary...'}</span>
              </span>
            ) : (
              <span>Engineered using Gemini Generative AI</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
