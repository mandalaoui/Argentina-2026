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

- [x] Choose hotel in Buenos Aires → **City Express Plus by Marriott, Guatemala 4931**
- [ ] Send Bariloche accommodation details → **not booked yet**
- [x] Register for ExchangeRate-API free key → **done, in .env.local**
- [x] Get Google My Maps embed URL → **done, in .env.local**
- [ ] Scan / photograph flight tickets and passports → **flight docs located, passports pending**
- [x] Decide on documents password → **done, in .env.local**
- [x] Create Supabase project → **done, in .env.local**
- [ ] Decide what to do on 04.07 and 05.07 (Rosario or Colonia) → **open**
- [ ] Confirm Buquebus booking for Colonia → **open**

---

## Phase 0 — Environment Setup ✅ COMPLETE

- [x] **0.1** — Bootstrap Next.js 16 project (TypeScript + Tailwind v4 + App Router)
- [x] **0.2** — Install dependencies: @supabase/supabase-js, lucide-react, next-pwa, shadcn/ui
- [x] **0.3** — Set `dir="rtl"` and `lang="he"` in `app/layout.tsx`
- [x] **0.4** — Add Heebo font via Google Fonts
- [x] **0.5** — Configure Argentina color palette in `globals.css` (Tailwind v4 CSS-based config)
- [x] **0.6** — Create `.env.local` with all variable keys — fully populated
- [x] **0.7** — Create folder structure: `app/`, `components/`, `data/`, `lib/`, `docs/`
- [x] **0.8** — `git init` + push to GitHub ✅
- [ ] **0.9** — Connect to Vercel → moved to Phase 13 (deploy at end of QA)

> ⚠️ Note: Tailwind v4 uses CSS-based config (globals.css @theme), not tailwind.config.ts

**Checkpoint:** Build passes, app opens, RTL + Heebo + Argentina colors confirmed ✅

---

## Phase 1 — Layout & Navigation ✅ COMPLETE

- [x] **1.1** — `components/layout/Navbar.tsx` — fixed topbar, Argentina blue, logo + flag
- [x] **1.2** — `components/layout/HamburgerMenu.tsx` — RTL drawer, 7 pages with icons, overlay, ESC closes
- [x] **1.3** — Route stubs for all 7 pages created
- [x] **1.4** — Each page shows placeholder heading
- [x] **1.5** — Desktop: horizontal topbar links from `md:` breakpoint, active page highlighted

**Checkpoint:** All 7 pages navigate, drawer opens/closes from right (RTL correct), verified on mobile preview ✅

---

## Phase 2 — Base UI Components ✅ COMPLETE

- [x] **2.1** — `components/ui/Card.tsx` — base card with hover + click support
- [x] **2.2** — `components/ui/Badge.tsx` — status tags: עבר / היום / בקרוב / חשוב
- [x] **2.3** — `components/ui/Drawer.tsx` — bottom sheet mobile, centered modal desktop, ESC + scroll lock
- [x] **2.4** — `components/ui/Modal.tsx` — centered overlay, ESC close, scroll lock
- [x] **2.5** — `components/ui/Accordion.tsx` — collapsible with chevron animation
- [x] **2.6** — `components/ui/Tabs.tsx` — horizontal scrollable tabs, active highlight
- [x] **2.7** — `components/ui/EmergencyCard.tsx` — red card with Call / Copy / Maps buttons (min 44px touch)

**Checkpoint:** All components rendered and verified in browser preview ✅

---

## Phase 3 — Data Layer ✅ COMPLETE

- [x] **3.1** — `data/trip.ts` — 3 destinations + 2 sub-trips (Rosario, Colonia), accommodation, activities, restaurants, bars, tips, helper functions
- [x] **3.2** — `data/emergency.ts` — 5 emergency contacts (police, ambulance, embassy, hospital, insurance)
- [x] **3.3** — `data/info.ts` — 25 packing items, 6 apps, 6 money tips
- [x] **3.4** — `data/phrases.ts` — 46 phrases across 7 categories with transliteration
- [x] **3.5** — `data/worldcup.ts` — knockout schedule, Argentina matches, 3 watching spots
  > ⚠️ Match data is placeholder — update with real schedule as tournament progresses
- [x] **3.6** — `data/songs.ts` — 5 World Cup songs with Spanish lyrics + Hebrew translations + YouTube links

**Checkpoint:** TypeScript build passes with 0 errors ✅

---

