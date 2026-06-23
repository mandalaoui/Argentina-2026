# 02 — Architecture & APIs | Argentina 2026 Hub

---

## Recommended Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | **Next.js 14** (App Router) | SSG + SSR, PWA support, Vercel-native, React ecosystem |
| Styling | **Tailwind CSS** | Utility-first, mobile-first, fast iteration |
| Components | **shadcn/ui** | Built on Tailwind, accessible, easy to customize |
| Icons | **Lucide React** | Included with shadcn, clean and minimal |
| Backend | **Supabase** | Auth-less file storage for documents and photos, generous free tier |
| File Storage | **Supabase Storage** | PDF and image uploads, separate buckets per category |
| PWA | **next-pwa** | Service worker, manifest, offline caching |
| Hosting | **Vercel** | Free tier, auto-deploy from Git |
| State | **React Context + localStorage** | Checkbox states, auth session, no server needed |

---

## Folder Structure

```
argentina2026/
├── app/
│   ├── layout.tsx              # Root layout — Navbar, RTL, Heebo font
│   ├── page.tsx                # Home page
│   ├── trip/
│   │   └── page.tsx            # The Trip page
│   ├── map/
│   │   └── page.tsx            # Map page
│   ├── documents/
│   │   └── page.tsx            # Documents page (password protected)
│   ├── info/
│   │   └── page.tsx            # Useful Info page
│   ├── spanish/
│   │   └── page.tsx            # Spanish page
│   └── worldcup/
│       └── page.tsx            # World Cup page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── HamburgerMenu.tsx
│   ├── ui/                     # shadcn base components
│   ├── home/
│   │   ├── CountdownCard.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── CurrencyCard.tsx
│   │   └── NextMatchCard.tsx
│   ├── trip/
│   │   ├── DestinationCard.tsx
│   │   ├── DestinationDrawer.tsx
│   │   ├── ActivityChecklist.tsx
│   │   └── PhotoGallery.tsx
│   ├── documents/
│   │   ├── PasswordGate.tsx
│   │   ├── DocumentCard.tsx
│   │   └── DocumentCategory.tsx
│   ├── spanish/
│   │   ├── PhraseCard.tsx
│   │   └── TranslationInput.tsx
│   └── worldcup/
│       ├── NextMatchCard.tsx
│       ├── ScheduleTable.tsx
│       ├── SongCard.tsx
│       └── WatchingSpots.tsx
├── data/
│   ├── trip.ts                 # Destinations, accommodation, activities (hardcoded v1)
│   ├── phrases.ts              # Hebrew ↔ Spanish phrasebook
│   ├── worldcup.ts             # Match schedule (manual JSON)
│   ├── songs.ts                # World Cup songs
│   ├── emergency.ts            # Emergency contacts
│   └── info.ts                 # Packing list, apps, money tips
├── lib/
│   ├── supabase.ts             # Supabase client initialization
│   ├── weather.ts              # Open-Meteo fetch helper
│   ├── currency.ts             # ExchangeRate-API fetch helper
│   └── translate.ts            # MyMemory API fetch helper
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/                  # PWA icon assets
└── .env.local
```

---

## Backend Decision

**No dedicated backend server is needed.** Everything runs client-side + Supabase.

- Trip data, phrasebook, match schedule — TypeScript data files in `/data`
- External APIs (weather, currency, translation) — called directly from the client
- Documents and photos — Supabase Storage
- Document authentication — client-side password check (sessionStorage), no server auth

---

## Data Models

### Trip — `data/trip.ts`

```typescript
interface Destination {
  id: string
  name: string            // "Buenos Aires"
  nameHe: string          // "בואנוס איירס"
  country: string         // "Argentina" | "Uruguay"
  startDate: string       // "2026-07-01"
  endDate: string         // "2026-07-06"
  nights: number
  status: "past" | "current" | "upcoming"
  accommodation: {
    name: string
    address: string
    bookingUrl: string
    notes: string
  }
  activities: Activity[]
  restaurants: Place[]
  bars: Place[]
  tips: string[]
  subTrips?: SubTrip[]    // Day trips (Rosario, Colonia)
}

interface Activity {
  id: string
  name: string
  nameHe: string
  category: "attraction" | "nature" | "culture" | "food" | "nightlife"
  mapsUrl: string
  completed: boolean      // persisted in localStorage
  completedAt?: string    // ISO date string
  notes?: string
}

interface Place {
  name: string
  type: string
  address: string
  mapsUrl: string
  notes: string
  recommended: boolean
}
```

### Documents — Supabase Storage

```
Bucket: documents  (Private)
  ├── flights/
  ├── insurance/
  ├── passports/
  ├── hotels/
  └── other/

Bucket: photos  (Public)
  ├── buenos-aires/
  ├── bariloche/
  └── [other destinations]/
```

Document metadata (name, category, date, "important" flag) — stored in `localStorage`.

### Activity/Checklist State — `localStorage`

```json
{
  "activities": {
    "activity-id-123": {
      "completed": true,
      "completedAt": "2026-07-03T14:30:00Z"
    }
  },
  "packing": {
    "item-id-456": { "checked": true }
  }
}
```

---

## Storage Strategy

### Supabase Storage

