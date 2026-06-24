"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in production — SW conflicts with Next.js HMR in dev
    if (process.env.NODE_ENV !== "production") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("[PWA] Service worker registered"))
        .catch((err) => console.warn("[PWA] SW registration failed:", err));
    }
  }, []);

  return null;
}
