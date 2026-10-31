import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility on the server per guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for fallback generation if Gemini API is unavailable or encounters error
function createFallbackItinerary(body: any) {
  const duration = Math.min(Math.max(Number(body.durationDays) || 3, 1), 7);
  const dest = body.destination || 'Selected Destination';
  const traveler = body.travelerType || 'solo';
  const budget = body.budgetLevel || 'moderate';
  const pace = body.pace || 'balanced';
  const groupSize = Number(body.groupSize) || 1;

  const budgetMultiplier = budget === 'luxury' ? 2.5 : budget === 'budget' ? 0.6 : 1.2;
  const baseCostPerDay = 140 * budgetMultiplier * (traveler === 'group' ? Math.max(groupSize * 0.7, 1) : traveler === 'couple' ? 1.7 : 1);

  const days = [];
  const start = new Date(body.startDate || '2026-11-15');

  for (let i = 1; i <= duration; i++) {
    const curDate = new Date(start);
    curDate.setDate(start.getDate() + (i - 1));
    const dateStr = curDate.toISOString().split('T')[0];

    days.push({
      dayNumber: i,
      date: dateStr,
      theme: i === 1 ? `Historic Landmarks & Iconic Welcome in ${dest}` : i === 2 ? `Hidden Gems & Local Culinary Immersion` : i === 3 ? `Scenic Panorama & Cultural Treasures` : `Artisanal Discoveries & Relaxed Sunset Walk`,
      summary: `A carefully paced day tailored for a ${traveler} itinerary balancing top attractions with unhurried dining and local charm.`,
      morning: {
        id: `act-${Date.now()}-${i}-1`,
        title: i === 1 ? `Historic Old Town & Central Plaza Orientation` : i === 2 ? `Morning Market & Fresh Artisan Breakfast` : `Scenic Viewpoint & Heritage Landmark`,
        time: '09:00 AM',
        description: `Explore the foundational history and architecture of ${dest}. Soak in the morning atmosphere before large crowds gather.`,
        location: `${dest} Central Historic Quarter`,
        duration: '2.5 hours',
        category: 'sightseeing',
        costEstimated: budget === 'luxury' ? 30 : 15,
        transportToNext: 'Short 10-15 min stroll or local transit',
        insiderTip: 'Arrive 15 minutes before the main gates open to capture pristine photos with soft morning light.'
      },
      afternoon: {
        id: `act-${Date.now()}-${i}-2`,
        title: i === 1 ? `Curated Cultural Museum or Botanical Sanctuary` : i === 2 ? `Artisanal Craft Workshop & Old Alley Stroll` : `Waterfront Walk & Historic Cloisters`,
        time: '01:30 PM',
        description: `Delve deeper into regional traditions, admiring local craft masters and serene gardens.`,
        location: `${dest} Cultural Arts District`,
        duration: '2.5 hours',
        category: 'culture',
        costEstimated: budget === 'luxury' ? 45 : 20,
        transportToNext: 'Scenic ride via tram/ferry or 12 min walk',
        insiderTip: 'Ask the museum docent or shopkeeper for their personal favorite afternoon tea or coffee spot nearby.'
      },
      evening: {
        id: `act-${Date.now()}-${i}-3`,
        title: `Sunset Golden Hour & Twilight Stroll`,
        time: '06:00 PM',
        description: `Take in the twilight transition as lamps illuminate the historic streets and bustling restaurant promenades.`,
        location: `${dest} Waterfront / Grand Promenade`,
        duration: '2 hours',
        category: 'outdoor',
        costEstimated: 0,
        transportToNext: 'Short walk to dinner reservation',
        insiderTip: 'The terrace or bridge adjacent to the river/harbor offers the prime vantage point for sunset photos.'
      },
      diningRecommendation: {
        name: `Trattoria & Bistro ${dest.split(',')[0]}`,
        cuisine: `Regional Authentic Specialities & Seasonal Produce`,
        priceRange: budget === 'luxury' ? '$$$$' : budget === 'budget' ? '$' : '$$',
        vibe: 'Warm, welcoming atmosphere with passionate chefs and local vintage wines',
        recommendedDish: `Chef's signature seasonal tasting plate with freshly baked regional bread`,
        reservationNeeded: budget !== 'budget',
        neighborhood: 'Historic Old Center'
      },
      accommodation: {
        name: `${dest.split(',')[0]} Heritage Boutique Suites`,
        type: budget === 'luxury' ? 'Boutique Luxury Hotel' : budget === 'budget' ? 'Cozy Central Guesthouse' : 'Design City Hotel',
        neighborhood: 'Historic Center',
        whyRecommended: 'Quiet cobblestone street location within walking distance to key metro lines and evening dining.',
        pricePerNightApprox: Math.round(baseCostPerDay * 0.45)
      },
      dayHighlights: [
        `Morning serenity at ${dest} historic quarter`,
        'Authentic local seasonal tasting experience',
        'Sunset panorama over the landmark skyline'
      ]
    });
  }

  const stayTotal = Math.round(baseCostPerDay * 0.45 * duration);
  const actTotal = Math.round(baseCostPerDay * 0.25 * duration);
  const dineTotal = Math.round(baseCostPerDay * 0.2 * duration);
  const transTotal = Math.round(baseCostPerDay * 0.1 * duration);

  return {
    id: `trip-${Date.now()}`,
    title: `${dest} Curated ${duration}-Day Journey`,
    destination: dest,
    tagline: `An intelligent, balanced ${duration}-day plan engineered for ${traveler} travel with ${pace} pacing and authentic discoveries.`,
    startDate: body.startDate || '2026-11-15',
    endDate: body.endDate || '2026-11-18',
    durationDays: duration,
    travelerType: traveler,
    groupSize: groupSize,
    budgetLevel: budget,
    totalBudgetEstimate: body.totalBudgetEstimate || (stayTotal + actTotal + dineTotal + transTotal),
    pace: pace,
    interests: body.interests || ['Sightseeing', 'Food & Dining', 'Culture'],
    accommodationStyle: body.accommodationStyle || 'boutique',
    dietaryRestrictions: body.dietaryRestrictions || '',
    customNotes: body.customNotes || '',
    bestTimeToVisit: 'Spring and Autumn shoulder seasons offer optimal weather and manageable visitor volumes.',
    packingTips: [
      'Versatile layered clothing suitable for climate shifts',
      'Comfortable broken-in walking shoes for cobblestone streets',
      'Universal power adapter and compact portable charger',
      'Light daypack with RFID blocking pocket for day excursions'
    ],
    localEtiquette: [
      'Learn basic local greetings (Hello, Please, Thank you) in the local language',
      'Check local tipping customs before settling cafe and restaurant bills',
      'Keep conversational volume respectful on public transit'
    ],
    transportationTips: 'Download the city’s official transit app for contactless tap-to-ride subway and bus fares. Walking between adjacent sights is often faster than taxis.',
    budgetBreakdown: {
      stayEstimatedTotal: stayTotal,
      activitiesEstimatedTotal: actTotal,
      diningEstimatedTotal: dineTotal,
      transportEstimatedTotal: transTotal,
      currency: 'USD',
      budgetTip: 'Booking museum admissions online at least 48 hours in advance skips 45-minute queues and often includes combined discounts.'
    },
    days: days,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// 1. Generate Itinerary API
app.post('/api/trips/generate', async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      durationDays,
      travelerType,
      groupSize,
      budgetLevel,
      totalBudgetEstimate,
      pace,
      interests,
      accommodationStyle,
      dietaryRestrictions,
      customNotes,
    } = req.body;

    if (!destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }

    const duration = Math.min(Math.max(Number(durationDays) || 3, 1), 7);
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

    if (!hasApiKey) {
      // Return high-quality structured itinerary
      const fallbackTrip = createFallbackItinerary(req.body);
      return res.json(fallbackTrip);
    }

    const prompt = `
You are a world-class travel architect and concierge. Generate a complete, highly detailed, realistic, and personalized ${duration}-day itinerary for:
- Destination: ${destination}
- Duration: ${duration} days (from ${startDate || '2026-11-15'} to ${endDate || '2026-11-18'})
- Traveler Type: ${travelerType || 'solo'} (Group size: ${groupSize || 1} people)
- Budget Tier: ${budgetLevel || 'moderate'} (Target budget: $${totalBudgetEstimate || 'flexible'})
- Pacing: ${pace || 'balanced'} (relaxed = ample downtime, fast-paced = packed highlights)
- Traveler Interests: ${(interests || ['Sightseeing', 'Food & Dining']).join(', ')}
- Accommodation Preference: ${accommodationStyle || 'boutique'}
- Dietary notes: ${dietaryRestrictions || 'None specified'}
- Custom requirements: ${customNotes || 'None'}

CRITICAL GUIDELINES:
1. Provide REAL, highly rated, specific names of attractions, neighborhoods, streets, and actual restaurants.
2. In the daily schedule, include distinct Morning, Afternoon, and Evening activities with realistic logistics, durations, insider tips, and estimated costs in USD.
3. For dining recommendations, specify the real dish name, vibe, price range, and whether reservations are needed.
4. Provide estimated budget breakdown for accommodations, activities, dining, and transit.
5. Provide actionable packing tips, local etiquette, and transportation navigation hacks.
6. Return the response in strict JSON format matching the schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            tagline: { type: Type.STRING },
            bestTimeToVisit: { type: Type.STRING },
            packingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            localEtiquette: { type: Type.ARRAY, items: { type: Type.STRING } },
            transportationTips: { type: Type.STRING },
            budgetBreakdown: {
              type: Type.OBJECT,
              properties: {
                stayEstimatedTotal: { type: Type.NUMBER },
                activitiesEstimatedTotal: { type: Type.NUMBER },
                diningEstimatedTotal: { type: Type.NUMBER },
                transportEstimatedTotal: { type: Type.NUMBER },
                currency: { type: Type.STRING },
                budgetTip: { type: Type.STRING },
              },
              required: ['stayEstimatedTotal', 'activitiesEstimatedTotal', 'diningEstimatedTotal', 'transportEstimatedTotal', 'currency', 'budgetTip']
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  date: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  morning: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      time: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      category: { type: Type.STRING },
                      costEstimated: { type: Type.NUMBER },
                      transportToNext: { type: Type.STRING },
                      insiderTip: { type: Type.STRING },
                    },
                    required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
                  },
                  afternoon: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      time: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      category: { type: Type.STRING },
                      costEstimated: { type: Type.NUMBER },
                      transportToNext: { type: Type.STRING },
                      insiderTip: { type: Type.STRING },
                    },
                    required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
                  },
                  evening: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      time: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      category: { type: Type.STRING },
                      costEstimated: { type: Type.NUMBER },
                      transportToNext: { type: Type.STRING },
                      insiderTip: { type: Type.STRING },
                    },
                    required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
                  },
                  diningRecommendation: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      cuisine: { type: Type.STRING },
                      priceRange: { type: Type.STRING },
                      vibe: { type: Type.STRING },
                      recommendedDish: { type: Type.STRING },
                      reservationNeeded: { type: Type.BOOLEAN },
                      neighborhood: { type: Type.STRING },
                    },
                    required: ['name', 'cuisine', 'priceRange', 'vibe', 'recommendedDish', 'reservationNeeded', 'neighborhood']
                  },
                  accommodation: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      type: { type: Type.STRING },
                      neighborhood: { type: Type.STRING },
                      whyRecommended: { type: Type.STRING },
                      pricePerNightApprox: { type: Type.NUMBER },
                    },
                    required: ['name', 'type', 'neighborhood', 'whyRecommended', 'pricePerNightApprox']
                  },
                  dayHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['dayNumber', 'date', 'theme', 'summary', 'morning', 'afternoon', 'evening', 'diningRecommendation', 'dayHighlights']
              }
            }
          },
          required: ['title', 'tagline', 'bestTimeToVisit', 'packingTips', 'localEtiquette', 'transportationTips', 'budgetBreakdown', 'days']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');

    // Add generated activity IDs
    if (parsed.days && Array.isArray(parsed.days)) {
      parsed.days = parsed.days.map((day: any, idx: number) => {
        return {
          ...day,
          morning: { ...day.morning, id: `gen-act-${idx}-m-${Date.now()}` },
          afternoon: { ...day.afternoon, id: `gen-act-${idx}-a-${Date.now()}` },
          evening: { ...day.evening, id: `gen-act-${idx}-e-${Date.now()}` },
        };
      });
    }

    const trip = {
      id: `trip-${Date.now()}`,
      destination,
      title: parsed.title || `${destination} Itinerary`,
      tagline: parsed.tagline || `Customized ${duration}-day travel experience in ${destination}.`,
      startDate: startDate || '2026-11-15',
      endDate: endDate || '2026-11-18',
      durationDays: duration,
      travelerType: travelerType || 'solo',
      groupSize: Number(groupSize) || 1,
      budgetLevel: budgetLevel || 'moderate',
      totalBudgetEstimate: totalBudgetEstimate || (parsed.budgetBreakdown?.stayEstimatedTotal + parsed.budgetBreakdown?.activitiesEstimatedTotal + parsed.budgetBreakdown?.diningEstimatedTotal + parsed.budgetBreakdown?.transportEstimatedTotal) || 1200,
      pace: pace || 'balanced',
      interests: interests || [],
      accommodationStyle: accommodationStyle || 'boutique',
      dietaryRestrictions: dietaryRestrictions || '',
      customNotes: customNotes || '',
      bestTimeToVisit: parsed.bestTimeToVisit || 'Spring and Autumn',
      packingTips: parsed.packingTips || [],
      localEtiquette: parsed.localEtiquette || [],
      transportationTips: parsed.transportationTips || '',
      budgetBreakdown: parsed.budgetBreakdown || {
        stayEstimatedTotal: 600,
        activitiesEstimatedTotal: 300,
        diningEstimatedTotal: 350,
        transportEstimatedTotal: 150,
        currency: 'USD',
        budgetTip: 'Pre-book passes for top attractions'
      },
      days: parsed.days || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return res.json(trip);
  } catch (error: any) {
    console.error('Error generating itinerary with Gemini:', error);
    // Graceful fallback so user always gets an actionable response
    const fallbackTrip = createFallbackItinerary(req.body);
    return res.json(fallbackTrip);
  }
});

// 2. Regenerate Single Day API
app.post('/api/trips/regenerate-day', async (req, res) => {
  try {
    const {
      destination,
      travelerType,
      budgetLevel,
      pace,
      interests,
      dayNumber,
      currentDay,
      customPrompt,
    } = req.body;

    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

    if (!hasApiKey) {
      // Mock regeneration
      const revampedDay = {
        ...currentDay,
        theme: `Revamped Day ${dayNumber}: ${customPrompt || 'Tailored Experiences'} in ${destination}`,
        summary: `Refreshed schedule incorporating your adjustment: "${customPrompt || 'Enhanced discovery'}".`,
        morning: {
          ...currentDay.morning,
          title: `Artisanal Morning Discovery in ${destination}`,
          description: `Customized exploration based on your request: ${customPrompt || 'Local highlights and peaceful strolls'}.`,
        },
        afternoon: {
          ...currentDay.afternoon,
          title: `Curated Activity & Leisure Experience`,
          description: `Enjoy an unhurried, tailor-made experience aligned with ${customPrompt || 'your interests'}.`,
        },
        evening: {
          ...currentDay.evening,
          title: `Evening Highlight & Sunset View`,
          description: `Wind down with picturesque twilight views and memorable local hospitality.`,
        },
        diningRecommendation: {
          ...currentDay.diningRecommendation,
          name: `Boutique Osteria / Bistro ${destination.split(',')[0]}`,
          recommendedDish: `Chef's special seasonal plate customized for ${travelerType} travelers`,
          vibe: 'Inviting, intimate setting with excellent wine pairings',
        }
      };
      return res.json(revampedDay);
    }

    const prompt = `
You are an expert travel planner. Regenerate Day ${dayNumber} of an itinerary for ${destination}.
Traveler context:
- Traveler Type: ${travelerType || 'solo'}
- Budget Level: ${budgetLevel || 'moderate'}
- Pace: ${pace || 'balanced'}
- Interests: ${(interests || []).join(', ')}
- Current Day Date: ${currentDay?.date || 'Day ' + dayNumber}
- Specific user adjustment request: "${customPrompt}"

Provide a fresh, exciting, logistically coherent plan for this day with Morning, Afternoon, Evening, a Dining Recommendation, and Day Highlights. Return in strict JSON matching the schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dayNumber: { type: Type.INTEGER },
            date: { type: Type.STRING },
            theme: { type: Type.STRING },
            summary: { type: Type.STRING },
            morning: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                description: { type: Type.STRING },
                location: { type: Type.STRING },
                duration: { type: Type.STRING },
                category: { type: Type.STRING },
                costEstimated: { type: Type.NUMBER },
                transportToNext: { type: Type.STRING },
                insiderTip: { type: Type.STRING },
              },
              required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
            },
            afternoon: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                description: { type: Type.STRING },
                location: { type: Type.STRING },
                duration: { type: Type.STRING },
                category: { type: Type.STRING },
                costEstimated: { type: Type.NUMBER },
                transportToNext: { type: Type.STRING },
                insiderTip: { type: Type.STRING },
              },
              required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
            },
            evening: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                description: { type: Type.STRING },
                location: { type: Type.STRING },
                duration: { type: Type.STRING },
                category: { type: Type.STRING },
                costEstimated: { type: Type.NUMBER },
                transportToNext: { type: Type.STRING },
                insiderTip: { type: Type.STRING },
              },
              required: ['title', 'time', 'description', 'location', 'duration', 'category', 'costEstimated', 'transportToNext', 'insiderTip']
            },
            diningRecommendation: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                cuisine: { type: Type.STRING },
                priceRange: { type: Type.STRING },
                vibe: { type: Type.STRING },
                recommendedDish: { type: Type.STRING },
                reservationNeeded: { type: Type.BOOLEAN },
                neighborhood: { type: Type.STRING },
              },
              required: ['name', 'cuisine', 'priceRange', 'vibe', 'recommendedDish', 'reservationNeeded', 'neighborhood']
            },
            dayHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['dayNumber', 'date', 'theme', 'summary', 'morning', 'afternoon', 'evening', 'diningRecommendation', 'dayHighlights']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    const updatedDay = {
      ...parsed,
      dayNumber: Number(dayNumber),
      date: currentDay?.date || new Date().toISOString().split('T')[0],
      morning: { ...parsed.morning, id: `regen-act-m-${Date.now()}` },
      afternoon: { ...parsed.afternoon, id: `regen-act-a-${Date.now()}` },
      evening: { ...parsed.evening, id: `regen-act-e-${Date.now()}` },
      accommodation: currentDay?.accommodation,
    };

    return res.json(updatedDay);
  } catch (error: any) {
    console.error('Error regenerating day with Gemini:', error);
    return res.status(500).json({ error: 'Failed to regenerate day', message: error.message });
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Travel Itinerary Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
