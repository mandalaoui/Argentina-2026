# 04 — Implementation Plan | Argentina 2026 Hub

---

## Working Rules

- Work phase by phase — never start the next phase before the current one runs cleanly
- After each phase: run the app and test on mobile
- Mark each task ✅ when complete — do not batch-mark
- Do not add features outside this list
- v1 = must work before the trip
- v2 = can be added during the trip
- v3 / future = post-trip improvements

---

## Pre-Development Checklist — Complete Before Coding

- [ ] Choose hotel in Buenos Aires and provide details
- [ ] Send Bariloche accommodation details
- [ ] Register for ExchangeRate-API free key
- [ ] Get Google My Maps embed URL
- [ ] Scan / photograph flight tickets and passports
- [ ] Decide on documents password
- [ ] Create Supabase project
- [ ] Decide what to do on 04.07 and 05.07 (Rosario or Colonia)
- [ ] Confirm Buquebus booking for Colonia

---

## Phase 0 — Environment Setup

- [ ] **0.1** — Bootstrap project:
  ```bash
  npx create-next-app@latest argentina2026 --typescript --tailwind --app
  ```
- [ ] **0.2** — Install dependencies:
  ```bash
  npm install @supabase/supabase-js lucide-react next-pwa
  npx shadcn@latest init
  ```
- [ ] **0.3** — Set `dir="rtl"` and `lang="he"` in `app/layout.tsx`
- [ ] **0.4** — Add Heebo font via Google Fonts in `layout.tsx`
- [ ] **0.5** — Configure Argentina color palette in `tailwind.config.ts`:
  ```js
  colors: {
    argentina: '#74ACDF',
    'argentina-light': '#E8F4FD',
    sun: '#F6C90E',
    navy: '#2C5282',
  }
  ```
- [ ] **0.6** — Create `.env.local` with all variable keys (empty values for now)
- [ ] **0.7** — Create folder structure: `app/`, `components/`, `data/`, `lib/`
- [ ] **0.8** — `git init` + push to GitHub
- [ ] **0.9** — Connect to Vercel + first empty deploy

**Checkpoint:** App is live on Vercel, opens without errors ✅

---

## Phase 1 — Layout & Navigation

- [ ] **1.1** — Create `components/layout/Navbar.tsx`
  - Fixed topbar, Argentina blue background
  - App name + 🇦🇷 flag in center
  - Hamburger button on the left (RTL visual right)
- [ ] **1.2** — Create `components/layout/HamburgerMenu.tsx`
  - Drawer opens from the right (RTL)
  - List of 7 pages with icons
  - Dark overlay behind drawer
  - Closes on ✕ click or overlay tap
- [ ] **1.3** — Create route stubs for all 7 pages (placeholder heading only):
  - `/` `/trip` `/map` `/documents` `/info` `/spanish` `/worldcup`
- [ ] **1.4** — Each page shows its own name as placeholder
- [ ] **1.5** — Desktop: standard topbar with horizontal links from `md:` breakpoint

**Checkpoint:** All 7 pages navigate correctly, drawer opens/closes, RTL is correct ✅

---

## Phase 2 — Base UI Components

- [ ] **2.1** — `components/ui/Card.tsx` — base card wrapper
- [ ] **2.2** — `components/ui/Badge.tsx` — status tag (עבר / היום / בקרוב / חשוב)
- [ ] **2.3** — `components/ui/Drawer.tsx` — bottom sheet / side panel
- [ ] **2.4** — `components/ui/Modal.tsx` — centered overlay
- [ ] **2.5** — `components/ui/Accordion.tsx` — collapsible section
- [ ] **2.6** — `components/ui/Tabs.tsx` — horizontal tab navigation
- [ ] **2.7** — `components/ui/EmergencyCard.tsx` — emergency contact card with action buttons

**Checkpoint:** Each component renders correctly on mobile and desktop ✅

---

## Phase 3 — Data Layer

- [ ] **3.1** — `data/trip.ts` — all destinations, accommodation, activities, restaurants, bars, tips, sub-trips
- [ ] **3.2** — `data/emergency.ts` — all emergency contacts
- [ ] **3.3** — `data/info.ts` — packing list, apps, money tips, communication
- [ ] **3.4** — `data/phrases.ts` — full Hebrew ↔ Spanish phrasebook by category
- [ ] **3.5** — `data/worldcup.ts` — knockout schedule + Argentina matches
- [ ] **3.6** — `data/songs.ts` — World Cup songs with Spanish lyrics, Hebrew translations, YouTube links

**Checkpoint:** TypeScript compiles with no errors, all data imports cleanly ✅

---

## Phase 4 — Home Page

