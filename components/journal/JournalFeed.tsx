"use client";

import { useEffect, useState, useCallback } from "react";
import { Camera } from "lucide-react";
import { loadMoments, deleteMoment, groupMomentsByDay } from "@/lib/journal";
import { deletePhoto } from "@/lib/photos";
import type { JournalMoment } from "@/types/journal";
import DaySection from "./DaySection";
import AddMomentModal from "./AddMomentModal";

export default function JournalFeed() {
  const [moments, setMoments] = useState<JournalMoment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadMoments().then((data) => {
      setMoments(data);
      setMounted(true);
    });
  }, []);

  const handleSaved = useCallback((moment: JournalMoment) => {
    setMoments((prev) => [moment, ...prev]);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const moment = moments.find((m) => m.id === id);
    setMoments((prev) => prev.filter((m) => m.id !== id));
    await deleteMoment(id);
    // Delete photo from Supabase if exists
    if (moment?.photoPath) {
      await deletePhoto(moment.photoPath).catch(() => {});
    }
  }, [moments]);

  const grouped = groupMomentsByDay(moments);

  if (!mounted) return null;

  return (
    <>
      <div className="p-4 max-w-lg mx-auto pb-24">

        {/* Empty state */}
        {moments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <Camera size={48} className="text-gray-200" />
            <p className="font-semibold text-gray-400">עדיין אין רגעים</p>
            <p className="text-sm text-gray-300">
              לחץ על + למטה כדי להוסיף את הרגע הראשון
            </p>
          </div>
        )}

        {/* Feed — only the most recent day is open by default */}
        {Array.from(grouped.entries()).map(([day, dayMoments], index) => (
          <DaySection
            key={day}
            day={day}
            moments={dayMoments}
            onDelete={handleDelete}
            defaultOpen={index === 0}
          />
        ))}

      </div>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 left-4 z-30 flex items-center gap-2 bg-argentina text-white px-5 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity font-semibold text-sm"
        aria-label="הוסף רגע"
      >
        <Camera size={18} />
        + הוסף רגע
      </button>

      <AddMomentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}
