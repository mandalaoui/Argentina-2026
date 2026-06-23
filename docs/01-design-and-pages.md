# 01 — Design & Pages | Argentina 2026 Hub

---

## Product Concept

A personal web system for a trip to Argentina. Centralizes everything needed: itinerary, destinations, documents, map, World Cup, Spanish phrasebook, and recommendations. Designed primarily for mobile, responsive on desktop. All UI text is in Hebrew (RTL), except Spanish-language content sections.

---

## UX Principles — Mobile First

- All pages are designed first for 390px width (iPhone 14 Pro)
- No horizontal scrolling
- Minimum button height: 48px — comfortable for thumb taps
- Bottom padding of 80px on all pages (clearance from bottom nav if added later)
- High contrast — readable in sunlight
- No hover-only interactions — everything works on tap
- Vertical scroll only
- All text is RTL, right-aligned by default

---

## Visual Language

### Color Palette — Argentina Flag

| Name | HEX | Usage |
|---|---|---|
| Argentina Blue | `#74ACDF` | Primary color, buttons, header |
| Light Blue | `#E8F4FD` | Card backgrounds, page backgrounds |
| White | `#FFFFFF` | Main background, cards |
| Deep Navy | `#2C5282` | Primary text, headings |
| Sun Yellow | `#F6C90E` | Highlights, "important" tags, CTA buttons |
| Soft Gray | `#F7F8FA` | Secondary background |
| Text Gray | `#6B7280` | Secondary text, labels |

### Typography

- **Font**: Heebo (Google Fonts) — full Hebrew support
- H1: `text-2xl font-bold` — 24px
- H2: `text-xl font-semibold` — 20px
- Body: `text-base` — 16px
- Secondary text: `text-sm text-gray-500` — 14px
- Labels / Tags: `text-xs` — 12px
- Direction: `dir="rtl"`, `lang="he"`

### Cards

```
bg-white rounded-2xl shadow-sm border border-blue-100 p-4
```
- Rounded corners: `rounded-2xl` (16px)
- Subtle shadow: `shadow-sm`
- Border: `border border-[#74ACDF]/20`
- Internal padding: `p-4`

### Buttons

| Type | Style |
|---|---|
| Primary (blue) | `bg-[#74ACDF] text-white rounded-xl px-4 py-3 font-medium` |
| Secondary (outline) | `border border-[#74ACDF] text-[#74ACDF] rounded-xl px-4 py-3` |
| Highlight (yellow) | `bg-[#F6C90E] text-[#2C5282] rounded-xl px-4 py-3 font-bold` |
| Emergency (red) | `bg-red-500 text-white rounded-xl px-4 py-3 font-bold` |

---

## Navbar

### Mobile — Fixed Topbar

```
fixed top-0 left-0 right-0 z-50
bg-[#74ACDF] text-white h-14 flex items-center justify-between px-4
```

- **Left** (RTL = visual right): Hamburger button (☰)
- **Center**: Name `Argentina 2026` + flag 🇦🇷
- **Right** (RTL = visual left): Empty / search icon (v2)

### Hamburger Drawer

Opens from the right (RTL layout):
```
fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50
```
- Close button ✕ in top-right corner
- Dark overlay behind the drawer
- Page list with icons:

| Page (Hebrew) | Icon |
|---|---|
| 🏠 בית | Home |
| 🗺️ הטיול | Map |
| 📍 מפה | Location |
| 📄 מסמכים | File |
| ℹ️ מידע שימושי | Info |
| 🇦🇷 ספרדית | MessageSquare |
| ⚽ מונדיאל | Trophy |

### Desktop — Standard Topbar

```
bg-[#74ACDF] text-white h-16 flex items-center justify-between px-8
```
- **Left**: Logo + name
- **Center**: Horizontal nav links for all 7 pages
- **Right**: Empty / search

---

## Page Structure

### Page Order in Navigation

1. בית (Home)
2. הטיול (The Trip)
3. מפה (Map)
4. מסמכים (Documents)
5. מידע שימושי (Useful Info)
6. ספרדית (Spanish)
7. מונדיאל (World Cup)