**Bucket: `documents`** — Private (requires signed URL to access)
**Bucket: `photos`** — Public (accessible by URL, not indexed anywhere)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Document Security

- Password stored in environment variable: `NEXT_PUBLIC_DOCS_PASSWORD`
- Client-side only authentication
- After successful auth: `sessionStorage.setItem('docs_auth', 'true')`
- Supabase `documents` bucket: **Private** — URLs are only generated after auth check
- Signed URLs with 1-hour expiry for PDF viewing

> ⚠️ This is basic personal-use security only. Not suitable for highly sensitive data.

---

## External APIs

### 1. Weather — Open-Meteo

**Completely free, no API key required.**

```typescript
// lib/weather.ts
const BASE = 'https://api.open-meteo.com/v1/forecast'

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`
  )
  return res.json()
}

// City coordinates
const CITIES = {
  buenosAires: { lat: -34.6037, lon: -58.3816 },
  bariloche:   { lat: -41.1335, lon: -71.3103 },
}
```

### 2. Currency Exchange — ExchangeRate-API

**Free tier: 1,500 requests/month — sufficient for personal use.**
**Requires API Key — register at setup time.**

```typescript
// lib/currency.ts
export async function getRates() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}/latest/USD`
  )
  const data = await res.json()
  return {
    usdToArs: data.conversion_rates.ARS,
    usdToIls: data.conversion_rates.ILS,
  }
}
```

**Open task:** Register for a free API key at https://www.exchangerate-api.com/

### 3. Translation — MyMemory API

**Completely free, no API key required, up to 1,000 translations/day.**

```typescript
// lib/translate.ts
export async function translate(text: string, from: 'he' | 'es', to: 'he' | 'es') {
  const langPair = `${from}|${to}`
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
  )
  const data = await res.json()
  return data.responseData.translatedText
}
```

### 4. World Cup 2026 Schedule

**Status:** No complete public API for the live 2026 tournament is confirmed yet.
**v1 solution:** Manual JSON file `data/worldcup.ts` containing:
- Argentina's matches
- All knockout-stage matches

**Live updates:** Edit the JSON file + redeploy on Vercel (takes ~1 minute).

```typescript
// data/worldcup.ts
export const argentinaMatches: Match[] = [
  // To be filled based on tournament draw
]

export const knockoutMatches: Match[] = [
  // Round of 16, Quarter, Semi, Final
]
```

### 5. Google My Maps

```html
<iframe
  src="GOOGLE_MY_MAPS_EMBED_URL"
  width="100%"
  height="100%"
  style="border:0"
  allowfullscreen
  loading="lazy"
/>
```

**Open task:** Get the embed URL from your personal My Maps (Share → Embed).

---

## PWA Configuration

```json
// public/manifest.json
{
  "name": "Argentina 2026 Hub",
  "short_name": "Argentina 26",
  "description": "המדריך האישי לטיול בארגנטינה",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#74ACDF",
  "lang": "he",
  "dir": "rtl",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

`next-pwa` handles service worker registration automatically.

---

## Offline Strategy

### Works offline:
- Spanish phrasebook (hardcoded in data files)
- Emergency contacts (hardcoded)
- Trip timeline (hardcoded)
- Countdown timer (JavaScript only)

### Requires internet:
- Weather (external API)
- Currency rates (external API)
- Free translation (external API)
- Documents (Supabase Storage)
- Uploaded photos (Supabase Storage)

### Caching Strategy (next-pwa)
- Static assets: Cache First
- API calls: Network First with fallback
- Pages: Stale While Revalidate

---

## Environment Variables — `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Currency API
NEXT_PUBLIC_EXCHANGE_API_KEY=

# Documents Password
NEXT_PUBLIC_DOCS_PASSWORD=

# Google Maps embed URL (not an API key)
NEXT_PUBLIC_MAPS_EMBED_URL=
```

---

## Deployment — Vercel

1. Push project to GitHub
2. Import repository in Vercel dashboard
3. Add all environment variables in Vercel project settings
4. Auto-deploy on every push to `main`

**Suggested domain:** `argentina2026.vercel.app` (free)

---

## v1 — Hardcoded Data

| Data | Approach |
|---|---|
| Destinations and dates | TypeScript files in `/data` |
| Accommodation details | `data/trip.ts` |
| Restaurants and attractions | `data/trip.ts` |
| Spanish phrasebook | `data/phrases.ts` |
| Match schedule | `data/worldcup.ts` |
| World Cup songs | `data/songs.ts` |
| Emergency contacts | `data/emergency.ts` |
| Packing list and apps | `data/info.ts` |

## v2 — What Becomes Dynamic Later

- Inline editing for restaurants and activities
- Personal notes per destination
- Photo export from gallery
- Global search
- Favorites / bookmarks

---

## Security Notes

- Documents are password-protected (personal use only — not bank-level security)
- Supabase `documents` bucket: Private + Signed URLs with expiry
- `.env.local` must be in `.gitignore` — never commit to Git
- No passwords stored in source code
- HTTPS enforced automatically by Vercel

---

## Open Tasks — APIs & Services

- [ ] Register for ExchangeRate-API free tier to get API key
- [ ] Get embed URL from personal Google My Maps
- [ ] Create Supabase project and configure storage buckets
- [ ] Upload flight tickets to Supabase
- [ ] Decide and set the documents password