## Phase 4 — Home Page ✅ COMPLETE

- [x] **4.1** — Date-based state logic: pre-trip / during-trip
- [x] **4.2** — Countdown card (pre-trip): days + hours until departure
- [x] **4.3** — "Today in the trip" card (during trip): day number, destination, hotel
- [x] **4.4** — Weather card — Open-Meteo API, auto-city by date, 30min cache
- [x] **4.5** — Currency card — ExchangeRate-API, ILS→ARS + USD→ARS, last updated
- [x] **4.6** — Next Argentina match — live from football-data.org API (8640s cache, max 10 req/day)
- [x] **4.7** — Quick action buttons: → Documents, → Map

**Checkpoint:** All cards live, APIs verified in browser ✅

---

## Phase 5 — The Trip Page ✅ COMPLETE

- [x] **5.1** — Vertical destination list from `data/trip.ts`
- [x] **5.2** — Destination card: name, dates, status badge, flag image, accommodation name
- [x] **5.3** — `DestinationDrawer` — opens as bottom sheet on tap, hidden with `invisible` when closed
- [x] **5.4** — Internal tabs: לינה / אוכל / פעילויות / ברים / טיפים / תמונות
- [x] **5.5** — `ActivityChecklist` — checklist with completion state
  - Checkbox toggles saved to `localStorage`
  - Completion date/time auto-saved when checked
- [x] **5.6** — "Open in Maps" button on every activity and restaurant
- [x] **5.7** — Tips tab with destination-specific tips
- [x] **5.8** — Sub-destinations (Rosario, Colonia) as tags on Buenos Aires card
- [x] **5.9** — Buenos Aires (return) shares activities/restaurants/bars with first BA visit
- [x] **fix** — Replaced flag emoji 🇦🇷 with `Flag` component (flagcdn.com w40) — works on all platforms

> ⚠️ Photos tab is placeholder — implemented in Phase 11

**Checkpoint:** Destination list renders, drawer opens/closes correctly, checkboxes persist in localStorage ✅

---

## Phase 6 — Documents Page ✅ COMPLETE (pending uploads: insurance, passports, BRC→EZE flight)

- [x] **6.1** — `PasswordGate` component
  - Full-screen lock until password entered
  - Stores auth state in `sessionStorage`
  - No document content visible before unlock
- [x] **6.2** — Supabase project setup:
  - Create `documents` bucket (Private) ✅
  - Create `photos` bucket (Public) — SQL ready, verify in dashboard
  - Configure CORS for the Vercel domain — add production domain before deploy
  > Setup script: `scripts/setup-supabase-storage.sql`
- [x] **6.3** — Accordion categories: טיסות / ביטוח / דרכונים / מלונות / נוספים
- [x] **6.4** — `DocumentCard`: name, date, "חשוב" badge, view + download buttons
- [x] **6.5** — Signed URL generation for private PDF viewing (1-hour expiry)
- [x] **6.6** — "נעל מחדש" button in page footer
- [x] **6.7** — Upload initial documents to Supabase (flight tickets first)
  > 4 files uploaded: 3 flights + 1 hotel · pending: BRC→EZE, insurance, passports
- [x] **6.8** — Connect `data/documents.ts` storage paths to actual Supabase files
  - Live availability check via `listAvailableStoragePaths()` on page load
  - Missing files show "הקובץ טרם הועלה" (no broken buttons)

**Checkpoint:** Password gate ✅ · PDF view/download works for uploaded files ✅ · Missing files show clean fallback ✅

---

## Phase 7 — Useful Info Page ✅ COMPLETE (pending: insurance emergency number, SIM provider details)

- [x] **7.1** — Accordion sections: ציוד / אפליקציות / כסף / תקשורת / חירום
- [x] **7.2** — Packing checklist with `localStorage` persistence
- [x] **7.3** — Apps list with download links (App Store / Play Store deep links)
- [x] **7.4** — `EmergencyCard` for each emergency contact:
  - 📞 Call button (`tel:` link — activates phone dialer on mobile)
  - 📋 Copy number button
  - 📍 Maps button (where applicable)
- [x] **7.5** — Emergency section: distinct red background (`bg-red-50 border-red-200`)

**Checkpoint:** Packing checkboxes persist, call button works on mobile ✅

---

## Phase 8 — Spanish Page ✅ COMPLETE

