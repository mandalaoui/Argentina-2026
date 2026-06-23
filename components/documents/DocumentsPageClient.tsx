"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PasswordGate from "@/components/documents/PasswordGate";
import DocumentsView from "@/components/documents/DocumentsView";
import { isDocumentsUnlocked, lockDocuments } from "@/lib/documents-auth";

export default function DocumentsPageClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUnlocked(isDocumentsUnlocked());
    setMounted(true);
  }, []);

  const handleLock = () => {
    lockDocuments();
    setUnlocked(false);
  };

  if (!mounted) {
    return null;
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main className="p-4 max-w-lg mx-auto pb-24">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
          מסמכים <Flag code="AR" size={28} />
        </h1>
        <p className="text-sm text-gray-400 mt-1">מסמכי טיסות, מלונות וביטוח</p>
      </div>

      <DocumentsView />

      <div className="mt-8 pt-4 border-t border-argentina-light">
        <button
          onClick={handleLock}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-xl px-4 py-3 font-medium min-h-12 hover:bg-soft-gray transition-colors"
        >
          <Lock size={18} />
          נעל מחדש
        </button>
      </div>
    </main>
  );
}
