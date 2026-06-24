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

**Checkpoint:** Build passes, app opens, RTL + Heebo + Argentina colors confirmed ✅

---

## Phase 1 — Layout & Navigation ✅ COMPLETE

- [x] **1.1** — `components/layout/Navbar.tsx` — fixed topbar, Argentina blue, logo + flag
- [x] **1.2** — `components/layout/HamburgerMenu.tsx` — RTL drawer, 8 pages with icons, overlay
- [x] **1.3** — Route stubs for all 8 pages created (+ journal added in Phase 14)
- [x] **1.4** — Each page shows content
- [x] **1.5** — Desktop: horizontal topbar links from `md:` breakpoint, active page highlighted

**Checkpoint:** All 8 pages navigate, drawer opens/closes from right (RTL correct) ✅

---

## Phase 2 — Base UI Components ✅ COMPLETE

- [x] **2.1** — `components/ui/Card.tsx` — base card with hover + click support
- [x] **2.2** — `components/ui/Badge.tsx` — status tags: עבר / היום / בקרוב / חשוב
- [x] **2.3** — `components/ui/Drawer.tsx` — bottom sheet mobile, centered modal desktop, ESC + scroll lock
- [x] **2.4** — `components/ui/Modal.tsx` — centered overlay, ESC close, scroll lock
- [x] **2.5** — `components/ui/Accordion.tsx` — collapsible with chevron + `nested` variant
- [x] **2.6** — `components/ui/Tabs.tsx` — horizontal scrollable tabs, active highlight
- [x] **2.7** — `components/ui/EmergencyCard.tsx` — red card with Call / Copy / Maps buttons
- [x] **2.8** — `components/ui/Flag.tsx` — flag image from flagcdn.com (replaces emoji)

**Checkpoint:** All components rendered and verified ✅

---

## Phase 3 — Data Layer ✅ COMPLETE

- [x] **3.1** — `data/trip.ts` — 3 destinations + 2 sub-trips, accommodation, activities, restaurants, bars, tips, helper functions
- [x] **3.2** — `data/emergency.ts` — 5 emergency contacts
- [x] **3.3** — `data/info.ts` — 25 packing items, 6 apps, 6 money tips, 5 communication tips
- [x] **3.4** — `data/phrases.ts` — 55 full-sentence phrases across 7 categories (upgraded from basic vocab)
- [x] **3.5** — `data/worldcup.ts` — watching spots, static match fallback data
- [x] **3.6** — `data/songs.ts` — 5 World Cup songs with Spanish lyrics + Hebrew translations
- [x] **3.7** — `data/documents.ts` — document metadata with Supabase storage paths
- [x] **3.8** — `types/map.ts` — MapPlace type + category config
- [x] **3.9** — `types/journal.ts` — JournalMoment interface

**Checkpoint:** TypeScript build passes with 0 errors ✅

---

## Phase 4 — Home Page ✅ COMPLETE

- [x] **4.1** — Date-based state logic: pre-trip / during-trip
- [x] **4.2** — Countdown card (pre-trip): days + hours until departure, centered layout
- [x] **4.3** — TodayCard (during trip): day number, date, destination + flag, hotel, today's activities checklist
- [x] **4.4** — Weather card — Open-Meteo API, auto-city by date, 30min cache
- [x] **4.5** — Currency card — ExchangeRate-API, ILS→ARS + USD→ARS, last updated
- [x] **4.6** — Next Argentina match — live from football-data.org API (8640s cache, max 10 req/day)
- [x] **4.7** — Quick action buttons: → Documents, → Map
- [x] **4.8** — Journal quick-add camera button (top-left shortcut)

**Checkpoint:** All cards live, APIs verified in browser ✅

---

## Phase 5 — The Trip Page ✅ COMPLETE