---

## Page 1 — Home (`/`)

### Pre-Trip State (before 01.07.2026)

**Countdown Card**
- Days until departure
- Departure date: 30.06.2026
- First destination: Buenos Aires

**Weather Card**
- Current weather in Buenos Aires
- Open-Meteo API (no key required)
- Temperature + description + icon

**Currency Card**
- ILS → ARS (Shekel to Peso)
- USD → ARS (Dollar to Peso)
- ExchangeRate-API (free tier)

**Next Argentina Match Card**
- Teams, date, local time (Argentina GMT-3)
- Sourced from static `data/worldcup.ts`

**Quick Action Buttons**
- → Documents
- → Map

---

### During-Trip State (01.07–12.07.2026)

**"Today in the Trip" Card**
- `יום 4 מתוך 12`
- Today's date
- Current destination + flag

**"Today's Plan" Card**
- Tonight's accommodation name
- Planned activities for today

**"Next Argentina Match" Card**
- Name + date + local time

**Weather Card**
- Auto-updates to current destination's weather

**Currency Card**
- ILS → ARS, USD → ARS

**Quick Action Buttons**
- → Documents
- → Map

---

## Page 2 — The Trip (`/trip`)

### Main View

Vertical timeline — one card per destination:

```
Destination Card:
- Destination name (Hebrew + Spanish city name)
- Date range (DD.MM–DD.MM)
- Number of nights
- Hero image (if uploaded)
- Status badge: [עבר ✓] / [היום 🔵] / [בקרוב]
- "Open" button
```

### Destination Order

1. Buenos Aires — 01.07–06.07 (5 nights)
2. San Carlos de Bariloche — 06.07–10.07 (4 nights)
3. Buenos Aires (return) — 10.07–12.07 (2 nights)
4. Rosario — day trip (sub-destination under Buenos Aires)
5. Colonia del Sacramento — day trip (sub-destination under Buenos Aires)

### Destination Drawer

Opens as a full-screen bottom sheet (90% height) on tap:

**Internal Tabs:**

| Tab (Hebrew) | Content |
|---|---|
| 🏨 לינה | Accommodation name, address, Booking link, notes |
| 🍽️ אוכל | Restaurant list + map button per item |
| 🎯 פעילויות | Activity checklist with completion tracking |
| 🍺 ברים / לילה | Bars and nightlife areas |
| 💡 טיפים | Destination-specific tips and recommendations |
| 📸 תמונות | Photo gallery + upload button |

**Each Activity/Attraction Item:**
- Checkbox — done / not done
- Completion date (auto-saved when checked)
- "Open in Maps" button
- "Details" button (optional nested modal)

---

## Page 3 — Map (`/map`)

- Full-screen Google My Maps iframe
- Height: `calc(100vh - 56px)` (minus navbar)
- Width: 100%
- Filter buttons above map (v2 — not in v1)
- v1: Simple iframe only

```html
<iframe
  src="[GOOGLE_MY_MAPS_EMBED_URL]"
  class="w-full h-[calc(100vh-56px)]"
  loading="lazy"
/>
```

---

## Page 4 — Documents (`/documents`)

### Lock Screen

- Blurred / dark background
- Centered password field
- "כניסה" button
- No content exposed before authentication
- URL reveals no sensitive info

### After Authentication

Category cards (Accordion per category):

| Category (Hebrew) | Icon |
|---|---|
| ✈️ טיסות | Plane |
| 🛡️ ביטוח | Shield |
| 📘 דרכונים | BookOpen |
| 🏨 מלונות | Building |
| 📄 מסמכים נוספים | File |

**Each Document — Card:**
- Name
- Relevant date
- "חשוב" badge (yellow) if flagged
- "צפה" button (opens PDF in modal or new tab)
- "הורד" button

**"נעל מחדש" button** — in page footer

---

## Page 5 — Useful Info (`/info`)

Accordion layout by category:

### Categories