- [ ] **4.1** — Date-based state logic: pre-trip / during-trip (compare today vs. 01.07–12.07.2026)
- [ ] **4.2** — Countdown card (pre-trip): days until departure
- [ ] **4.3** — "Today in the trip" card (during trip): day number, current destination, tonight's hotel
- [ ] **4.4** — Weather card — Open-Meteo API
  - Temperature + icon
  - Auto-selects city based on current trip date
- [ ] **4.5** — Currency card — ExchangeRate-API
  - ILS → ARS and USD → ARS
  - Last updated timestamp
- [ ] **4.6** — Next Argentina match card (from `data/worldcup.ts`)
  - Teams, date, time in GMT-3
- [ ] **4.7** — Quick action buttons: → Documents, → Map

**Checkpoint:** All cards display correctly, APIs return data, date logic switches correctly ✅

---

## Phase 5 — The Trip Page

- [ ] **5.1** — Vertical destination list from `data/trip.ts`
- [ ] **5.2** — Destination card: name, dates, status badge, hero image placeholder
- [ ] **5.3** — `DestinationDrawer` — opens as bottom sheet on tap
- [ ] **5.4** — Internal tabs: לינה / אוכל / פעילויות / ברים / טיפים / תמונות
- [ ] **5.5** — `ActivityChecklist` — checklist with completion state
  - Checkbox toggles saved to `localStorage`
  - Completion date/time auto-saved when checked
- [ ] **5.6** — "Open in Maps" button on every activity and restaurant
- [ ] **5.7** — Tips tab: list of destination-specific tips from `data/trip.ts`
- [ ] **5.8** — Sub-destinations (Rosario, Colonia) nested inside Buenos Aires

**Checkpoint:** Tapping a destination opens drawer, checkboxes persist after page reload, all tabs work ✅

---

## Phase 6 — Documents Page

- [ ] **6.1** — `PasswordGate` component
  - Full-screen lock until password entered
  - Stores auth state in `sessionStorage`
  - No document content visible before unlock
- [ ] **6.2** — Supabase project setup:
  - Create `documents` bucket (Private)
  - Create `photos` bucket (Public)
  - Configure CORS for the Vercel domain
- [ ] **6.3** — Accordion categories: טיסות / ביטוח / דרכונים / מלונות / נוספים
- [ ] **6.4** — `DocumentCard`: name, date, "חשוב" badge, view + download buttons
- [ ] **6.5** — Signed URL generation for private PDF viewing (1-hour expiry)
- [ ] **6.6** — "נעל מחדש" button in page footer
- [ ] **6.7** — Upload initial documents to Supabase (flight tickets first)

**Checkpoint:** Documents are hidden without password, PDF opens on tap, download works ✅

---

## Phase 7 — Useful Info Page

- [ ] **7.1** — Accordion sections: ציוד / אפליקציות / כסף / תקשורת / חירום
- [ ] **7.2** — Packing checklist with `localStorage` persistence
- [ ] **7.3** — Apps list with download links (App Store / Play Store deep links)
- [ ] **7.4** — `EmergencyCard` for each emergency contact:
  - 📞 Call button (`tel:` link — activates phone dialer on mobile)
  - 📋 Copy number button
  - 📍 Maps button (where applicable)
- [ ] **7.5** — Emergency section: distinct red background (`bg-red-50 border-red-200`)

**Checkpoint:** Packing checkboxes persist, call button works on mobile ✅

---

## Phase 8 — Spanish Page

- [ ] **8.1** — Tabs for each category: שיחות / מסעדות / מלון / תחבורה / כסף / חירום / כדורגל
- [ ] **8.2** — `PhraseCard`: Hebrew label / Spanish phrase / transliteration / copy button
- [ ] **8.3** — In-page search / filter (real-time, filters phrase cards)
- [ ] **8.4** — Free translation input at bottom of page (MyMemory API)
  - Textarea + direction toggle
  - "תרגם" button + result display

**Checkpoint:** Copy button works, translation API returns result, search filters correctly ✅

---

## Phase 9 — Map Page

- [ ] **9.1** — Google My Maps iframe
  - `src` from `NEXT_PUBLIC_MAPS_EMBED_URL` environment variable
  - Full viewport height minus navbar
  - `loading="lazy"`

**Checkpoint:** Map renders correctly, pan/zoom works on mobile ✅

---

## Phase 10 — World Cup Page

- [ ] **10.1** — "Next Argentina match" card (from `data/worldcup.ts`)
- [ ] **10.2** — Full schedule — Accordion by stage (שמינית / רבע / חצי / גמר)
  - Argentina matches highlighted with badge