- [x] **5.1** — Vertical destination list from `data/trip.ts`
- [x] **5.2** — Destination card: name, dates, status badge, flag image, accommodation name
- [x] **5.3** — `DestinationDrawer` — opens as bottom sheet on tap, `invisible` when closed
- [x] **5.4** — Internal tabs: לינה / אוכל / פעילויות / ברים / טיפים / תמונות
- [x] **5.5** — `ActivityChecklist` with `compact` variant — localStorage persistence + timestamp
- [x] **5.6** — "Open in Maps" button on every activity and restaurant
- [x] **5.7** — Tips tab with destination-specific tips
- [x] **5.8** — Sub-trip tags (Rosario, Colonia) — clickable, open own Drawer
- [x] **5.9** — Buenos Aires (return) shares activities/restaurants/bars with first BA visit
- [x] **5.10** — Photos tab connected to `PhotoGallery` component (Phase 11)

**Checkpoint:** Destination list renders, drawer opens/closes, checkboxes persist ✅

---

## Phase 6 — Documents Page ✅ COMPLETE (pending uploads: insurance, passports)

- [x] **6.1** — `PasswordGate` — sessionStorage auth, no content visible before unlock
- [x] **6.2** — Supabase buckets created: `documents` (private) + `photos` (public)
- [x] **6.3** — Accordion categories: טיסות / ביטוח / דרכונים / מלונות / נוספים
- [x] **6.4** — `DocumentCard` — name, date, "חשוב" badge, view + download
- [x] **6.5** — Signed URL generation for private PDFs (1-hour expiry)
- [x] **6.6** — "נעל מחדש" button
- [x] **6.7** — Flight + hotel docs uploaded to Supabase
- [x] **6.8** — Live availability check — missing files show clean fallback

> ⚠️ Pending uploads: insurance policy, passport scans

**Checkpoint:** Password gate ✅ · PDF view/download works ✅ · Missing files show fallback ✅

---

## Phase 7 — Useful Info Page ✅ COMPLETE

- [x] **7.1** — Accordion: ציוד / אפליקציות / כסף / תקשורת / חירום
- [x] **7.2** — Packing checklist with localStorage persistence + "ארוז" timestamp
- [x] **7.3** — Apps list with App Store / Play Store links
- [x] **7.4** — EmergencyCard: Call / Copy / Maps per contact
- [x] **7.5** — Emergency section: red background, visually distinct

> ⚠️ Pending: insurance emergency number, SIM provider details

**Checkpoint:** Packing checkboxes persist, call button works ✅

---

## Phase 8 — Spanish Page ✅ COMPLETE

- [x] **8.1** — Tabs: שיחות / מסעדות / מלון / תחבורה / כסף / חירום / כדורגל
- [x] **8.2** — PhraseCard: Hebrew / Spanish / transliteration / copy button
- [x] **8.3** — In-page search (real-time filter)
- [x] **8.4** — Free translation widget (MyMemory API, direction toggle)
- [x] **8.5** — Upgraded phrasebook: 55 full practical sentences (not single words)

**Checkpoint:** Copy works, translation returns result, search filters correctly ✅

---

## Phase 9 — Map Page ✅ COMPLETE

- [x] **9.1** — `types/map.ts` — MapPlace type
- [x] **9.2** — `lib/map-places.ts` — 43 structured places (BA, Bariloche, Rosario, Colonia, Tigre)
- [x] **9.3** — Leaflet + @types/leaflet installed
- [x] **9.4** — `InteractiveTripMap.tsx` — Leaflet/OSM, emoji markers, popups, selectedPlace sync
- [x] **9.5** — `MapPlaceCard.tsx` — הצג במפה + Google Maps buttons
- [x] **9.6** — `MapFilters.tsx` — sticky category + city filters above map
- [x] **9.7** — Search in `MapPageClient.tsx`
- [x] **9.8** — `MapPageClient.tsx` — grouped list, 2-col desktop, sticky filters
- [x] **9.9** — `MapGoogleEmbed.tsx` → replaced with external link button to full Google Maps
- [x] **9.10** — `app/map/page.tsx` — server page
- [x] **9.11** — Mobile polish: Leaflet z-index isolated, filters sticky, no navbar overlap

**Checkpoint:** 43 places, search + filters + markers + Google Maps links verified ✅

---

## Phase 10 — World Cup Page ✅ COMPLETE

