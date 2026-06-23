# Missing Information — Argentina 2026 Hub

Complete everything on this list before development begins.

---

## 1. Documents to Upload → `assets/` folder

| # | Document | Folder | Status |
|---|---|---|---|
| 1 | Flight TLV → Buenos Aires — Issta confirmation PDF | `assets/flights/` | ✅ Located at Documents/omer/flights/ |
| 2 | Internal flights BUE ↔ BRC — Aerolineas Argentinas PDFs | `assets/flights/` | ✅ Located at Documents/omer/flights/ |
| 3 | Travel insurance policy (PDF) | `assets/insurance/` | ⬜ TODO |
| 4 | Passport scan — Shimon Mandalaoui (JPG or PDF) | `assets/passports/` | ⬜ TODO |
| 5 | Passport scan — Omer Mandalaoui (JPG or PDF) | `assets/passports/` | ⬜ TODO |
| 6 | Hotel booking confirmation — Buenos Aires (PDF) | `assets/hotels/` | ✅ Located at Documents/omer/flights/ |
| 7 | Hotel booking confirmation — Bariloche (PDF) | `assets/hotels/` | ⬜ Not yet booked |

---

## 2. Accommodation Details

| # | Item | Value | Status |
|---|---|---|---|
| 8 | Buenos Aires hotel — name | City Express Plus by Marriott Buenos Aires Palermo | ✅ |
| 9 | Buenos Aires hotel — address | Guatemala 4931, Buenos Aires, 1425 Argentina | ✅ |
| 10 | Buenos Aires hotel — check-in | Wed 01.07 at 15:00 | ✅ |
| 11 | Buenos Aires hotel — check-out | Mon 06.07 at 12:00 | ✅ |
| 12 | Buenos Aires hotel — itinerary # | Hotels.com #72075569908945 | ✅ |
| 13 | Buenos Aires hotel — phone | +54 (1) 145566700 | ✅ |
| 14 | Bariloche accommodation — name | ⬜ Not yet booked | ⬜ |
| 15 | Bariloche accommodation — address | ⬜ Not yet booked | ⬜ |
| 16 | Bariloche accommodation — booking link | ⬜ Not yet booked | ⬜ |

---

## 3. Flight Details

| # | Route | Airline | Flight # | Departure | Arrival | Status |
|---|---|---|---|---|---|---|
| 17 | TLV → MAD | Air Europa | UX1302 | 30.06 16:05 (TLV) | 30.06 20:20 (MAD) | ✅ |
| 18 | MAD → EZE | Air Europa | UX41 | 30.06 23:55 (MAD) | 01.07 07:40 (EZE) | ✅ |
| 19 | EZE → BRC | Aerolineas Argentinas | AR1670 | 06.07 07:45 (EZE) | 06.07 10:10 (BRC) | ✅ |
| 20 | BRC → EZE | Aerolineas Argentinas | AR1925 | 10.07 09:00 (BRC) | 10.07 11:05 (EZE) | ✅ |
| 21 | EZE → MAD | Air Europa | UX42 | 12.07 12:10 (EZE) | 13.07 05:10 (MAD) | ✅ |
| 22 | MAD → TLV | Air Europa | UX1301 | 13.07 08:35 (MAD) | 13.07 14:10 (TLV) | ✅ |

---

## 4. Emergency Information

| # | Item | Value | Status |
|---|---|---|---|
| 23 | Travel insurance — company | ⬜ TODO | ⬜ |
| 24 | Travel insurance — policy number | ⬜ TODO | ⬜ |
| 25 | Travel insurance — 24/7 emergency phone | ⬜ TODO | ⬜ |
| 26 | Israeli Embassy Buenos Aires | +54-11-4338-2500 (to verify) | ⬜ verify |

---

## 5. APIs & Services

| # | Service | Status | Notes |
|---|---|---|---|
| 27 | Supabase URL | ✅ | In `.env.local` |
| 28 | Supabase Anon Key | ✅ | In `.env.local` |
| 29 | ExchangeRate-API Key | ✅ | In `.env.local` |
| 30 | Documents Password | ✅ (temp: 12345678) | Change before trip |
| 31 | Google My Maps embed URL | ✅ | In `.env.local` |

### ⚠️ Google Maps Embed URL — Action Required

The link provided (`maps.app.goo.gl/...`) is a mobile share link — **not** an embed URL.

To get the correct embed URL:
1. Open Google My Maps on **desktop** Chrome
2. Click the map you want to embed
3. Click the ⋮ menu → **Share** → **Embed on my site**
4. Copy the `src="..."` value from the iframe code
5. Paste it into `.env.local` as `NEXT_PUBLIC_MAPS_EMBED_URL`

---

## 6. Trip Planning — Still Open

| # | Item | Status |
|---|---|---|
| 32 | Day 04.07 — Rosario or Colonia? | ⬜ |
| 33 | Day 05.07 — the other day trip | ⬜ |
| 34 | Colonia del Sacramento — confirm transport (Buquebus?) | ⬜ |
| 35 | Rosario — confirm transport from Buenos Aires | ⬜ |

---

## 7. Nice-to-Have (not blocking development)

| # | Item | Status |
|---|---|---|
| 36 | Specific restaurant names in Bariloche | ⬜ |
| 37 | Specific bars / nightlife spots in Bariloche | ⬜ |
| 38 | SIM / eSIM details — which provider | ⬜ |
| 39 | Additional World Cup songs to add | ⬜ |

---

## Summary

| Category | Done | Remaining |
|---|---|---|
| Documents to upload | 3 / 7 | 4 (insurance, passports x2, Bariloche hotel) |
| Accommodation | 6 / 9 | 3 (Bariloche — not booked) |
| Flight details | 6 / 6 | ✅ Complete |
| Emergency info | 0 / 4 | 4 |
| APIs & services | 4 / 5 | 1 (Maps embed URL) |
| Trip planning | 0 / 4 | 4 |
