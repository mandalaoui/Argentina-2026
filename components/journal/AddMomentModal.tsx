"use client";

import { useEffect, useRef, useState } from "react";
import {
  X, Camera, MapPin, Loader2, Navigation, AlertCircle, CheckCircle2
} from "lucide-react";
import { getTripDayInfo, getCurrentDestination } from "@/data/trip";
import { getLocationString } from "@/lib/location";
import { saveMoment, generateId } from "@/lib/journal";
import { uploadPhoto } from "@/lib/photos";
import type { JournalMoment } from "@/types/journal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (moment: JournalMoment) => void;
}

type LocationState = "idle" | "loading" | "done" | "error" | "manual";

export default function AddMomentModal({ isOpen, onClose, onSaved }: Props) {
  const dayInfo = getTripDayInfo();
  const dest = getCurrentDestination();

  const [location, setLocation] = useState("");
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-fetch location when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setLocationState("loading");
    setLocation("");
    setCaption("");
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);

    getLocationString()
      .then((loc) => {
        setLocation(loc);
        setLocationState("done");
      })
      .catch(() => {
        setLocationState("error");
      });
  }, [isOpen]);

  // Cleanup preview URL on close
  useEffect(() => {
    if (!isOpen && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [isOpen, previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!caption.trim() && !selectedFile) {
      setError("הוסף תמונה או כיתוב לפחות");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let photoPath: string | null = null;
      let photoUrl: string | null = null;

      if (selectedFile) {
        const destId = dest?.id ?? "general";
        const uploaded = await uploadPhoto(selectedFile, `journal/${destId}`);
        photoPath = uploaded.path;
        photoUrl = uploaded.url;
      }

      const now = new Date();
      const moment: JournalMoment = {
        id: generateId(),
        day: dayInfo?.day ?? 0,
        date: now.toLocaleDateString("en-CA"),
        destinationId: dest?.id ?? "general",
        destinationHe: dest?.nameHe ?? "טיול",
        location: location || "מיקום לא ידוע",
        caption: caption.trim(),
        photoPath,
        photoUrl,
        uploadedAt: now.toISOString(),
      };

      await saveMoment(moment);
      onSaved(moment);
      onClose();
    } catch {
      setError("שגיאה בשמירה — נסה שוב");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-3xl md:rounded-2xl shadow-2xl">
        {/* Handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-argentina-light">
          <h2 className="font-bold text-navy text-lg">הוסף רגע</h2>
          <button
            onClick={onClose}
            aria-label="סגור"
            className="p-2 rounded-lg text-gray-400 hover:bg-argentina-light transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">

          {/* Day badge */}
          {dayInfo ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                יום בטיול
              </span>
              <span className="text-xs font-bold bg-argentina text-white px-2.5 py-0.5 rounded-full">
                יום {dayInfo.day} מתוך {dayInfo.total}
              </span>
              {dest && (
                <span className="text-xs text-gray-500">· {dest.nameHe}</span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">הטיול טרם התחיל — הרגע ישמר ללא יום</p>
          )}

          {/* Location */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">
              מיקום
            </label>

            {locationState === "loading" && (
              <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                <Loader2 size={14} className="animate-spin text-argentina" />
                מזהה מיקום...
              </div>
            )}

            {locationState === "done" && (
              <div className="flex items-start gap-2">
                <div className="flex-1 flex items-center gap-1.5 bg-argentina-light rounded-xl px-3 py-2 text-sm text-navy">
                  <Navigation size={13} className="text-argentina flex-shrink-0" />
                  <span className="flex-1">{location}</span>
                </div>
                <button
                  onClick={() => setLocationState("manual")}
                  className="text-xs text-argentina hover:underline pt-2 flex-shrink-0"
                >
                  ערוך
                </button>
              </div>
            )}

            {(locationState === "error" || locationState === "manual") && (
              <div>
                {locationState === "error" && (
                  <div className="flex items-center gap-1.5 text-xs text-orange-500 mb-1.5">
                    <AlertCircle size={12} />
                    לא ניתן לזהות מיקום אוטומטית
                  </div>
                )}
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="הקלד מיקום ידנית..."
                  className="w-full border border-argentina-light rounded-xl px-3 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-argentina"
                  dir="rtl"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">
              תמונה (אופציונלי)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="תצוגה מקדימה"
                  className="w-full max-h-48 object-cover rounded-2xl"
                />
                <button
                  onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                  className="absolute top-2 left-2 p-1.5 bg-black/50 text-white rounded-lg"
                  aria-label="הסר תמונה"
                >
                  <X size={14} />
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded-lg"
                >
                  החלף
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-argentina-light rounded-2xl py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-argentina hover:text-argentina transition-colors"
              >
                <Camera size={24} />
                <span className="text-sm">צלם או בחר מהגלריה</span>
              </button>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">
              כיתוב (אופציונלי)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="מה קורה כאן?"
              rows={3}
              maxLength={300}
              className="w-full border border-argentina-light rounded-xl px-3 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-argentina resize-none"
              dir="rtl"
            />
            <p className="text-xs text-gray-300 text-left mt-0.5">{caption.length}/300</p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> {error}
            </p>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving || locationState === "loading"}
            className="w-full bg-argentina text-white py-3 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 min-h-[52px]"
          >
            {saving ? (
              <><Loader2 size={18} className="animate-spin" /> שומר...</>
            ) : (
              <><CheckCircle2 size={18} /> שמור רגע</>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