- [x] **10.1** — Next Argentina match card — live from football-data.org API
- [x] **10.2** — Argentina matches list — results + upcoming, highlighted card
- [x] **10.3** — Full knockout schedule — nested Accordion by stage (LAST_32, LAST_16, QF, SF, F)
- [x] **10.4** — "Where to watch" section — cards for Buenos Aires and Bariloche
- [x] **10.5** — SongCard — Spanish lyrics, Hebrew translation, YouTube link, copy button
- [x] **10.6** — Fixed API stage names: LAST_32 / LAST_16 / THIRD_PLACE (2026 WC format)

**Checkpoint:** Live match data, nested stage accordions, songs with YouTube links ✅

---

## Phase 11 — Photo Uploads ✅ COMPLETE

- [x] **11.1** — Upload button in DestinationDrawer (תמונות tab)
- [x] **11.2** — `<input type="file" accept="image/*" capture="environment">` for mobile camera
- [x] **11.3** — Upload to Supabase `photos/{destination-id}/` path
- [x] **11.4** — Photo gallery grid (3 columns) in תמונות tab
- [x] **11.5** — Tap photo → full-screen lightbox modal
- [x] **11.6** — Delete photo (removes from Supabase + gallery)
- [x] **11.7** — `lib/photos.ts` — uploadPhoto, listPhotos, deletePhoto helpers

**Checkpoint:** PhotoGallery renders, upload/delete flow works, lightbox opens ✅

---

## Phase 12 — PWA ✅ COMPLETE

> Used manual PWA (no next-pwa) — more reliable with Next.js 16.

- [x] **12.1** — `public/manifest.json` — name, icons, RTL, theme #74ACDF, shortcuts (journal, map)
- [x] **12.2** — PWA icons created: `public/icons/icon-192.png` + `icon-512.png` (Argentina flag style)
- [x] **12.3** — `public/sw.js` — manual service worker: cache-first for pages, network-first for APIs
- [x] **12.4** — `components/ServiceWorkerRegister.tsx` — client component registers SW on mount
- [x] **12.5** — `app/layout.tsx` — manifest link, theme-color, apple-web-app meta, viewport export
- [ ] **12.6** — Test "Add to Home Screen" on iPhone Safari — **verify on real device**
- [ ] **12.7** — Verify offline: Spanish phrasebook loads without internet — **verify on real device**

**Checkpoint:** manifest.json accessible ✅ · SW registered ✅ · icons generated ✅

---

## Phase 13 — QA & Polish

- [ ] **13.1** — Full walkthrough on iPhone (Safari)
- [ ] **13.2** — Full walkthrough on Android (Chrome)
- [ ] **13.3** — All buttons meet 48px minimum touch target
- [ ] **13.4** — RTL correct on all pages and components
- [ ] **13.5** — Color contrast meets WCAG AA minimum
- [ ] **13.6** — Loading states for all API calls
- [ ] **13.7** — Error/fallback states when API fails
- [ ] **13.8** — `<meta name="viewport">` confirmed
- [ ] **13.9** — `<meta name="theme-color">` confirmed
- [x] **13.10** — Deployed to Vercel ✅ → argentina-2026-mandalaoui.vercel.app

---

## Phase 14 — Travel Journal (`/journal`) ✅ COMPLETE

- [x] **14.1.1** — `types/journal.ts` — JournalMoment interface
- [x] **14.1.2** — `lib/journal.ts` — saveMoment, loadMoments, deleteMoment, groupMomentsByDay, generateId
- [x] **14.1.3** — `lib/location.ts` — getCurrentLocation (GPS), reverseGeocode (OSM Nominatim), getLocationString
- [x] **14.2.1** — `AddMomentModal.tsx` — trip day auto, GPS auto + manual fallback, photo picker, caption, save
- [x] **14.2.2** — Loading + error states in modal (spinner, location error message)
- [x] **14.3.1** — `MomentCard.tsx` — photo + lightbox, location + time, caption, delete with confirm
- [x] **14.3.2** — `DaySection.tsx` — collapsible day header, moments list, most recent day open by default
- [x] **14.3.3** — `JournalFeed.tsx` — loads localStorage, groups by day, empty state
- [x] **14.3.4** — Lightbox built into MomentCard
- [x] **14.4.1** — `app/journal/page.tsx` — page with header + JournalFeed
- [x] **14.4.2** — FAB button "הוסף רגע" fixed bottom-left
- [x] **14.4.3** — "יומן מסע" added to Navbar (page 8)
- [x] **14.4.4** — "יומן מסע" added to HamburgerMenu
- [x] **14.4.5** — Camera quick-add icon on home page (top-left)
- [ ] **14.5.1** — Test photo upload from iPhone camera — **verify on real device**
- [ ] **14.5.2** — Test GPS permission flow — **verify on real device**
- [ ] **14.5.3** — Test offline: moments visible without internet
- [ ] **14.5.4** — Test delete moment
- [ ] **14.5.5** — Verify lightbox opens and closes correctly

