const CACHE_NAME = "argentina2026-v2";

// Only truly static assets — NOT HTML pages
const STATIC_ASSETS = [
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/manifest.json",
];

// ─── Install ──────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  // Take over immediately — ensures new deploy is served right away
  self.skipWaiting();
});

// ─── Activate ─────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  // Claim all open clients so iOS Home Screen gets the new version immediately
  self.clients.claim();
});

// ─── Fetch ────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // External requests (APIs, CDN) — always network, no cache
  if (url.hostname !== self.location.hostname) {
    return; // let browser handle normally
  }

  // HTML / navigation requests — Network First (always fresh from Vercel)
  if (event.request.mode === "navigate" || event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((r) => r ?? new Response("Offline", { status: 503 }))
      )
    );
    return;
  }

  // Static icons & manifest — Cache First
  if (STATIC_ASSETS.some((a) => url.pathname === a)) {
    event.respondWith(
      caches.match(event.request).then((cached) =>
        cached ?? fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        })
      )
    );
    return;
  }

  // Everything else — Network First with no caching
  event.respondWith(fetch(event.request));
});
