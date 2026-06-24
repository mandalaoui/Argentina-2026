# 04 — Implementation Plan | Argentina 2026 Hub

**Last updated:** 2026-06-24 · **Live:** argentina-2026-mandalaoui.vercel.app

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

## Pre-Development Checklist

- [x] Choose hotel in Buenos Aires → **City Express Plus by Marriott, Guatemala 4931**
- [ ] Send Bariloche accommodation details → **not booked yet**
- [x] Register for ExchangeRate-API free key → **done, in .env.local**
- [x] Get Google My Maps embed URL → **done, in .env.local**
- [ ] Scan / photograph flight tickets and passports → **flight docs located, passports pending**
- [x] Decide on documents password → **done, in .env.local**
- [x] Create Supabase project → **done, in .env.local**
- [x] Decide what to do on 04.07 and 05.07 → **Rosario (day 4) + Colonia (day 5)**
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
- [x] **0.9** — Deployed to Vercel → moved to Phase 13

---

## Phase 1 — Layout & Navigation ✅ COMPLETE

- [x] **1.1** — `Navbar.tsx` — fixed topbar, Argentina blue, logo + flag
- [x] **1.2** — `HamburgerMenu.tsx` — RTL drawer, 8 pages with icons, overlay
- [x] **1.3** — Route stubs for all 8 pages created
- [x] **1.4** — Each page shows content
- [x] **1.5** — Desktop: horizontal topbar links from `md:` breakpoint, active page highlighted

---

## Phase 2 — Base UI Components ✅ COMPLETE

- [x] **2.1** — `Card.tsx` — base card with hover + click support
- [x] **2.2** — `Badge.tsx` — status tags: עבר / היום / בקרוב / חשוב
- [x] **2.3** — `Drawer.tsx` — bottom sheet mobile, centered modal desktop
- [x] **2.4** — `Modal.tsx` — centered overlay, ESC close
- [x] **2.5** — `Accordion.tsx` — collapsible with chevron + `nested` variant
- [x] **2.6** — `Tabs.tsx` — horizontal scrollable tabs
- [x] **2.7** — `EmergencyCard.tsx` — red card with Call / Copy / Maps buttons
- [x] **2.8** — `Flag.tsx` — flag image from flagcdn.com

---

## Phase 3 — Data Layer ✅ COMPLETE

- [x] **3.1** — `data/trip.ts` — 3 destinations + 2 sub-trips, accommodation, activities, restaurants, bars, tips
- [x] **3.2** — `data/emergency.ts` — 5 emergency contacts
- [x] **3.3** — `data/info.ts` — 25 packing items, 6 apps, 6 money tips, 5 communication tips
- [x] **3.4** — `data/phrases.ts` — 55 full-sentence phrases across 7 categories
- [x] **3.5** — `data/worldcup.ts` — watching spots, static match fallback
- [x] **3.6** — `data/songs.ts` — 6 songs with Spanish lyrics + Hebrew translations + MP3 audio
- [x] **3.7** — `data/documents.ts` — document metadata with Supabase storage paths
- [x] **3.8** — `types/map.ts` — MapPlace type + category config
- [x] **3.9** — `types/journal.ts` — JournalMoment interface
- [x] **3.10** — `data/trip-days.ts` — 12-day plan with curated activities, meals, bars, match notes

---

## Phase 4 — Home Page ✅ COMPLETE

- [x] **4.1** — Date-based state logic: pre-trip / during-trip
- [x] **4.2** — Countdown card (pre-trip): days + hours, centered
- [x] **4.3** — TodayCard (during trip): day number, date, destination + flag, hotel, today's activities checklist (synced with trip page)
- [x] **4.4** — Weather card — Open-Meteo API, auto-city by date, 30min cache
- [x] **4.5** — Currency card — ExchangeRate-API, ILS→ARS + USD→ARS, centered layout
- [x] **4.6** — Next Argentina match — live from football-data.org API (8640s cache, max 10 req/day)
- [x] **4.7** — Quick action buttons: → Documents, → Map
- [x] **4.8** — Journal camera quick-add icon (top-left)

---

## Phase 5 — The Trip Page ✅ COMPLETE (redesigned)

- [x] **5.1** — Destination buttons row: בואנוס איירס / רוסאריו / קולוניה / ברילוצ'ה
- [x] **5.2** — Location sections (Word-style ▶/▼ accordion): Buenos Aires (days 1-5), Bariloche (6-9), BA return (10-12)
- [x] **5.3** — DayRow: collapsible per day, accommodation link, activities checklist, meal/bar/match suggestions
- [x] **5.4** — `DestinationDrawer` — tabs: לינה / אוכל / פעילויות / ברים / טיפים / תמונות
- [x] **5.5** — `ActivityChecklist` — Supabase persistence, compact mode + showLinks, top-aligned circles
- [x] **5.6** — Shared storage keys: checking activity in DayRow syncs with DestinationDrawer
- [x] **5.7** — Sub-trips (Rosario, Colonia) clickable → open own Drawer
- [x] **5.8** — Buenos Aires (return) shares activities with first BA visit
- [x] **5.9** — Drawer: removed dates/nights from header, removed "חזרה" from name
- [x] **5.10** — Photos tab connected to PhotoGallery (Phase 11)
- [x] **5.11** — 12-day curated plan: meals, bars, match notes per day (data/trip-days.ts)

