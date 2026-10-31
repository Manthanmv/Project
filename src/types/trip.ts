export type TravelerType = 'solo' | 'couple' | 'family' | 'group';
export type BudgetLevel = 'budget' | 'moderate' | 'luxury';
export type TripPace = 'relaxed' | 'balanced' | 'fast-paced';
export type ActivityCategory = 'sightseeing' | 'culture' | 'outdoor' | 'adventure' | 'wellness' | 'shopping' | 'food' | 'photography';

export interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
  location: string;
  duration: string;
  category: ActivityCategory;
  costEstimated: number;
  transportToNext: string;
  insiderTip: string;
  completed?: boolean;
}

export interface DiningRecommendation {
  name: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  vibe: string;
  recommendedDish: string;
  reservationNeeded: boolean;
  neighborhood: string;
  notes?: string;
}

export interface AccommodationRecommendation {
  name: string;
  type: string;
  neighborhood: string;
  whyRecommended: string;
  pricePerNightApprox: number;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  summary: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  diningRecommendation: DiningRecommendation;
  accommodation?: AccommodationRecommendation;
  dayHighlights: string[];
}

export interface BudgetBreakdown {
  stayEstimatedTotal: number;
  activitiesEstimatedTotal: number;
  diningEstimatedTotal: number;
  transportEstimatedTotal: number;
  currency: string;
  budgetTip: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  heroImage?: string;
  tagline: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelerType: TravelerType;
  groupSize: number;
  budgetLevel: BudgetLevel;
  totalBudgetEstimate: number;
  pace: TripPace;
  interests: string[];
  accommodationStyle: string;
  dietaryRestrictions?: string;
  customNotes?: string;
  bestTimeToVisit: string;
  packingTips: string[];
  localEtiquette: string[];
  transportationTips: string;
  budgetBreakdown: BudgetBreakdown;
  days: DayPlan[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface TripGenerationRequest {
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelerType: TravelerType;
  groupSize: number;
  budgetLevel: BudgetLevel;
  totalBudgetEstimate?: number;
  pace: TripPace;
  interests: string[];
  accommodationStyle: string;
  dietaryRestrictions?: string;
  customNotes?: string;
}

export interface RegenerateDayRequest {
  tripId: string;
  dayNumber: number;
  destination: string;
  travelerType: TravelerType;
  budgetLevel: BudgetLevel;
  pace: TripPace;
  interests: string[];
  currentDay: DayPlan;
  customPrompt: string;
}