- [x] **8.1** — Tabs for each category: שיחות / מסעדות / מלון / תחבורה / כסף / חירום / כדורגל
- [x] **8.2** — `PhraseCard`: Hebrew label / Spanish phrase / transliteration / copy button
- [x] **8.3** — In-page search / filter (real-time, filters phrase cards)
- [x] **8.4** — Free translation input at bottom of page (MyMemory API)
  - Textarea + direction toggle
  - "תרגם" button + result display
  - API route: `app/api/translate/route.ts` · helper: `lib/translate.ts`

**Checkpoint:** Copy button works, translation API returns result, search filters correctly ✅

---

## Phase 9 — Map Page (refactored per map_page_option_b_spec.md)

> **Spec:** Interactive trip places explorer — Leaflet + OpenStreetMap (free, no API key).
> Google My Maps iframe demoted to secondary accordion "מפת Google מלאה".

- [x] **9.0** — Previous iframe-only approach replaced (was marked complete, now superseded)
- [x] **9.1** — `types/map.ts` — `MapPlace` type with full schema
- [x] **9.2** — `lib/map-places.ts` — 43 structured places (BA, Bariloche, Rosario, Colonia, Tigre)
- [x] **9.3** — Installed `leaflet` + `@types/leaflet`
- [x] **9.4** — `InteractiveTripMap.tsx` — Leaflet/OSM, emoji category markers, popups, selectedPlace sync, dynamic import (client-only)
- [x] **9.5** — `MapPlaceCard.tsx` — card with הצג במפה + פתח ב-Google Maps, selected highlight
- [x] **9.6** — `MapFilters.tsx` — horizontal scrollable category + city filters
- [x] **9.7** — Search built into `MapPageClient.tsx` (matches name, area, category, tags, description)
- [x] **9.8** — `MapPageClient.tsx` — client orchestrator, grouped list, 2-col desktop layout
- [x] **9.9** — `MapGoogleEmbed.tsx` — iframe moved to secondary collapsible accordion "מפת Google מלאה"
- [x] **9.10** — `app/map/page.tsx` — server page passing places to client
- [ ] **9.11** — Mobile polish (to verify on real device)

**Checkpoint:** Map loads with 38 places, search + filters + markers + Google Maps links verified in preview ✅

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
- [ ] **12.3** — Configure `next-pwa` in `next.config.ts`
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
- [ ] **13.10** — Connect repo to Vercel, add all env vars, deploy + verify production URL

---

## Mobile Testing Checklist

- [x] Hamburger nav works on tap — verified in preview
- [ ] All buttons are at least 48px tall
- [ ] No horizontal scroll on any page
- [ ] Screen doesn't shift when keyboard opens
- [ ] Call button opens phone dialer
- [ ] Camera upload opens device camera
- [ ] PDFs open in mobile browser
- [ ] Countdown calculates correctly
- [ ] Match times display in GMT-3 (Argentina time)
- [x] Drawer closes on outside tap — verified in preview

---

## Deployment Checklist

- [ ] All environment variables added to Vercel project settings
- [x] `.env.local` is in `.gitignore`
- [x] `NEXT_PUBLIC_DOCS_PASSWORD` is set
- [x] Supabase buckets are configured (private/public correctly) — `documents` bucket live; verify `photos` + CORS before deploy
- [ ] HTTPS is active (automatic on Vercel)
- [x] Build passes with no TypeScript errors
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

| Phase | Status | Notes |
|---|---|---|
| 0 — Setup | ✅ Complete | Tailwind v4, Heebo, RTL, colors |
| 1 — Navbar | ✅ Complete | Mobile drawer + desktop topbar |
| 2 — UI Components | ✅ Complete | 7 components verified |
| 3 — Data Layer | ✅ Complete | 6 data files, 0 TS errors |
| 4 — Home Page | ✅ Complete | Live APIs: weather, currency, football |
| 5 — Trip Page | ✅ Complete | Drawer, checklist, localStorage |
| 6 — Documents | ✅ Complete | 4/5 docs live · pending: BRC→EZE, insurance, passports |
| 7 — Info Page | ✅ Complete | Packing checklist + emergency cards · pending: insurance #, SIM provider |
| 8 — Spanish | ✅ Complete | 7 tabs, search, copy, MyMemory translation |
| 9 — Map | ✅ Complete | Google My Maps iframe, full viewport |
| 10 — World Cup | ✅ Complete | Live API, nested stage accordions |
| 11 — Photos | 🔲 | Supabase setup needed |
| 12 — PWA | 🔲 | |
| 13 — QA | 🔲 | |
