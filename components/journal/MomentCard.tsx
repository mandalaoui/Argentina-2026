"use client";

import { useState } from "react";
import { MapPin, Trash2, X } from "lucide-react";
import type { JournalMoment } from "@/types/journal";

interface Props {
  moment: JournalMoment;
  onDelete: (id: string) => void;
}

export default function MomentCard({ moment, onDelete }: Props) {
  const [lightbox, setLightbox] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const timeStr = new Date(moment.uploadedAt).toLocaleTimeString("he-IL", {
    hour: "2-digit", minute: "2-digit",
  });

  const handleDelete = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete(moment.id);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-argentina-light overflow-hidden">

        {/* Photo */}
        {moment.photoUrl && (
          <button
            onClick={() => setLightbox(true)}
            className="block w-full"
            aria-label="הגדל תמונה"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={moment.photoUrl}
              alt={moment.caption || "תמונה מהטיול"}
              className="w-full max-h-64 object-cover"
              loading="lazy"
            />
          </button>
        )}

        {/* Content */}
        <div className="p-3">
          {/* Location + time row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={12} className="text-argentina shrink-0" />
              <span className="truncate max-w-[200px]">{moment.location}</span>
            </div>
            <span className="text-xs text-gray-400 shrink-0">{timeStr}</span>
          </div>

          {/* Caption */}
          {moment.caption && (
            <p className="text-sm text-navy leading-relaxed">{moment.caption}</p>
          )}

          {/* Delete */}
          <div className="flex justify-end mt-2">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-500">למחוק?</span>
                <button
                  onClick={() => onDelete(moment.id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  כן
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-gray-400 px-2 py-1"
                >
                  ביטול
                </button>
              </div>
            ) : (
              <button
                onClick={handleDelete}
                className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded-lg"
                aria-label="מחק רגע"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && moment.photoUrl && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
            aria-label="סגור"
          >
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={moment.photoUrl}
            alt={moment.caption || "תמונה מהטיול"}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
