"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

export default function MapGoogleEmbed() {
  const [open, setOpen] = useState(false);
  const src = process.env.NEXT_PUBLIC_MAPS_EMBED_URL;

  return (
    <div className="border border-argentina-light rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-argentina-light/50 transition-colors text-right"
      >
        <span className="font-medium text-sm text-navy flex items-center gap-2">
          <ExternalLink size={15} className="text-argentina" />
          מפת Google מלאה
        </span>
        <ChevronDown
          size={16}
          className={`text-argentina transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="h-[60vh]">
          {src ? (
            <iframe
              src={src}
              title="מפת Google מלאה"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-argentina-light p-4 text-center">
              <p className="text-sm text-navy">המפה לא זמינה — חסרה כתובת הטמעה בהגדרות.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