- [ ] **10.3** — "Where to watch" section — cards for Buenos Aires and Bariloche
- [ ] **10.4** — `SongCard` for each World Cup song:
  - Song name + Hebrew description
  - Spanish lyrics (in Spanish)
  - Hebrew translation (small, below)
  - YouTube link button + copy button

**Checkpoint:** Schedule is accurate, song cards render correctly ✅

---

## Phase 11 — Photo Uploads

- [ ] **11.1** — Upload button inside each destination drawer (תמונות tab)
- [ ] **11.2** — `<input type="file" accept="image/*" capture="camera">` for mobile camera access
- [ ] **11.3** — Upload to Supabase `photos/{destination-id}/` path
- [ ] **11.4** — Photo gallery grid in תמונות tab
- [ ] **11.5** — Tap photo → opens full-screen modal
- [ ] **11.6** — Save upload date and destination name as Supabase metadata

**Checkpoint:** Upload from phone camera works, photo appears in gallery ✅

---

## Phase 12 — PWA

- [ ] **12.1** — Create `public/manifest.json` with name, icons, RTL, theme color `#74ACDF`
- [ ] **12.2** — Create PWA icon assets (192×192, 512×512) in Argentina blue with flag
- [ ] **12.3** — Configure `next-pwa` in `next.config.js`
- [ ] **12.4** — Test "Add to Home Screen" on iPhone Safari
- [ ] **12.5** — Verify offline: Spanish phrasebook loads without internet

**Checkpoint:** App installs from iPhone Safari, behaves like native app ✅

---

## Phase 13 — QA & Polish

- [ ] **13.1** — Full walkthrough on iPhone (Safari)
- [ ] **13.2** — Full walkthrough on Android (Chrome)
- [ ] **13.3** — All buttons meet 48px minimum touch target
- [ ] **13.4** — RTL correct on all pages and components
- [ ] **13.5** — Color contrast meets WCAG AA minimum
- [ ] **13.6** — Loading states for all API calls
- [ ] **13.7** — Error/fallback states when API fails or has no internet
- [ ] **13.8** — `<meta name="viewport" content="width=device-width, initial-scale=1">` confirmed
- [ ] **13.9** — `<meta name="theme-color" content="#74ACDF">` confirmed
- [ ] **13.10** — Final deploy to Vercel + verify production URL

---

## Mobile Testing Checklist

- [ ] Hamburger nav works on tap
- [ ] All buttons are at least 48px tall
- [ ] No horizontal scroll on any page
- [ ] Screen doesn't shift when keyboard opens
- [ ] Call button opens phone dialer
- [ ] Camera upload opens device camera
- [ ] PDFs open in mobile browser
- [ ] Countdown calculates correctly
- [ ] Match times display in GMT-3 (Argentina time)
- [ ] Drawer closes on outside tap

---

## Deployment Checklist

- [ ] All environment variables added to Vercel project settings
- [ ] `.env.local` is in `.gitignore`
- [ ] `NEXT_PUBLIC_DOCS_PASSWORD` is set
- [ ] Supabase buckets are configured (private/public correctly)
- [ ] HTTPS is active (automatic on Vercel)
- [ ] Build passes with no TypeScript errors
- [ ] Vercel domain confirmed and accessible

---

## v2 — Add During the Trip

- [ ] Update match schedule JSON + redeploy (~1 minute) as tournament progresses
- [ ] Add newly discovered restaurants and places to `data/trip.ts`
- [ ] Continue uploading photos to each destination as you go

---

## v3 / Future — Post-Trip

- [ ] Global search across all content
- [ ] Favorites — bookmark restaurants, phrases, places
- [ ] Text-to-speech for Spanish phrases (Web Speech API)
- [ ] Photo gallery export
- [ ] CMS / inline editor so content can be updated without touching code

---

## Phase Summary

| Phase | Priority | Estimated Time |
|---|---|---|
| 0–2 (Setup + Layout + Components) | Critical | ~3 hours |
| 3 (Data files) | Critical | ~2 hours |
| 4 (Home page) | Critical | ~3 hours |
| 5 (Trip + checklists) | Critical | ~4 hours |
| 6 (Documents) | Critical | ~3 hours |
| 7 (Useful Info + Emergency) | Critical | ~2 hours |
| 8 (Spanish) | High | ~2 hours |
| 9 (Map) | High | ~30 minutes |
| 10 (World Cup) | High | ~2 hours |
| 11 (Photo uploads) | Medium | ~3 hours |
| 12 (PWA) | Medium | ~1 hour |
| 13 (QA) | Critical | ~2 hours |

**Total v1 estimate: ~28–30 hours of development**
