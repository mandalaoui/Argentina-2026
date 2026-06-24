"use client";

import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";
import Flag from "@/components/ui/Flag";
import { checkPassword, unlockDocuments } from "@/lib/documents-auth";

interface Props {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (checkPassword(password)) {
      unlockDocuments();
      onUnlock();
    } else {
      setError("סיסמה שגויה — נסה שוב");
      setPassword("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 top-14 z-20 flex items-center justify-center bg-navy/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-argentina-light flex items-center justify-center">
            <Lock size={28} className="text-argentina" />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-navy flex items-center justify-center gap-2">
          מסמכים <Flag code="AR" size={22} />
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-6">
          הזן סיסמה כדי לצפות במסמכי הטיול
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
            autoComplete="current-password"
            className="w-full rounded-xl border border-argentina-light px-4 py-3 text-navy text-right focus:outline-none focus:ring-2 focus:ring-argentina min-h-12"
            dir="ltr"
          />

          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!password || isSubmitting}
            className="w-full bg-argentina text-white rounded-xl px-4 py-3 font-medium min-h-12 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-argentina/90 transition-colors"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}