---

## Phase 6 — Documents Page ✅ COMPLETE (pending uploads)

- [x] **6.1** — `PasswordGate` — sessionStorage auth, starts below navbar (z-20, top-14)
- [x] **6.2** — Supabase buckets: `documents` (private) + `photos` (public) + `audio` (public)
- [x] **6.3** — Accordion categories: טיסות / ביטוח / דרכונים / מלונות / נוספים
- [x] **6.4** — `DocumentCard` — name, date, "חשוב" badge, view + download
- [x] **6.5** — Signed URL generation for private PDFs (1-hour expiry)
- [x] **6.6** — "נעל מחדש" button
- [x] **6.7** — Flight + hotel docs uploaded to Supabase
- [x] **6.8** — Live availability check — missing files show clean fallback
- [ ] **6.9** — Upload: insurance PDF, passport scans (x2) → **pending**

---

## Phase 7 — Useful Info Page ✅ COMPLETE

- [x] **7.1** — Accordion: ציוד / אפליקציות / כסף / תקשורת / חירום / מתנות
- [x] **7.2** — Packing checklist — Supabase persistence, circle aligned to top line
- [x] **7.3** — Apps list with App Store / Play Store links
- [x] **7.4** — EmergencyCard: Call / Copy / Maps
- [x] **7.5** — Emergency section: red background
- [x] **7.6** — Gifts list: password protected, editable 2-col table, done/lock states, Supabase persistence
- [x] **7.7** — All accordions closed by default

---

## Phase 8 — Spanish Page ✅ COMPLETE

- [x] **8.1** — Tabs: שיחות / מסעדות / מלון / תחבורה / כסף / חירום / כדורגל
- [x] **8.2** — PhraseCard: Hebrew / Spanish / transliteration / copy button
- [x] **8.3** — In-page search (real-time filter)
- [x] **8.4** — Free translation widget (MyMemory API, direction toggle)
- [x] **8.5** — 55 full practical sentences (not single words)

---

## Phase 9 — Map Page ✅ COMPLETE

- [x] **9.1** — `types/map.ts` — MapPlace type
- [x] **9.2** — `lib/map-places.ts` — 43 structured places
- [x] **9.3** — Leaflet + @types/leaflet installed
- [x] **9.4** — `InteractiveTripMap.tsx` — Leaflet/OSM, emoji markers, popups, double-init guard
- [x] **9.5** — `MapPlaceCard.tsx` — הצג במפה + Google Maps buttons
- [x] **9.6** — `MapFilters.tsx` — sticky category + city filters above map
- [x] **9.7** — Search in `MapPageClient.tsx`
- [x] **9.8** — `MapPageClient.tsx` — grouped list, 2-col desktop, sticky filters, Leaflet z-index isolated
- [x] **9.9** — Google Maps iframe → replaced with external link button
- [x] **9.10** — `app/map/page.tsx` — server page

---

## Phase 10 — World Cup Page ✅ COMPLETE

- [x] **10.1** — Next Argentina match card — live from football-data.org API
- [x] **10.2** — Argentina matches list — results + upcoming, highlighted card, centered layout
- [x] **10.3** — Full knockout schedule — nested Accordion by stage (LAST_32, LAST_16, QF, SF, THIRD_PLACE, F) — auto-opens stage with next Argentina match
- [x] **10.4** — "Where to watch" section — Buenos Aires and Bariloche
- [x] **10.5** — SongCard — Spanish lyrics, Hebrew translation, YouTube link, copy button, MP3 AudioPlayer
- [x] **10.6** — AudioPlayer — seekbar (LTR), centered controls, time on right, Supabase audio bucket
- [x] **10.7** — Fixed API stage names: LAST_32 / LAST_16 / THIRD_PLACE (2026 WC format)
- [x] **10.8** — GMT-3 timezone label (replaced "(ארגנטינה)")
- [x] **10.9** — 6 songs: Muchachos, La Cuarta Estrella, Vamos Vamos Argentina, Brasil Decime, Dale Campeón, Soy Argentino
- [x] **10.10** — 4 MP3 files uploaded to Supabase audio bucket

---

## Phase 11 — Photo Uploads ✅ COMPLETE

- [x] **11.1** — Upload button in DestinationDrawer (תמונות tab)
- [x] **11.2** — `<input type="file" accept="image/*" capture="environment">`
- [x] **11.3** — Upload to Supabase `photos/{destination-id}/`
- [x] **11.4** — Photo gallery grid (3 columns)
- [x] **11.5** — Tap photo → full-screen lightbox
- [x] **11.6** — Delete photo (Supabase + gallery)
- [x] **11.7** — `lib/photos.ts` — uploadPhoto, listPhotos, deletePhoto

---

