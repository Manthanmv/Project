import { Trip } from '../types/trip';

export const SAMPLE_TRIPS: Trip[] = [
  {
    id: 'trip-scenario-1-solo-kyoto',
    title: 'Kyoto Soul & Street Food Getaway',
    destination: 'Kyoto, Japan',
    heroImage: '/src/assets/images/scenario_solo_kyoto_1793463440152.jpg',
    tagline: 'A seamless, contemplative solo weekend blending ancient zen sanctums with vibrant night markets and hidden ramen counters.',
    startDate: '2026-11-13',
    endDate: '2026-11-15',
    durationDays: 3,
    travelerType: 'solo',
    groupSize: 1,
    budgetLevel: 'budget',
    totalBudgetEstimate: 480,
    pace: 'balanced',
    interests: ['Food & Dining', 'Sightseeing', 'Culture & History', 'Photography'],
    accommodationStyle: 'hostel-guesthouse',
    dietaryRestrictions: 'Loves ramen and matcha, open to street food',
    customNotes: 'Avoid early rush hours, optimize for solo walkability and pocket-friendly dining.',
    bestTimeToVisit: 'Mid October to late November for vibrant autumn momiji leaves and mild weather.',
    packingTips: [
      'Comfortable slip-on walking shoes (frequent temple shoe removals)',
      'Coin purse for temple coin boxes and street market stalls',
      'Portable rechargeable battery bank for navigation',
      'Compact folding umbrella for sudden twilight drizzles'
    ],
    localEtiquette: [
      'Walk quietly on the left side of narrow residential machiya streets',
      'Do not eat while walking in public; stand near the stall where purchased',
      'No photography in private geisha alleys of Gion where posted'
    ],
    transportationTips: 'Purchase an IC card (ICOCA/Suica) or the Kyoto Municipal Subway & Bus 1-Day Pass (¥1,100). The Keihan line is quickest for Fushimi Inari and Gion.',
    budgetBreakdown: {
      stayEstimatedTotal: 150,
      activitiesEstimatedTotal: 55,
      diningEstimatedTotal: 185,
      transportEstimatedTotal: 90,
      currency: 'USD',
      budgetTip: 'Eating lunch set menus (Teishoku) rather than dinner sets saves 40% on identical Michelin-grade seasonal dishes.'
    },
    days: [
      {
        dayNumber: 1,
        date: '2026-11-13',
        theme: 'Arashiyama Bamboo & River Strolls',
        summary: 'Morning serenity through towering bamboo groves followed by matcha sweets alongside the Oi River and evening izakaya dining.',
        morning: {
          id: 'act-1-1',
          title: 'Dawn Arrival at Arashiyama Bamboo Grove',
          time: '07:30 AM',
          description: 'Experience the world-renowned bamboo paths before tour groups arrive. Listen to the haunting sound of swaying green stalks recognized as one of Japan’s 100 Soundscapes.',
          location: 'Arashiyama, Ukyo Ward',
          duration: '1.5 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: '10 min scenic walk south past Tenryu-ji gardens',
          insiderTip: 'Arrive before 08:00 AM. Enter via the northern trail from Saga-Arashiyama Station for completely uncrowded photo lines.'
        },
        afternoon: {
          id: 'act-1-2',
          title: 'Tenryu-ji Sogenchi Garden & River Matcha',
          time: '12:30 PM',
          description: 'Marvel at Muso Soseki’s 14th-century pond garden framed by Mount Arashiyama, then enjoy freshly whisked ceremonial Uji matcha alongside the riverbank.',
          location: 'Tenryu-ji Temple',
          duration: '2 hours',
          category: 'culture',
          costEstimated: 12,
          transportToNext: 'Hankyu railway back toward Central Kyoto (22 mins)',
          insiderTip: 'Sit on the tatami veranda of the main Hojo hall to absorb the reflection of changing pine needles in the pond.'
        },
        evening: {
          id: 'act-1-3',
          title: 'Pontocho Alley & Kamo River Night Walk',
          time: '06:30 PM',
          description: 'Stroll down Kyoto’s most atmospheric lantern-lit stone lane alongside the Kamo River. Peer into tiny cedar-paneled bars and counter izakayas.',
          location: 'Pontocho Alley, Nakagyo Ward',
          duration: '2.5 hours',
          category: 'food',
          costEstimated: 25,
          transportToNext: 'Short 8-min walk to hotel',
          insiderTip: 'Look for bars with noren curtains drawn halfway; solo diners are readily welcomed at counter seats.'
        },
        diningRecommendation: {
          name: 'Menbaka Fire Ramen / Kyoto Gyoza Hohei',
          cuisine: 'Authentic Kyoto Ramen & Crispy Ginger Gyoza',
          priceRange: '$',
          vibe: 'High-energy, cozy counter seating perfect for solo travelers',
          recommendedDish: 'Ginger Gyoza with scallion miso dipping sauce',
          reservationNeeded: false,
          neighborhood: 'Gion / Kawaramachi'
        },
        accommodation: {
          name: 'The Pocket Hotel Kyoto Shijo Karasuma',
          type: 'Design Compact Hotel / Private Micro-Room',
          neighborhood: 'Downtown Karasuma',
          whyRecommended: 'Immaculately clean private cubicle rooms with digital key access, steps from the subway and Nishiki Market.',
          pricePerNightApprox: 50
        },
        dayHighlights: ['Zero-crowd bamboo photography', '14th-century pond reflection', 'Atmospheric lantern alley walk']
      },
      {
        dayNumber: 2,
        date: '2026-11-14',
        theme: 'Vermilion Shrines & Nishiki Market Bites',
        summary: 'Climb the iconic 10,000 torii gates of Fushimi Inari at dawn, followed by grazing Kyoto’s 400-year-old culinary heart.',
        morning: {
          id: 'act-2-1',
          title: 'Fushimi Inari-Taisha Sacred Mountain Loop',
          time: '07:00 AM',
          description: 'Walk through endless tunnels of vibrant orange torii gates dedicated to Inari, the Shinto deity of harvests and prosperity.',
          location: 'Fushimi Ward, Kyoto',
          duration: '2.5 hours',
          category: 'sightseeing',
          costEstimated: 0,
          transportToNext: 'Keihan Main Line train from Fushimi-Inari to Gion-Shijo (12 mins)',
          insiderTip: 'Continue past the crowded Yotsutsuji intersection up toward the mountain summit for quiet, mossy fox shrines.'
        },
        afternoon: {
          id: 'act-2-2',
          title: 'Nishiki Market "Kyoto’s Kitchen" Food Safari',
          time: '12:00 PM',
          description: 'Explore the narrow covered five-block arcade with over 130 food vendors offering charcoal-grilled tako tamago, dashi tamagoyaki, and sesame mochi.',
          location: 'Nishiki Market, Nakagyo',
          duration: '2 hours',
          category: 'food',
          costEstimated: 20,
          transportToNext: '15 min walk to Kennin-ji Zen Temple',
          insiderTip: 'Try the freshly pressed soy milk donuts at Konnamonja near the market entrance.'
        },
        evening: {
          id: 'act-2-3',
          title: 'Kennin-ji Zen Gardens & Twilight Gion Stroll',
          time: '05:00 PM',
          description: 'Rest quietly in Kyoto’s oldest Zen temple admiring the dramatic Twin Dragons ceiling painting and the calm Circle-Triangle-Square moss garden.',
          location: 'Gion District',
          duration: '2 hours',
          category: 'culture',
          costEstimated: 6,
          transportToNext: 'Short walk to dinner',
          insiderTip: 'Evening dusk (17:30) is the magic hour when paper lanterns in Hanamikoji light up against deep blue skies.'
        },
        diningRecommendation: {
          name: 'Chao Chao Sanjo Gyozaten',
          cuisine: 'Crispy Pan-Fried Dumplings & Draft Suntory',
          priceRange: '$',
          vibe: 'Friendly, fast-moving counter seating with lively staff',
          recommendedDish: 'Signature Pork and Shiso Dumpling combo platter',
          reservationNeeded: false,
          neighborhood: 'Sanjo Dori'
        },
        accommodation: {
          name: 'The Pocket Hotel Kyoto Shijo Karasuma',
          type: 'Design Compact Hotel / Private Micro-Room',
          neighborhood: 'Downtown Karasuma',
          whyRecommended: 'Super central, walkable to both river and food arcade.',
          pricePerNightApprox: 50
        },
        dayHighlights: ['Torii tunnels without tourists', 'Tasting fresh dashi omelet skewers', 'Twin Dragons ceiling mural']
      },
      {
        dayNumber: 3,
        date: '2026-11-15',
        theme: 'Philosopher’s Path & Higashiyama Souvenirs',
        summary: 'A peaceful canal walk lined with stone bridges and artisanal craft shops, wrapping up with sweeping panoramic views from Kiyomizu-dera.',
        morning: {
          id: 'act-3-1',
          title: 'Tetsugaku-no-Michi (The Philosopher’s Walk)',
          time: '08:30 AM',
          description: 'Follow the peaceful stone path alongside a gentle cherry-tree-lined canal where philosopher Nishida Kitaro practiced walking meditation.',
          location: 'Sakyo Ward, Kyoto',
          duration: '1.5 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: 'Bus #100 or 15-min walk south toward Nanzen-ji',
          insiderTip: 'Stop at the tiny independent pottery workshops along the side alleyways for authentic hand-thrown tea cups.'
        },
        afternoon: {
          id: 'act-3-2',
          title: 'Nanzen-ji Aqueduct & Kiyomizu Wooden Stage',
          time: '12:00 PM',
          description: 'Inspect the Roman-style brick Suirokaku aqueduct tucked behind a Buddhist temple, then ascend to Kiyomizu-dera’s massive cedar stage built without nails.',
          location: 'Higashiyama Ward',
          duration: '3 hours',
          category: 'sightseeing',
          costEstimated: 8,
          transportToNext: 'Walk down Ninenzaka and Sannenzaka historic slopes',
          insiderTip: 'Drink from the Otowa Waterfall streams below the temple stage using the long-handled cups for health and study fortune.'
        },
        evening: {
          id: 'act-3-3',
          title: 'Farewell Depachika Bento & Bullet Train Departure',
          time: '05:30 PM',
          description: 'Browse the legendary subterranean food hall (Depachika) of JR Kyoto Isetan. Curate a gourmet bento box with seasonal pickles and roasted wagyu for your onward journey.',
          location: 'Kyoto Station',
          duration: '1.5 hours',
          category: 'food',
          costEstimated: 22,
          transportToNext: 'Shinkansen platform',
          insiderTip: 'The 11th floor sky garden at Kyoto Station offers a magnificent free twilight panorama over Kyoto Tower.'
        },
        diningRecommendation: {
          name: 'Katsukura Tonkatsu Kyoto Station',
          cuisine: 'Heritage Kurobuta Pork Cutlet with freshly ground sesame',
          priceRange: '$$',
          vibe: 'Modern cedar wood dining room overlooking station atrium',
          recommendedDish: 'Berkshire Pork Loin Katsu with shredded yuzu cabbage',
          reservationNeeded: false,
          neighborhood: 'JR Kyoto Station The Cube 11F'
        },
        accommodation: {
          name: 'The Pocket Hotel Kyoto Shijo Karasuma',
          type: 'Design Compact Hotel',
          neighborhood: 'Downtown Karasuma',
          whyRecommended: 'Luggage storage available all afternoon after check-out.',
          pricePerNightApprox: 50
        },
        dayHighlights: ['Stone path canal contemplation', 'Nanzen-ji brick aqueduct', 'Sky Garden sunset over Kyoto Tower']
      }
    ],
    createdAt: '2026-10-30T10:00:00Z',
    updatedAt: '2026-10-30T10:00:00Z',
    isFavorite: true
  },
  {
    id: 'trip-scenario-2-couple-amalfi',
    title: 'Amalfi Coast Romance & Cliffside Charm',
    destination: 'Amalfi Coast, Italy',
    heroImage: '/src/assets/images/scenario_couple_amalfi_1793463441513.jpg',
    tagline: 'An intimate, slow-paced Mediterranean escape featuring pastel cliffside towns, private terrace wine tastings, and scenic sunset boat cruises.',
    startDate: '2026-05-18',
    endDate: '2026-05-22',
    durationDays: 5,
    travelerType: 'couple',
    groupSize: 2,
    budgetLevel: 'luxury',
    totalBudgetEstimate: 2800,
    pace: 'relaxed',
    interests: ['Sightseeing', 'Food & Dining', 'Photography', 'Wellness & Relaxation', 'Hidden Gems'],
    accommodationStyle: 'boutique',
    dietaryRestrictions: 'Fresh seafood lovers, fine wine appreciation',
    customNotes: 'Keep days unhurried with time for seaside aperitivos and scenic balcony relaxation.',
    bestTimeToVisit: 'May to June when wildflowers bloom across the Lattari Mountains and Mediterranean waters warm up without August crowds.',
    packingTips: [
      'Linen shirts and flowing resort dresses',
      'Non-slip leather sandals or espadrilles for steep cobblestone stairs',
      'Wide-brim straw hat and polarized sunglasses',
      'Light cashmere sweater for breezy coastal evenings'
    ],
    localEtiquette: [
      'Greet shopkeepers and hosts with a warm "Buongiorno" or "Buonasera"',
      'Aperitivo is enjoyed slowly between 18:30 and 20:30 before dinner',
      'Cover shoulders and knees when visiting historic cathedrals'
    ],
    transportationTips: 'Travel between Positano, Amalfi, and Capri by public ferry (Travelmar / Caremar) to avoid winding cliffside road traffic and enjoy stunning seaside views.',
    budgetBreakdown: {
      stayEstimatedTotal: 1450,
      activitiesEstimatedTotal: 480,
      diningEstimatedTotal: 650,
      transportEstimatedTotal: 220,
      currency: 'EUR',
      budgetTip: 'Book ferry tickets in advance via the Travelmar app to bypass ticket window lines at Positano dock.'
    },
    days: [
      {
        dayNumber: 1,
        date: '2026-05-18',
        theme: 'Positano Pastel Vistas & Limoncello Welcome',
        summary: 'Arrival in Positano, checking into a boutique cliffside terrace, and an unhurried sunset aperitivo overlooking the cascading pastel villas.',
        morning: {
          id: 'act-amalfi-1-1',
          title: 'Arrival in Positano & Cliffside Check-in',
          time: '11:00 AM',
          description: 'Arrive via scenic private water taxi or ferry into Positano harbour. Porters deliver luggage up the stone walkways while you sip chilled lemon granita.',
          location: 'Positano Pier, Amalfi Coast',
          duration: '2 hours',
          category: 'sightseeing',
          costEstimated: 60,
          transportToNext: 'Short uphill walk through bougainvillea arches',
          insiderTip: 'Hire the official luggage porter at the pier (¥15/bag) — your knees will thank you climbing the cliffside stairs.'
        },
        afternoon: {
          id: 'act-amalfi-1-2',
          title: 'Spiaggia Grande Stroll & Artisanal Linen Boutiques',
          time: '03:00 PM',
          description: 'Wander hand-in-hand past custom handmade leather sandal workshops and boutique ceramics painted with famous Sorrento lemons.',
          location: 'Via dei Mulini, Positano',
          duration: '2.5 hours',
          category: 'shopping',
          costEstimated: 80,
          transportToNext: 'Walk to cliffside terrace',
          insiderTip: 'Get custom sandals crafted on the spot in 20 minutes at Safari Sandali on Via della Tartana.'
        },
        evening: {
          id: 'act-amalfi-1-3',
          title: 'Sunset Aperitivo on Franco’s Bar Terrace',
          time: '07:00 PM',
          description: 'Savor Campari Spritz cocktails and delicate Italian olives as twilight turns Positano into a fairy tale of twinkling golden lights.',
          location: 'Franco’s Bar / Le Sirenuse',
          duration: '2.5 hours',
          category: 'food',
          costEstimated: 70,
          transportToNext: 'Short walk to dinner',
          insiderTip: 'Franco’s opens at 17:30 and takes no reservations; arrive 15 minutes before opening for front-row terrace railing seats.'
        },
        diningRecommendation: {
          name: 'Ristorante La Sponda',
          cuisine: 'Michelin-starred Campania Coastal Seafood & Handmade Scialatielli',
          priceRange: '$$$$',
          vibe: 'Enchanted dining room illuminated by 400 candles with live acoustic mandolin serenades',
          recommendedDish: 'Scialatielli with baby clams, zucchini flowers, and Amalfi lemon zest',
          reservationNeeded: true,
          neighborhood: 'Central Positano'
        },
        accommodation: {
          name: 'Villa Boheme Exclusive Luxury Suites',
          type: 'Romantic Cliffside Boutique Suites',
          neighborhood: 'Positano Heights',
          whyRecommended: 'Private jacuzzis on sprawling bougainvillea terraces with unobstructed panoramic sea views.',
          pricePerNightApprox: 380
        },
        dayHighlights: ['Arrival by turquoise sea', 'Custom handmade leather sandals', 'Sunset cocktails at Franco’s Bar']
      },
      {
        dayNumber: 2,
        date: '2026-05-19',
        theme: 'Ravello Gardens & Villa Cimbrone Infinity View',
        summary: 'Ascend to the hilltop sanctuary of Ravello for serene cloisters, classical garden statues, and the famous Terrace of Infinity.',
        morning: {
          id: 'act-amalfi-2-1',
          title: 'Scenic Drive to Hilltop Ravello',
          time: '09:30 AM',
          description: 'Ascend winding coastal roads past lemon groves terraced into vertical rock faces, arriving at the tranquil musical town of Ravello.',
          location: 'Ravello, Salerno',
          duration: '1.5 hours',
          category: 'sightseeing',
          costEstimated: 45,
          transportToNext: 'Walk through pedestrian Piazza Vescovado',
          insiderTip: 'Sit on the right side of the vehicle during the drive up from Amalfi for jaw-dropping coastal gorge panoramas.'
        },
        afternoon: {
          id: 'act-amalfi-2-2',
          title: 'Villa Rufolo & Villa Cimbrone Terrace of Infinity',
          time: '12:30 PM',
          description: 'Stand at the Terrazza dell’Infinito, where marble Roman busts overlook the boundless Mediterranean blue horizon 1,200 feet above the sea.',
          location: 'Villa Cimbrone Gardens, Ravello',
          duration: '3 hours',
          category: 'culture',
          costEstimated: 24,
          transportToNext: 'Stroll down toward Villa Maria pergola',
          insiderTip: 'Pack a small sketchbook or camera with a polarizing filter; the contrast between antique white marble and azure sea is extraordinary.'
        },
        evening: {
          id: 'act-amalfi-2-3',
          title: 'Pergola Dining & Limoncello Tasting',
          time: '07:30 PM',
          description: 'Dine under shaded lemon pergolas in an organic kitchen garden restaurant overlooking Ravello’s terraced valleys.',
          location: 'Ristorante Villa Maria',
          duration: '2.5 hours',
          category: 'food',
          costEstimated: 120,
          transportToNext: 'Private evening return transfer to Positano',
          insiderTip: 'Ask the sommelier for a glass of Costa d’Amalfi Furore Bianco, made from rare local Biancolella and Fenile grapes.'
        },
        diningRecommendation: {
          name: 'Ristorante Villa Maria',
          cuisine: 'Terrace Farm-to-Table Southern Italian & Organic Pasta',
          priceRange: '$$$',
          vibe: 'Secluded romantic pergola with fragrant wisteria and candlelight',
          recommendedDish: 'Handmade ravioli stuffed with buffalo ricotta and fresh lemon cream',
          reservationNeeded: true,
          neighborhood: 'Ravello Center'
        },
        accommodation: {
          name: 'Villa Boheme Exclusive Luxury Suites',
          type: 'Romantic Cliffside Boutique Suites',
          neighborhood: 'Positano Heights',
          whyRecommended: 'Spacious marble bathroom and private breakfast on your sunlit terrace.',
          pricePerNightApprox: 380
        },
        dayHighlights: ['Terrace of Infinity Roman busts', 'Fragrant lemon pergola lunch', 'Ravello peaceful classical vibe']
      },
      {
        dayNumber: 3,
        date: '2026-05-20',
        theme: 'Private Sunset Wooden Gozzo Boat to Capri Grottos',
        summary: 'Charter a classic Italian wooden gozzo boat for an afternoon sailing around Capri’s Faraglioni rock formations and secluded emerald lagoons.',
        morning: {
          id: 'act-amalfi-3-1',
          title: 'Late Morning Balcony Breakfast & Espresso',
          time: '10:00 AM',
          description: 'Wake up naturally to church bells and enjoy warm sfogliatella pastries, freshly squeezed blood orange juice, and cappuccino on your private terrace.',
          location: 'Hotel Balcony, Positano',
          duration: '1.5 hours',
          category: 'wellness',
          costEstimated: 0,
          transportToNext: 'Slow walk down to Positano pier',
          insiderTip: 'Take your time; Amalfi mornings are meant for watching passing sailing yachts in no rush.'
        },
        afternoon: {
          id: 'act-amalfi-3-2',
          title: 'Private Wooden Gozzo Charter to Faraglioni Rocks',
          time: '01:30 PM',
          description: 'Board a traditional mahogany gozzo boat skippered by a local captain. Swim in private crystalline coves and sail right through the natural arch of the Faraglioni.',
          location: 'Capri & Li Galli archipelago',
          duration: '4.5 hours',
          category: 'adventure',
          costEstimated: 350,
          transportToNext: 'Return to Positano dock at twilight',
          insiderTip: 'Ask your skipper to stop at the Green Grotto (Grotta Verde) for a quiet swim where the underwater sunbeams create turquoise neon water.'
        },
        evening: {
          id: 'act-amalfi-3-3',
          title: 'Candlelit Beachside Dinner at Da Adolfo or Chez Black',
          time: '08:00 PM',
          description: 'Feast on seafood caught that afternoon with your feet nearly in the sand, listening to the gentle lapping of Mediterranean waves.',
          location: 'Chez Black, Spiaggia Grande',
          duration: '2.5 hours',
          category: 'food',
          costEstimated: 140,
          transportToNext: 'Short evening stroll to hotel',
          insiderTip: 'Order Chez Black’s famous heart-shaped seafood pizza or spaghetti with sea urchins (ricci di mare).'
        },
        diningRecommendation: {
          name: 'Chez Black Positano',
          cuisine: 'Legendary Seafood & Wood-Fired Pizza',
          priceRange: '$$$',
          vibe: 'Bustling beachfront veranda with nautical brass decor and celebrity history',
          recommendedDish: 'Spaghetti with fresh sea urchin and paccheri with local rock lobster',
          reservationNeeded: true,
          neighborhood: 'Spiaggia Grande Beachfront'
        },
        accommodation: {
          name: 'Villa Boheme Exclusive Luxury Suites',
          type: 'Romantic Cliffside Boutique Suites',
          neighborhood: 'Positano Heights',
          whyRecommended: 'Champagne chilled in your room upon return from the boat charter.',
          pricePerNightApprox: 380
        },
        dayHighlights: ['Sailing through the Faraglioni rock arch', 'Swimming in Grotta Verde turquoise waters', 'Candlelit sea urchin pasta on the beach']
      },
      {
        dayNumber: 4,
        date: '2026-05-21',
        theme: 'Historic Amalfi Cathedral & Emerald Grotto',
        summary: 'Explore the maritime republic history of Amalfi town, marvel at the 9th-century Duomo di Sant’Andrea, and tour the glowing Grotta dello Smeraldo.',
        morning: {
          id: 'act-amalfi-4-1',
          title: 'Morning Ferry to Amalfi Town & Duomo di Sant’Andrea',
          time: '09:30 AM',
          description: 'Sail 25 minutes into Amalfi’s ancient port. Ascend the dramatic 62-step staircase into the Arab-Norman cathedral with its serene Cloister of Paradise.',
          location: 'Piazza del Duomo, Amalfi',
          duration: '2 hours',
          category: 'culture',
          costEstimated: 15,
          transportToNext: 'Short walk to historic pastry shop Pansa',
          insiderTip: 'Stop at Pasticceria Pansa (established 1830) right next to the cathedral steps for their renowned Santa Rosa sfogliatella.'
        },
        afternoon: {
          id: 'act-amalfi-4-2',
          title: 'Valle delle Ferriere Nature Walk & Historic Paper Mill',
          time: '01:00 PM',
          description: 'Walk up the lush lemon-shaded valley behind Amalfi to discover hidden waterfalls, mossy ruins, and the historic Museo della Carta hand-making paper.',
          location: 'Valle delle Ferriere, Amalfi',
          duration: '2.5 hours',
          category: 'outdoor',
          costEstimated: 10,
          transportToNext: 'Short bus or water shuttle to Conca dei Marini',
          insiderTip: 'The temperature in the Ferriere valley is 5 degrees cooler than the coast, making it a refreshing midday stroll.'
        },
        evening: {
          id: 'act-amalfi-4-3',
          title: 'Sunset Dining at Tonnarella in Marina di Conca',
          time: '07:30 PM',
          description: 'Tucked inside a tiny cove accessible primarily by boat or rock stairs, dine on tables hovering above the water where Jacqueline Kennedy once famously lunched.',
          location: 'Marina di Conca',
          duration: '2.5 hours',
          category: 'food',
          costEstimated: 110,
          transportToNext: 'Water taxi back to Positano',
          insiderTip: 'Try the Tonnarella spaghetti with zucchini and provolone del Monaco cheese.'
        },
        diningRecommendation: {
          name: 'Ristorante La Tonnarella',
          cuisine: 'Authentic Fishermen’s Cove Catch & Pasta',
          priceRange: '$$$',
          vibe: 'Rustic beachfront hideaway perched directly above quiet boat slips',
          recommendedDish: 'Spaghetti alla Jacqueline (crispy zucchini and rich melted local cheese)',
          reservationNeeded: true,
          neighborhood: 'Conca dei Marini'
        },
        accommodation: {
          name: 'Villa Boheme Exclusive Luxury Suites',
          type: 'Romantic Cliffside Boutique Suites',
          neighborhood: 'Positano Heights',
          whyRecommended: 'Unwind on the private lounge chairs under the stars.',
          pricePerNightApprox: 380
        },
        dayHighlights: ['Arab-Norman cathedral cloister', 'Valle delle Ferriere hidden waterfalls', 'Romantic fishermen’s cove dining']
      },
      {
        dayNumber: 5,
        date: '2026-05-22',
        theme: 'Path of the Gods & Farewell Coastal Toast',
        summary: 'A breathtaking high-altitude hike on Sentiero degli Dei overlooking the entire Sorrento peninsula, finished with a farewell toast.',
        morning: {
          id: 'act-amalfi-5-1',
          title: 'Sentiero degli Dei (Path of the Gods) Clifftop Walk',
          time: '08:30 AM',
          description: 'Hike one of the world’s most scenic mountain trails from Bomerano toward Nocelle. Gaze across sheer cliff precipices down onto the sparkling sapphire sea.',
          location: 'Bomerano to Nocelle Trailhead',
          duration: '3 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: 'Walk down into Nocelle village',
          insiderTip: 'Stop at the Lemon Point kiosk in Nocelle for fresh slushy lemon-orange juice pressed directly from trail trees.'
        },
        afternoon: {
          id: 'act-amalfi-5-2',
          title: 'Lunch in Cliffside Nocelle at Santa Croce',
          time: '12:30 PM',
          description: 'Rest tired hiking feet on a tranquil terrace suspended thousands of feet above Positano with homemade gnocchi and chilled local white wine.',
          location: 'Trattoria Santa Croce, Nocelle',
          duration: '2 hours',
          category: 'food',
          costEstimated: 45,
          transportToNext: 'Take the local Mobilitá bus down to Positano or descend the 1,700 steps',
          insiderTip: 'The local shuttle bus departs every hour from Nocelle piazza; take it instead of walking down the steps to save your joints.'
        },
        evening: {
          id: 'act-amalfi-5-3',
          title: 'Farewell Limoncello Souvenirs & Private Departure',
          time: '05:30 PM',
          description: 'Pick up bottles of artisanal IGP organic limoncello and hand-painted ceramic tiles before departing via private Mercedes scenic transfer to Naples or Rome.',
          location: 'Positano Town',
          duration: '1.5 hours',
          category: 'shopping',
          costEstimated: 60,
          transportToNext: 'Airport / train departure transfer',
          insiderTip: 'Valenti Positano vacuum packs their fresh cured cheeses and artisanal biscuits for international carry-on compliance.'
        },
        diningRecommendation: {
          name: 'Il Tridente Cocktail & Restaurant',
          cuisine: 'Contemporary Neapolitan Seafood & Craft Cocktails',
          priceRange: '$$$',
          vibe: 'Stunning elevated rooftop overlooking Positano’s evening lights',
          recommendedDish: 'Pan-seared Mediterranean Sea Bass with roasted fennel and saffron broth',
          reservationNeeded: true,
          neighborhood: 'Positano Centro'
        },
        accommodation: {
          name: 'Villa Boheme Exclusive Luxury Suites',
          type: 'Romantic Cliffside Boutique Suites',
          neighborhood: 'Positano Heights',
          whyRecommended: 'Effortless departure concierge and luggage handling.',
          pricePerNightApprox: 380
        },
        dayHighlights: ['Walking the Path of the Gods', 'Clifftop lemon juice recharge', 'Farewell golden hour rooftop cocktail']
      }
    ],
    createdAt: '2026-10-29T14:00:00Z',
    updatedAt: '2026-10-29T14:00:00Z',
    isFavorite: true
  },
  {
    id: 'trip-scenario-3-group-iceland',
    title: 'Iceland Ring Road & Glacier Adventure',
    destination: 'Reykjavik & South Coast, Iceland',
    heroImage: '/src/assets/images/scenario_group_iceland_1793463441121.jpg',
    tagline: 'An exhilarating small-group expedition coordinating schedules, split budgets, and thrilling outdoor pursuits from waterfalls to geothermal lagoons.',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    durationDays: 5,
    travelerType: 'group',
    groupSize: 5,
    budgetLevel: 'moderate',
    totalBudgetEstimate: 4500,
    pace: 'fast-paced',
    interests: ['Nature & Adventure', 'Sightseeing', 'Photography', 'Hidden Gems', 'Wellness & Relaxation'],
    accommodationStyle: 'vacation-rental',
    dietaryRestrictions: 'Mixed group: 2 vegetarians, 3 hearty eaters, love thermal hot springs',
    customNotes: 'Optimize group travel logistics, split 4x4 SUV rental and private lodge expenses equally, prevent morning scheduling friction.',
    bestTimeToVisit: 'September offers the perfect balance: accessible mountain roads, golden moss autumn colors, and dark night skies for Northern Lights spotting.',
    packingTips: [
      'Gore-Tex waterproof outer shell jacket and waterproof hiking pants',
      'Sturdy high-ankle waterproof hiking boots',
      'Merino wool thermal base layers and fleece mid-layers',
      'Quick-dry microfibre towel and swimwear for impromptu hot springs',
      'Universal European plug adapters with multi-port USB hubs for the group'
    ],
    localEtiquette: [
      'Complete shower with soap without swimwear before entering thermal pools',
      'Never drive off designated gravel roads — fragile volcanic moss takes decades to recover',
      'Tipping is not expected in Iceland; service is included in the bill'
    ],
    transportationTips: 'Rent a 7-passenger 4x4 SUV (e.g., Toyota Land Cruiser or camper van) with gravel and sand/ash damage protection. Download the SafeTravel.is app for live road alerts.',
    budgetBreakdown: {
      stayEstimatedTotal: 1650,
      activitiesEstimatedTotal: 1300,
      diningEstimatedTotal: 950,
      transportEstimatedTotal: 600,
      currency: 'USD',
      budgetTip: 'Stock up on group groceries, skyr, and snacks at Bónus supermarket in Reykjavik before heading out on the South Coast.'
    },
    days: [
      {
        dayNumber: 1,
        date: '2026-09-10',
        theme: 'Golden Circle & Secret Lagoon Soak',
        summary: 'Pick up the 4x4 SUV, witness tectonic rift valleys at Thingvellir, exploding geysers, and unwind together in Iceland’s oldest natural thermal bath.',
        morning: {
          id: 'act-ice-1-1',
          title: 'Thingvellir National Park & Tectonic Rifts',
          time: '08:30 AM',
          description: 'Stand in the Almannagjá canyon where the North American and Eurasian tectonic plates slowly pull apart. Learn where the world’s oldest parliament was founded in 930 AD.',
          location: 'Thingvellir National Park',
          duration: '2.5 hours',
          category: 'sightseeing',
          costEstimated: 10,
          transportToNext: '45 min drive along Route 365 to Geysir',
          insiderTip: 'Park in P1 for direct canyon access. The walk to Öxarárfoss waterfall is paved and easy for the whole group.'
        },
        afternoon: {
          id: 'act-ice-1-2',
          title: 'Strokkur Geysir & Gullfoss "Golden Falls"',
          time: '12:30 PM',
          description: 'Watch the Strokkur geysir erupt steaming water 100 feet into the air every 6 to 10 minutes, then stand beside the thunderous roaring cascades of Gullfoss waterfall.',
          location: 'Haukadalur Valley & Gullfoss',
          duration: '3 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: '30 min drive to Flúðir',
          insiderTip: 'Bring your waterproof jackets for Gullfoss; the canyon spray creates continuous double rainbows on sunny afternoons.'
        },
        evening: {
          id: 'act-ice-1-3',
          title: 'Group Thermal Soak at Secret Lagoon (Gamla Laugin)',
          time: '05:30 PM',
          description: 'Relax together in natural 38-40°C geothermal waters surrounded by steam vents and a mini geysir spouting every few minutes.',
          location: 'Flúðir, South Iceland',
          duration: '2 hours',
          category: 'wellness',
          costEstimated: 35,
          transportToNext: '20 min drive to group cabin',
          insiderTip: 'Rent float noodles at the pool desk — floating weightlessly in the steaming pool while checking the northern sky is sublime.'
        },
        diningRecommendation: {
          name: 'Friðheimar Tomato Greenhouse Restaurant',
          cuisine: 'Endless Tomato Soup Bar with Warm Brioche & Cucumber Salsa',
          priceRange: '$$',
          vibe: 'Dine inside a geothermally heated glass greenhouse surrounded by lush tomato vines',
          recommendedDish: 'All-you-can-eat fresh vine tomato soup with artisan sourdough and mozzarella skewers',
          reservationNeeded: true,
          neighborhood: 'Reykholt'
        },
        accommodation: {
          name: 'Golden Circle Luxury Modern Villa',
          type: '4-Bedroom Private Countryside Lodge with Geothermal Hot Tub',
          neighborhood: 'Selfoss / Grímsnes',
          whyRecommended: 'Full open-concept kitchen for group dinners, massive wooden deck, and zero light pollution for Aurora viewing.',
          pricePerNightApprox: 330
        },
        dayHighlights: ['Standing between two continental plates', 'Strokkur geysir eruption timing', 'Evening group thermal pool soak']
      },
      {
        dayNumber: 2,
        date: '2026-09-11',
        theme: 'South Coast Waterfalls & Black Sand Beaches',
        summary: 'Walk behind the curtain of Seljalandsfoss, climb Skógafoss, and stand on the dramatic basalt column beach of Reynisfjara.',
        morning: {
          id: 'act-ice-2-1',
          title: 'Walking Behind Seljalandsfoss & Gljúfrabúi Cave Waterfall',
          time: '08:30 AM',
          description: 'Follow the footpath that leads right behind the 200-foot cascading torrent of Seljalandsfoss, then wade into the hidden mossy cavern of Gljúfrabúi.',
          location: 'Seljalandsfoss, Route 1',
          duration: '2 hours',
          category: 'adventure',
          costEstimated: 8,
          transportToNext: '25 min drive along Ring Road east',
          insiderTip: 'Full waterproof pants and jacket are 100% required here. Protect your phone in a dry pouch!'
        },
        afternoon: {
          id: 'act-ice-2-2',
          title: 'Skógafoss Stairs & Dyrhólaey Sea Arch',
          time: '12:00 PM',
          description: 'Climb the 527 metal steps alongside Skógafoss for an exhilarating aerial view, then drive up to Dyrhólaey promontory to view the massive black basalt sea arch.',
          location: 'Skógar & Dyrhólaey',
          duration: '3 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: '15 min drive into Vík',
          insiderTip: 'Dyrhólaey upper lighthouse parking lot gives the best 360-degree view of endless black sand coastlines.'
        },
        evening: {
          id: 'act-ice-2-3',
          title: 'Reynisfjara Black Sand Beach & Basalt Columns',
          time: '04:30 PM',
          description: 'Marvel at the hexagonal basalt columns resembling a church organ and the towering Reynisdrangar sea stacks emerging from turbulent North Atlantic waves.',
          location: 'Reynisfjara, Vík í Mýrdal',
          duration: '2 hours',
          category: 'sightseeing',
          costEstimated: 0,
          transportToNext: '5 min drive to Vík village',
          insiderTip: 'STAY FAR FROM THE SURF. Sneaker waves are powerful and unpredictable; heed the yellow/red warning lights.'
        },
        diningRecommendation: {
          name: 'The Soup Company / Black Crust Pizzeria',
          cuisine: 'Traditional Icelandic Lamb Soup & Charcoal-Dough Pizzas',
          priceRange: '$$',
          vibe: 'Cozy mountaineering outpost vibe with free soup refills',
          recommendedDish: 'Icelandic Meat Soup (Kjötsúpa) or Black Truffle Volcano Pizza',
          reservationNeeded: false,
          neighborhood: 'Vík Town Center'
        },
        accommodation: {
          name: 'Vík South Coast Group Chalet',
          type: '3-Bedroom Wooden Alpine Chalet',
          neighborhood: 'Vík Surroundings',
          whyRecommended: 'Spacious common living area, drying racks for gear, and views of the basalt stacks.',
          pricePerNightApprox: 340
        },
        dayHighlights: ['Walking behind Seljalandsfoss water wall', 'Secret Gljúfrabúi canyon waterfall', 'Alien basalt columns on black sand']
      },
      {
        dayNumber: 3,
        date: '2026-09-12',
        theme: 'Skaftafell Glacier Hike & Jökulsárlón Icebergs',
        summary: 'Strap on crampons for a guided glacier hike on Falljökull, then marvel at floating blue icebergs drifting into the Diamond Beach.',
        morning: {
          id: 'act-ice-3-1',
          title: 'Falljökull Glacier Tongue Crampon Expedition',
          time: '09:00 AM',
          description: 'Equipped with certified mountain guides, ice axes, and crampons, navigate crevasses, ice sculptures, and deep blue moulins on Vatnajökull ice cap.',
          location: 'Skaftafell National Park',
          duration: '3.5 hours',
          category: 'adventure',
          costEstimated: 110,
          transportToNext: '45 min drive east to Glacier Lagoon',
          insiderTip: 'Wear stiff-soled ankle boots; guides will fit steel crampons securely on site. No prior mountaineering experience needed.'
        },
        afternoon: {
          id: 'act-ice-3-2',
          title: 'Jökulsárlón Glacier Lagoon Zodiac Cruise',
          time: '02:00 PM',
          description: 'Zip between luminous electric-blue icebergs calved from Breiðamerkurjökull glacier on an agile Zodiac boat. Spot curious harbor seals lounging on ice floes.',
          location: 'Jökulsárlón, Vatnajökull',
          duration: '2 hours',
          category: 'outdoor',
          costEstimated: 85,
          transportToNext: '2 min walk across the bridge to the beach',
          insiderTip: 'Zodiac boats get much closer to icebergs and glacier fronts than the larger amphibious vehicles.'
        },
        evening: {
          id: 'act-ice-3-3',
          title: 'Sunset on Diamond Beach & Aurora Watch',
          time: '05:00 PM',
          description: 'Watch crystal-clear iceberg chunks wash up onto the pitch-black volcanic sand, glittering like cut diamonds in the sunset glow.',
          location: 'Breiðamerkursandur (Diamond Beach)',
          duration: '2 hours',
          category: 'photography',
          costEstimated: 0,
          transportToNext: 'Drive to South Coast lodge',
          insiderTip: 'Long exposure photography (1-2 seconds with tripod) creates silky Atlantic waves washing around jewel icebergs.'
        },
        diningRecommendation: {
          name: 'Pakkhús Restaurant Höfn',
          cuisine: 'World-Renowned Langoustine (Icelandic Lobster) & Local Craft Beer',
          priceRange: '$$$',
          vibe: 'Rustic converted waterfront timber warehouse overlooking Höfn harbour',
          recommendedDish: 'Oven-baked local Langoustine tails with garlic butter and grilled crusty bread',
          reservationNeeded: true,
          neighborhood: 'Höfn Harbour'
        },
        accommodation: {
          name: 'Vatnajökull Glacier View Country Lodge',
          type: '4-Bedroom Scenic Country House',
          neighborhood: 'Fagurhólsmýri',
          whyRecommended: 'Floor-to-ceiling glass windows facing the ice cap, ideal for spotting Northern Lights together.',
          pricePerNightApprox: 320
        },
        dayHighlights: ['Walking on 1,000-year-old glacier ice', 'Zodiac cruise beside sapphire icebergs', 'Diamond Beach glittering sunset photography']
      },
      {
        dayNumber: 4,
        date: '2026-09-13',
        theme: 'Canyon Moss Walk & Reykjavik City Vibes',
        summary: 'Hike along the dramatic snake-like canyon of Fjaðrárgljúfur before returning to Reykjavik for craft beer tasting and street art exploration.',
        morning: {
          id: 'act-ice-4-1',
          title: 'Fjaðrárgljúfur Serpentine Canyon Hike',
          time: '09:00 AM',
          description: 'Follow the clifftop viewing platforms above this dramatic 100-meter-deep canyon carved over two million years by glacial meltwater.',
          location: 'Fjaðrárgljúfur, Kirkjubæjarklaustur',
          duration: '2 hours',
          category: 'outdoor',
          costEstimated: 0,
          transportToNext: '2.5 hour scenic drive west back to Reykjavik',
          insiderTip: 'Stay strictly on marked timber walkways to preserve the delicate endemic moss.'
        },
        afternoon: {
          id: 'act-ice-4-2',
          title: 'Reykjavik Hallgrímskirkja Tower & Street Art Walk',
          time: '02:00 PM',
          description: 'Ascend the 73-meter tower of Hallgrímskirkja church inspired by basalt columns for panoramic views of Reykjavik’s colorful corrugated tin rooftops.',
          location: 'Hallgrímskirkja, Central Reykjavik',
          duration: '2.5 hours',
          category: 'sightseeing',
          costEstimated: 12,
          transportToNext: 'Walk down Laugavegur shopping street',
          insiderTip: 'The elevator ride to the clock tower takes 30 seconds; time your ascent for the top-of-the-hour bell chimes.'
        },
        evening: {
          id: 'act-ice-4-3',
          title: 'Reykjavik Craft Brewery Crawl & Bæjarins Beztu Dogs',
          time: '06:30 PM',
          description: 'Experience Reykjavik’s lively pub culture, trying microbrews at Bryggjan Brugghús and grabbing the city’s famous lamb hot dog with crunchy fried onions.',
          location: 'Old Harbour & Laugavegur',
          duration: '3 hours',
          category: 'food',
          costEstimated: 45,
          transportToNext: 'Walk to downtown penthouse apartment',
          insiderTip: 'Order the hot dog "eina með öllu" (one with everything: remoulade, ketchup, sweet mustard, raw and crispy fried onions).'
        },
        diningRecommendation: {
          name: 'Messinn Seafood Restaurant Reykjavik',
          cuisine: 'Pan-Fried Fish Pans with Butter, Honey, and Potatoes',
          priceRange: '$$',
          vibe: 'Warm, maritime copper tavern with family-style shared pans',
          recommendedDish: 'Arctic Charr pan-fried with honey, almonds, and cherry tomatoes',
          reservationNeeded: true,
          neighborhood: 'Reykjavik City Center'
        },
        accommodation: {
          name: 'Reykjavik Downtown Luxury Loft',
          type: 'Modern 3-Bedroom Penthouse with Balcony',
          neighborhood: 'Old Harbour / 101 Reykjavik',
          whyRecommended: 'Walkable to all pubs, restaurants, and whale-watching docks.',
          pricePerNightApprox: 350
        },
        dayHighlights: ['Fjaðrárgljúfur canyon vista', 'Hallgrímskirkja 360-degree city view', 'Shared craft fish pans in historic harbour']
      },
      {
        dayNumber: 5,
        date: '2026-09-14',
        theme: 'Blue Lagoon Geothermal Spa & Farewell Feast',
        summary: 'Conclude the trip submerged in mineral-rich milky blue silica waters nestled in a lunar moss-covered lava field before flying home.',
        morning: {
          id: 'act-ice-5-1',
          title: 'Reykjavik Flea Market (Kolaportið) & Coffee',
          time: '10:00 AM',
          description: 'Explore local artisanal crafts, authentic lopapeysa hand-knit wool sweaters, vintage vinyl, and try fermented shark if you dare.',
          location: 'Kolaportið, Old Harbour',
          duration: '2 hours',
          category: 'culture',
          costEstimated: 10,
          transportToNext: '45 min drive toward Keflavik / Grindavik',
          insiderTip: 'Hand-knitted wool sweaters sold directly by Icelandic grandmothers here are 30% cheaper than souvenir shops.'
        },
        afternoon: {
          id: 'act-ice-5-2',
          title: 'The Blue Lagoon Silica Mud Mask Ritual',
          time: '01:30 PM',
          description: 'Soak together in warm 39°C mineral-rich milky cyan waters, applying silica and algae face masks from the in-water swim-up bar.',
          location: 'Blue Lagoon, Grindavík',
          duration: '3.5 hours',
          category: 'wellness',
          costEstimated: 95,
          transportToNext: '15 min drive to Keflavik International Airport',
          insiderTip: 'Generously apply the free conditioner to your hair before swimming; silica stiffens hair if left uncoated for a few days.'
        },
        evening: {
          id: 'act-ice-5-3',
          title: 'Lava Restaurant Farewell Toast & Airport Departure',
          time: '05:30 PM',
          description: 'Built directly into a dramatic 800-year-old cliff of volcanic lava rock, toast to an epic group adventure over Icelandic birch cocktails.',
          location: 'LAVA Restaurant at Blue Lagoon',
          duration: '2 hours',
          category: 'food',
          costEstimated: 75,
          transportToNext: 'Keflavik Airport Terminal',
          insiderTip: 'Drop the 4x4 rental car with a full tank of fuel at the terminal return lot across from check-in.'
        },
        diningRecommendation: {
          name: 'LAVA Restaurant at Blue Lagoon',
          cuisine: 'Gourmet Nordic Cuisine Built Into Natural Lava Wall',
          priceRange: '$$$',
          vibe: 'Modern architectural wonder with floor-to-ceiling glass overlooking turquoise waters',
          recommendedDish: 'Slow-cooked Icelandic cod with langoustine sauce and sunchoke puree',
          reservationNeeded: true,
          neighborhood: 'Grindavík'
        },
        accommodation: {
          name: 'Reykjavik Downtown Luxury Loft',
          type: 'Late checkout arranged',
          neighborhood: '101 Reykjavik',
          whyRecommended: 'Luggage packed into SUV before lagoon visit.',
          pricePerNightApprox: 350
        },
        dayHighlights: ['Milky silica mud lagoon soak', 'Lopapeysa authentic wool sweater shopping', 'Farewell toast inside volcanic rock cliff']
      }
    ],
    createdAt: '2026-10-28T09:00:00Z',
    updatedAt: '2026-10-28T09:00:00Z',
    isFavorite: false
  }
];