1. **🎒 ציוד** — Packing list with checkboxes
2. **📱 אפליקציות** — App icon + name + download link
3. **💰 כסף** — Cash tips, credit card, exchange rate advice
4. **📡 תקשורת** — SIM/eSIM, WiFi, important numbers
5. **🆘 חירום** — Emergency contacts with action buttons

### Emergency Section — Special Design

```
bg-red-50 border border-red-200 rounded-2xl p-4
```

Each emergency entry:
- Contact name (bold)
- Phone number
- 📞 Call button (`tel:` link)
- 📋 Copy number button
- 📍 Open in Maps button (where applicable)

---

## Page 6 — Spanish (`/spanish`)

### Top Tabs (Hebrew labels)

```
שיחות | מסעדות | מלון | תחבורה | כסף | חירום | כדורגל
```

### Each Phrase — Card

```
┌─────────────────────────────────┐
│ 🇮🇱 אפשר חשבון בבקשה?           │
│ 🇦🇷 La cuenta, por favor        │
│ 🔤 לה קוואנטה, פור פבור         │
│ [📋 העתק]                       │
└─────────────────────────────────┘
```

### Free Translation (bottom of page)

- Textarea input
- Direction toggle: Hebrew → Spanish / Spanish → Hebrew
- "תרגם" button
- MyMemory API (free, no key required)

---

## Page 7 — World Cup (`/worldcup`)

### "Next Argentina Match" Card

- Teams
- Date and time (Argentina timezone GMT-3)
- Stage (Round of 16 / Quarter / Semi / Final)
- Stadium + city

### Full Schedule (Accordion by Stage)

- Round of 16
- Quarter-finals
- Semi-finals
- Final
- Each row: Date | Teams | Time | City
- Argentina matches highlighted with badge

### Where to Watch — Buenos Aires & Bariloche

Cards with:
- Bar / venue name
- Area of the city
- "פתח במפה" button
- Short tip (atmosphere, price, recommendation)

### Argentina World Cup Songs

Each song — card:

```
┌─────────────────────────────────┐
│ 🎵 Muchachos                    │
│ Short description (Hebrew)      │
│ ─────────────────────────────── │
│ Muchachos, ahora nos volvimos   │  ← Spanish
│ a ilusionar...                  │
│ [Hebrew translation — small]    │
│ ─────────────────────────────── │
│ [▶ פתח YouTube] [📋 העתק]       │
└─────────────────────────────────┘
```

---

## Shared Components

| Component | Description |
|---|---|
| `<Card>` | Base card wrapper for all UI |
| `<Drawer>` | Bottom sheet / side panel |
| `<Modal>` | Centered overlay for images and PDFs |
| `<Accordion>` | Collapsible content section |
| `<Tabs>` | Horizontal tab navigation inside a page |
| `<Checkbox>` | Completion toggle with date auto-save |
| `<Badge>` | Status tag (עבר / היום / בקרוב / חשוב) |
| `<EmergencyCard>` | Emergency contact card with action buttons |
| `<PhraseCard>` | Spanish phrase card |
| `<SongCard>` | World Cup song card |
| `<DocumentCard>` | Document card with view/download |

---

## Accessibility

- `aria-label` on all icon-only buttons
- `role="dialog"` on Drawers and Modals
- Focus trap inside hamburger menu and modals
- Color contrast meets WCAG AA minimum
- No font sizes below 14px

---

## PWA (Progressive Web App)

PWA allows the site to be "installed" as an app from the browser.
On iPhone: Safari → Share → "Add to Home Screen" → behaves like a native app.

Required:
- `manifest.json` with name, icons, theme color (Argentina blue)
- `service-worker.js` for basic asset caching (offline support)
- Next.js: use `next-pwa` package

Theme color: `#74ACDF`

---

## Desktop Responsiveness

- Standard topbar (no hamburger) from `md:` breakpoint up
- Cards expand up to max-width 768px, centered
- 2-column grid for home page cards on desktop
- Drawers become centered modals on desktop