## Phase 12 — PWA ✅ COMPLETE

- [x] **12.1** — `public/manifest.json` — name, icons, RTL, theme #74ACDF, shortcuts
- [x] **12.2** — PWA icons: `icon-192.png` + `icon-512.png` (Argentina flag style)
- [x] **12.3** — `public/sw.js` — manual service worker, cache-first for pages, disabled in dev
- [x] **12.4** — `ServiceWorkerRegister.tsx` — registers SW on mount (production only)
- [x] **12.5** — `app/layout.tsx` — manifest link, theme-color, apple-web-app meta, viewport
- [ ] **12.6** — Test "Add to Home Screen" on iPhone Safari — **verify on real device**
- [ ] **12.7** — Verify offline: Spanish phrasebook loads without internet

---

## Phase 13 — Deploy ✅ COMPLETE

- [x] **13.1** — Push to GitHub: https://github.com/mandalaoui/Argentina-2026
- [x] **13.2** — Deploy to Vercel with all env vars
- [x] **13.3** — Production URL: **argentina-2026-mandalaoui.vercel.app** ✅
- [ ] **13.4** — Change documents password from `12345678` → strong password in Vercel env vars
- [ ] **13.5** — Supabase: `ALTER TABLE app_data DISABLE ROW LEVEL SECURITY;` — **run this!**

---

## Phase 14 — Travel Journal ✅ COMPLETE

- [x] **14.1** — `types/journal.ts`, `lib/journal.ts`, `lib/location.ts` (GPS + OSM Nominatim)
- [x] **14.2** — `AddMomentModal.tsx` — trip day auto, GPS auto + manual, photo, caption, Supabase save
- [x] **14.3** — `MomentCard.tsx` + `DaySection.tsx` (collapsible) + `JournalFeed.tsx`
- [x] **14.4** — `/journal` page + FAB button + Navbar item + camera shortcut on home
- [x] **14.5** — Password gate (same as documents)
- [ ] **14.6** — Test GPS permission + photo upload on real iPhone

---

## Phase 15 — Supabase Data Migration ✅ COMPLETE

- [x] **15.1** — `lib/supabase-storage.ts` — generic dbGet / dbSet / dbDelete
- [x] **15.2** — `app_data` table created in Supabase (key TEXT PRIMARY KEY, value JSONB)
- [x] **15.3** — ActivityChecklist → Supabase (all destination + day checklists)
- [x] **15.4** — PackingChecklist → Supabase
- [x] **15.5** — JournalFeed + AddMomentModal → Supabase
- [x] **15.6** — GiftsList → Supabase
- [ ] **15.7** — `ALTER TABLE app_data DISABLE ROW LEVEL SECURITY;` — **still needed!**

---

## Supabase — מצב

| Bucket/Table | סטטוס | תוכן |
|---|---|---|
| `documents` (private) | ✅ | טיסות, מלון · חסר: ביטוח, דרכונים |
| `photos` (public) | ✅ | תמונות יומן מסע |
| `audio` (public) | ✅ | 4 MP3 שירי מונדיאל |
| `app_data` (table) | ✅ created · ⚠️ RLS on | פעילויות, ציוד, יומן, מתנות |

---

## APIs — מצב

| API | סטטוס | Cache |
|---|---|---|
| Open-Meteo | ✅ חינמי | 30 דקות |
| ExchangeRate-API | ✅ | שעה |
| football-data.org | ✅ 10 req/day | 2.4 שעות |
| MyMemory | ✅ חינמי | — |
| OSM Nominatim | ✅ חינמי | — |
| Supabase | ✅ | — |

---

## ⚠️ טרם בוצע — לפני הטיול

### קריטי

- [ ] `ALTER TABLE app_data DISABLE ROW LEVEL SECURITY;` — **חוסם שמירת כל הנתונים!**
- [ ] שנה סיסמה מ-`12345678` בVercel env vars
- [ ] לינה ברילוצ'ה — עדיין לא נבחרה → לעדכן ב-`data/trip.ts` + `data/trip-days.ts`
- [ ] ביטוח נסיעות — חברה, פוליסה, טלפון → `data/emergency.ts`
- [ ] דרכונים + ביטוח PDF → upload ל-Supabase `documents/`

### חשוב

- [ ] Buquebus לקולוניה — אישור + שעה
- [ ] תחבורה לרוסאריו — אישור + שעה
- [ ] SIM / eSIM — ספק ופרטים → `data/info.ts`
- [ ] בדיקה על iPhone: PWA install, GPS, מצלמה, PDF, שמירת נתונים

### v2 — במהלך הטיול

- [ ] WC matches — יתעדכנו אוטומטית מה-API
- [ ] הוסף מסעדות / מקומות שגיליתם בשטח
- [ ] יומן מסע — להוסיף רגעים מדי יום
- [ ] מתנות — למלא את הרשימה

### v3 — אחרי הטיול

- [ ] חיפוש גלובלי
- [ ] מועדפים
- [ ] ייצוא גלריית יומן
- [ ] Text-to-speech לביטויים ספרדיים
