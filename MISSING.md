# Missing Information — Argentina 2026 Hub

Complete everything on this list before development begins.
Mark each item ✅ when done.

---

## 1. Documents to Upload → `assets/` folder

| # | Document | Folder | Status |
|---|---|---|---|
| 1 | Flight TLV → Buenos Aires (PDF/QR) | `assets/flights/` | ⬜ |
| 2 | Internal flight Buenos Aires → Bariloche (PDF/QR) | `assets/flights/` | ⬜ |
| 3 | Internal flight Bariloche → Buenos Aires (PDF/QR) | `assets/flights/` | ⬜ |
| 4 | Return flight Buenos Aires → TLV (PDF/QR) | `assets/flights/` | ⬜ |
| 5 | Travel insurance policy (PDF) | `assets/insurance/` | ⬜ |
| 6 | Passport scan — traveler 1 (JPG or PDF) | `assets/passports/` | ⬜ |
| 7 | Passport scan — traveler 2 (JPG or PDF) | `assets/passports/` | ⬜ |
| 8 | Hotel booking confirmation — Buenos Aires (PDF) | `assets/hotels/` | ⬜ |
| 9 | Hotel booking confirmation — Bariloche (PDF) | `assets/hotels/` | ⬜ |

---

## 2. Accommodation Details

| # | Item | Status |
|---|---|---|
| 10 | Buenos Aires hotel — **final name** (Color Botanico / Casa Joseph / Hotel Costa Rica) | ⬜ |
| 11 | Buenos Aires hotel — **address** | ⬜ |
| 12 | Buenos Aires hotel — **Booking.com confirmation link** | ⬜ |
| 13 | Bariloche accommodation — **name** | ⬜ |
| 14 | Bariloche accommodation — **address** | ⬜ |
| 15 | Bariloche accommodation — **Booking.com confirmation link** | ⬜ |

---

## 3. Flight Details (for data files — not just the PDF)

| # | Item | Status |
|---|---|---|
| 16 | TLV → EZE — flight number, departure time, arrival time | ⬜ |
| 17 | BUE → BRC — flight number, departure time, arrival time (06.07) | ⬜ |
| 18 | BRC → BUE — flight number, departure time, arrival time (10.07) | ⬜ |
| 19 | EZE → TLV — flight number, departure time, arrival time (12.07) | ⬜ |

---

## 4. Emergency Information

| # | Item | Status |
|---|---|---|
| 20 | Travel insurance — **company name** | ⬜ |
| 21 | Travel insurance — **policy number** | ⬜ |
| 22 | Travel insurance — **24/7 emergency phone number** | ⬜ |
| 23 | Emergency contact in Israel — **name** | ⬜ |
| 24 | Emergency contact in Israel — **phone number** | ⬜ |
| 25 | Israeli Embassy Buenos Aires — verify phone: +54-11-4338-2500 | ⬜ |

---

## 5. APIs & Services — Registration Required

| # | Service | Action needed | Status |
|---|---|---|---|
| 26 | **ExchangeRate-API** | Register free at https://www.exchangerate-api.com/ → copy API key | ⬜ |
| 27 | **Supabase** | Create new project at https://supabase.com → copy URL + Anon Key | ⬜ |
| 28 | **Google My Maps** | Open your map → Share → Embed → copy the `src` URL from the iframe code | ⬜ |

---

## 6. Environment Variables — Fill in `.env.local`

Once you complete the registrations above, fill in these values:

```env
NEXT_PUBLIC_SUPABASE_URL=           ← from Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=      ← from Supabase project settings
NEXT_PUBLIC_EXCHANGE_API_KEY=       ← from ExchangeRate-API dashboard
NEXT_PUBLIC_DOCS_PASSWORD=          ← choose any password for the documents page
NEXT_PUBLIC_MAPS_EMBED_URL=         ← the Google My Maps embed src URL
```

---

## 7. Trip Planning — Still Open

| # | Item | Status |
|---|---|---|
| 29 | Day 04.07 — Rosario day trip OR Colonia day trip? | ⬜ |
| 30 | Day 05.07 — the other day trip (whichever wasn't chosen above) | ⬜ |
| 31 | Colonia del Sacramento — confirm Buquebus booking (or other transport) | ⬜ |
| 32 | Rosario — confirm transport from Buenos Aires (bus / train / flight?) | ⬜ |

---

## 8. Nice-to-Have Content (not blocking development)

| # | Item | Status |
|---|---|---|
| 33 | Specific restaurant names in Bariloche | ⬜ |
| 34 | Specific bars / nightlife spots in Bariloche | ⬜ |
| 35 | SIM / eSIM details — which provider, data plan | ⬜ |
| 36 | Any additional World Cup songs to add | ⬜ |

---

## Summary

| Category | Total Items | Blocking dev? |
|---|---|---|
| Documents to upload | 9 | No — can start dev without |
| Accommodation details | 6 | Yes — needed for Trip page data |
| Flight details | 4 | No — can add later |
| Emergency info | 6 | No — placeholders ok for now |
| APIs & services | 3 | Yes — needed before first deploy |
| Environment variables | 5 | Yes — needed before first deploy |
| Trip planning | 4 | Partial — dates needed |
| Nice-to-have | 4 | No |
