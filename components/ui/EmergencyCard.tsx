"use client";

import { Phone, Copy, MapPin } from "lucide-react";

interface EmergencyCardProps {
  name: string;
  phone: string;
  description?: string;
  mapsUrl?: string;
}

export default function EmergencyCard({ name, phone, description, mapsUrl }: EmergencyCardProps) {
  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col gap-3">
      <div>
        <p className="font-bold text-red-800 text-base">{name}</p>
        {description && <p className="text-sm text-red-600 mt-0.5">{description}</p>}
        <p className="text-lg font-mono font-bold text-red-700 mt-1" dir="ltr">{phone}</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors min-h-[44px]"
          aria-label={`התקשר ל-${name}`}
        >
          <Phone size={16} aria-hidden="true" />
          התקשר
        </a>

        <button
          onClick={copyPhone}
          className="flex items-center gap-1.5 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors min-h-[44px]"
          aria-label={`העתק מספר ${name}`}
        >
          <Copy size={16} aria-hidden="true" />
          העתק
        </button>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-red-300 text-red-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors min-h-[44px]"
            aria-label={`פתח מיקום ${name} במפה`}
          >
            <MapPin size={16} aria-hidden="true" />
            מפה
          </a>
        )}
      </div>
    </div>
  );
}