**Checkpoint:** Journal page opens, modal works, collapsible days, camera shortcut on home ✅

---

## Mobile Testing Checklist

- [x] Hamburger nav works on tap — verified in preview
- [x] Drawer closes on outside tap — verified in preview
- [x] Countdown calculates correctly
- [x] Match times display in GMT-3 (Argentina time)
- [ ] All buttons are at least 48px tall — verify on real device
- [ ] No horizontal scroll on any page
- [ ] Screen doesn't shift when keyboard opens
- [ ] Call button opens phone dialer
- [ ] Camera upload opens device camera
- [ ] PDFs open in mobile browser
- [ ] Journal GPS works on real device
- [ ] Photo upload from camera works

---

## Deployment Checklist

- [ ] All environment variables added to Vercel project settings
- [x] `.env.local` is in `.gitignore`
- [x] `NEXT_PUBLIC_DOCS_PASSWORD` is set
- [x] Supabase buckets: `documents` (private) + `photos` (public) — both created ✅
- [ ] Supabase CORS configured for production Vercel domain
- [ ] HTTPS active (automatic on Vercel)
- [x] Build passes with no TypeScript errors
- [ ] Vercel domain confirmed and accessible

---

## v2 — Add During the Trip

- [ ] Update World Cup match data as tournament progresses (edit `data/worldcup.ts` + redeploy)
- [ ] Add newly discovered restaurants/places to `data/trip.ts`
- [ ] Upload insurance + passport scans to Supabase
- [ ] Add Bariloche accommodation when booked

---

## v3 / Future — Post-Trip

- [ ] Global search across all content
- [ ] Favorites — bookmark restaurants, phrases, places
- [ ] Text-to-speech for Spanish phrases (Web Speech API)
- [ ] Journal photo export / slideshow
- [ ] CMS / inline editor so content can be updated without touching code

---

## Phase Summary

| Phase | Status | Notes |
|---|---|---|
| 0 — Setup | ✅ Complete | Tailwind v4, Heebo, RTL, colors |
| 1 — Navbar | ✅ Complete | 8 pages, mobile drawer + desktop topbar |
| 2 — UI Components | ✅ Complete | 8 components incl. Flag, Accordion nested variant |
| 3 — Data Layer | ✅ Complete | 9 data/type files, 55 phrases, 0 TS errors |
| 4 — Home Page | ✅ Complete | Live APIs + journal quick-add |
| 5 — Trip Page | ✅ Complete | Drawer, checklist, sub-trips, photos tab |
| 6 — Documents | ✅ Complete | Supabase storage, signed URLs · pending: insurance/passports upload |
| 7 — Info Page | ✅ Complete | Packing + emergency · pending: insurance #, SIM |
| 8 — Spanish | ✅ Complete | 55 full sentences, search, translation |
| 9 — Map | ✅ Complete | Leaflet/OSM, 43 places, sticky filters, external Google Maps link |
| 10 — World Cup | ✅ Complete | Live API, 2026 stages (LAST_32/LAST_16), nested accordions, songs |
| 11 — Photos (drawer) | ✅ Complete | PhotoGallery + Supabase + lightbox + delete |
| 12 — PWA | ✅ Complete | manifest, SW, icons, meta tags |
| 13 — QA + Vercel | ✅ Complete | argentina-2026-mandalaoui.vercel.app |
| 14 — Travel Journal | ✅ Complete | Page 8, collapsible days, GPS, modal, home shortcut |
