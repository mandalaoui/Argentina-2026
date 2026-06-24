"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Trash2, X, ZoomIn } from "lucide-react";
import { uploadPhoto, listPhotos, deletePhoto, type UploadedPhoto } from "@/lib/photos";

interface Props {
  destinationId: string;
}

export default function PhotoGallery({ destinationId }: Props) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<UploadedPhoto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos on mount
  useEffect(() => {
    listPhotos(destinationId)
      .then(setPhotos)
      .catch(() => setError("שגיאה בטעינת תמונות"))
      .finally(() => setLoading(false));
  }, [destinationId]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    e.target.value = "";

    setUploading(true);
    setError(null);
    try {
      const uploaded = await uploadPhoto(file, destinationId);
      setPhotos((prev) => [...prev, uploaded]);
    } catch {
      setError("שגיאה בהעלאת התמונה — נסה שוב");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photo: UploadedPhoto) => {
    if (!confirm("למחוק את התמונה?")) return;
    try {
      await deletePhoto(photo.path);
      setPhotos((prev) => prev.filter((p) => p.path !== photo.path));
      if (lightbox?.path === photo.path) setLightbox(null);
    } catch {
      setError("שגיאה במחיקת תמונה");
    }
  };

  return (
    <div>
      {/* Upload button */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="העלאת תמונה"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-argentina text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px] disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Camera size={16} aria-hidden="true" />
          )}
          {uploading ? "מעלה..." : "צלם / העלה תמונה"}
        </button>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>

      {/* Gallery grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">טוען תמונות...</span>
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
          <Camera size={32} className="text-gray-200" />
          <p className="text-sm text-gray-400">עדיין אין תמונות</p>
          <p className="text-xs text-gray-300">לחץ על הכפתור למעלה לצילום ראשון</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">
          {photos.map((photo) => (
            <div
              key={photo.path}
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt="תמונה מהטיול"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay on hover/tap */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setLightbox(photo)}
                  className="p-1.5 bg-white/90 rounded-lg text-navy"
                  aria-label="הגדל תמונה"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => handleDelete(photo)}
                  className="p-1.5 bg-red-500/90 rounded-lg text-white"
                  aria-label="מחק תמונה"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
            aria-label="סגור"
          >
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.url}
            alt="תמונה מהטיול"
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(lightbox); }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm"
          >
            <Trash2 size={14} />
            מחק תמונה
          </button>
        </div>
      )}
    </div>
  );
}
