import { Trip, TripGenerationRequest, RegenerateDayRequest, DayPlan } from '../types/trip';
import { SAMPLE_TRIPS } from '../data/sampleTrips';

const STORAGE_KEY = 'roamgenius_saved_trips_v1';

export function getStoredTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample trips
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TRIPS));
      return SAMPLE_TRIPS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_TRIPS;
  } catch (e) {
    console.error('Failed to read stored trips:', e);
    return SAMPLE_TRIPS;
  }
}

export function saveTrip(trip: Trip): Trip[] {
  const current = getStoredTrips();
  const index = current.findIndex(t => t.id === trip.id);
  let updated: Trip[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...trip, updatedAt: new Date().toISOString() };
  } else {
    updated = [{ ...trip, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save trip to localStorage:', e);
  }
  return updated;
}

export function deleteTrip(tripId: string): Trip[] {
  const current = getStoredTrips();
  const updated = current.filter(t => t.id !== tripId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete trip from localStorage:', e);
  }
  return updated;
}

export function toggleFavoriteTrip(tripId: string): Trip[] {
  const current = getStoredTrips();
  const updated = current.map(t => t.id === tripId ? { ...t, isFavorite: !t.isFavorite } : t);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to toggle favorite:', e);
  }
  return updated;
}

export async function generateItineraryAPI(req: TripGenerationRequest): Promise<Trip> {
  const response = await fetch('/api/trips/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate itinerary: ${response.statusText}`);
  }

  const trip: Trip = await response.json();
  return trip;
}

export async function regenerateDayAPI(req: RegenerateDayRequest): Promise<DayPlan> {
  const response = await fetch('/api/trips/regenerate-day', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error(`Failed to regenerate day: ${response.statusText}`);
  }

  const updatedDay: DayPlan = await response.json();
  return updatedDay;
}
