import React from 'react';
import { User, Users, Heart, ArrowRight, Clock, DollarSign, MapPin, Sparkles } from 'lucide-react';
import { Trip } from '../types/trip';

interface ScenarioCardsProps {
  onSelectTrip: (trip: Trip) => void;
  onCustomizeScenario: (scenarioType: 'solo' | 'couple' | 'group') => void;
  sampleTrips: Trip[];
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({
  onSelectTrip,
  onCustomizeScenario,
  sampleTrips,
}) => {
  const soloTrip = sampleTrips.find(t => t.id === 'trip-scenario-1-solo-kyoto');
  const coupleTrip = sampleTrips.find(t => t.id === 'trip-scenario-2-couple-amalfi');
  const groupTrip = sampleTrips.find(t => t.id === 'trip-scenario-3-group-iceland');

  const scenarios = [
    {
      type: 'solo' as const,
      badge: 'Scenario 1',
      title: 'Solo Traveler Weekend Getaway',
      subtitle: 'Kyoto Soul & Street Food (3 Days)',
      image: '/src/assets/images/scenario_solo_kyoto_1793463440152.jpg',
      icon: User,
      budget: '$480 Total',
      pace: 'Balanced & Walkable',
      description:
        'A solo traveler wants a short weekend trip but has limited time to research routes. The system generates a balanced itinerary optimizing transit, nearby attractions, and affordable dining spots.',
      benefits: [
        'Optimized morning routes avoiding crowds',
        'Hand-picked solo-friendly counter izakayas',
        'Zero research fatigue; walk-ready schedule'
      ],
      trip: soloTrip,
    },
    {
      type: 'couple' as const,
      badge: 'Scenario 2',
      title: 'Couple Personalized Vacation',
      subtitle: 'Amalfi Coast Romance & Cliffside Charm (5 Days)',
      image: '/src/assets/images/scenario_couple_amalfi_1793463441513.jpg',
      icon: Heart,
      budget: '€2,800 Total',
      pace: 'Relaxed & Scenic',
      description:
        'A couple planning a romantic holiday wants customized experiences rather than tourist traps. The system curates panoramic terraces, candlelit dinners, and private boat charters.',
      benefits: [
        'Curated seaside dining with reservation tips',
        'Unhurried pacing with sunset aperitivo time',
        'Single-day regeneration to fine-tune activities'
      ],
      trip: coupleTrip,
    },
    {
      type: 'group' as const,
      badge: 'Scenario 3',
      title: 'Small Group Multi-Day Expedition',
      subtitle: 'Iceland Ring Road & Glacier Adventure (5 Days)',
      image: '/src/assets/images/scenario_group_iceland_1793463441121.jpg',
      icon: Users,
      budget: '$4,500 ($900/person)',
      pace: 'Fast-Paced Adventure',
      description:
        'A group of 5 friends organizing a holiday faces challenges coordinating schedules and budgets. The platform structures shared SUV routes, group villas, and split expense tracking.',
      benefits: [
        'Centralized group logistics & packing checklist',
        'Automatic per-person expense splitting tool',
        'Harmonizes adventure, scenery, and thermal springs'
      ],
      trip: groupTrip,
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Curated Use Cases
          </span>
          <h2 className="text-2xl font-bold text-slate-950 mt-1 tracking-tight">
            Tailored Scenarios for Every Style of Travel
          </h2>
        </div>
        <p className="text-sm text-slate-600 max-w-md">
          Explore how intelligent prompt engineering optimizes logistics, dining, and budgets for different traveler types.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <div
              key={sc.type}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:border-slate-300 transition-all hover:shadow-md group"
            >
              {/* Image Frame with fallback */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={sc.image}
                  alt={sc.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized container if path fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-slate-900 shadow-xs flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-slate-700" />
                  <span>{sc.badge}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-medium text-slate-200">
                    {sc.subtitle}
                  </div>
                  <h3 className="text-base font-bold leading-tight drop-shadow-xs">
                    {sc.title}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with separators (§1.A Zero-Pill rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 font-mono-numbers">
                    <span>{sc.budget}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sc.pace}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {sc.description}
                  </p>

                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                    {sc.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  {sc.trip && (
                    <button
                      onClick={() => onSelectTrip(sc.trip!)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap active:scale-[0.98]"
                    >
                      <span>Explore Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onCustomizeScenario(sc.type)}
                    className="py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
