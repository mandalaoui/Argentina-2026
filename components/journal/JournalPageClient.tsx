"use client";

import { useEffect, useState } from "react";
import Flag from "@/components/ui/Flag";
import PasswordGate from "@/components/documents/PasswordGate";
import JournalFeed from "./JournalFeed";
import { isDocumentsUnlocked } from "@/lib/documents-auth";

export default function JournalPageClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUnlocked(isDocumentsUnlocked());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main>
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-navy">יומן מסע</h1>
        <Flag code="AR" size={26} />
      </div>
      <p className="px-4 text-xs text-gray-400 mb-4">
        רגעים מהטיול — תמונות, מיקומים, זיכרונות
      </p>
      <JournalFeed />
    </main>
  );
}
