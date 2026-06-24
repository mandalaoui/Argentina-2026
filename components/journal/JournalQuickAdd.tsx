"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import AddMomentModal from "./AddMomentModal";
import type { JournalMoment } from "@/types/journal";

export default function JournalQuickAdd() {
  const [open, setOpen] = useState(false);

  const handleSaved = (_moment: JournalMoment) => {
    // Moment saved to localStorage — nothing else needed here
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="הוסף רגע ליומן"
        className="p-2 rounded-xl hover:bg-argentina-light transition-colors"
      >
        <Camera size={24} className="text-argentina" />
      </button>

      <AddMomentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
