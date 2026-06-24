"use client";

import { useState } from "react";
import { X, Hotel, Utensils, Star, Beer, Lightbulb, Camera, MapPin, ExternalLink } from "lucide-react";
import type { Destination, SubTrip } from "@/data/trip";
import Flag from "@/components/ui/Flag";
import { ActivityChecklist, PlaceList } from "./ActivityChecklist";
import PhotoGallery from "./PhotoGallery";

const TABS = [
  { id: "accommodation", label: "לינה",      icon: Hotel },
  { id: "food",          label: "אוכל",      icon: Utensils },
  { id: "activities",    label: "פעילויות",  icon: Star },
  { id: "bars",          label: "ברים",      icon: Beer },
  { id: "tips",          label: "טיפים",     icon: Lightbulb },
  { id: "photos",        label: "תמונות",    icon: Camera },
] as const;

type TabId = typeof TABS[number]["id"];

interface Props {
  destination: Destination | SubTrip & { flag?: string };
  isOpen: boolean;
  onClose: () => void;
  isSubTrip?: boolean;
}

export default function DestinationDrawer({ destination, isOpen, onClose, isSubTrip = false }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("activities");

  const dest = destination as Destination;
  const sub = destination as SubTrip;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden="true" />
      )}

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out
          max-h-[92vh]
          md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:w-full md:max-w-2xl md:rounded-2xl md:max-h-[85vh]
          ${isOpen
            ? "translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2 visible"
            : "translate-y-full md:-translate-x-1/2 md:translate-y-full invisible pointer-events-none"
          }`}
      >
        {/* Handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-argentina-light shrink-0">
          <div>
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              {!isSubTrip && <Flag code={dest.flag} size={20} />}
              {isSubTrip ? sub.nameHe : dest.nameHe}
            </h2>
            {isSubTrip && (
              <p className="text-xs text-gray-400 mt-0.5">{sub.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="סגור"
            className="p-2 rounded-lg text-gray-400 hover:bg-argentina-light transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 px-3 pt-2 pb-1 border-b border-argentina-light shrink-0 scrollbar-none">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shrink-0
                ${activeTab === id ? "bg-argentina text-white" : "text-gray-500 hover:bg-argentina-light"}`}
            >
              <Icon size={13} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">

          {/* ─── לינה ─── */}
          {activeTab === "accommodation" && !isSubTrip && (
            <div className="space-y-3">
              <p className="font-semibold text-navy">{dest.accommodation.name}</p>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={14} className="text-argentina mt-0.5 shrink-0" />
                <span>{dest.accommodation.address}</span>
              </div>
              {dest.accommodation.phone && (
                <a href={`tel:${dest.accommodation.phone}`} className="text-sm text-argentina font-medium">
                  📞 {dest.accommodation.phone}
                </a>
              )}
              <div className="flex gap-4 text-xs text-gray-500 bg-argentina-light rounded-xl p-3">
                <div>
                  <p className="font-medium text-navy mb-0.5">צ'ק-אין</p>
                  <p>{new Date(dest.accommodation.checkIn).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div>
                  <p className="font-medium text-navy mb-0.5">צ'ק-אאוט</p>
                  <p>{new Date(dest.accommodation.checkOut).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
              {dest.accommodation.notes && (
                <p className="text-xs text-gray-500 bg-sun/10 rounded-xl p-3">{dest.accommodation.notes}</p>
              )}
              {dest.accommodation.bookingUrl && dest.accommodation.bookingUrl !== "" && (
                <a
                  href={dest.accommodation.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-argentina font-medium"
                >
                  <ExternalLink size={14} /> פתח הזמנה
                </a>
              )}
            </div>
          )}

          {activeTab === "accommodation" && isSubTrip && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-navy">תחבורה</p>
              <p className="text-sm text-gray-600">{sub.transport}</p>
            </div>
          )}

          {/* ─── אוכל ─── */}
          {activeTab === "food" && (
            <PlaceList
              places={isSubTrip ? [] : dest.restaurants}
              emptyMessage="אין מסעדות רשומות עדיין"
            />
          )}

          {/* ─── פעילויות ─── */}
          {activeTab === "activities" && (
            <ActivityChecklist
              activities={isSubTrip ? sub.activities : dest.activities}
              storageKey={`activities-${destination.id}`}
            />
          )}

          {/* ─── ברים ─── */}
          {activeTab === "bars" && (
            <PlaceList
              places={isSubTrip ? [] : dest.bars}
              emptyMessage="אין ברים רשומים עדיין"
            />
          )}

          {/* ─── טיפים ─── */}
          {activeTab === "tips" && (
            <ul className="space-y-2">
              {(isSubTrip ? sub.tips : dest.tips).length === 0 ? (
                <p className="text-sm text-gray-400">אין טיפים עדיין</p>
              ) : (
                (isSubTrip ? sub.tips : dest.tips).map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-argentina shrink-0 mt-0.5">💡</span>
                    <span>{tip}</span>
                  </li>
                ))
              )}
            </ul>
          )}

          {/* ─── תמונות ─── */}
          {activeTab === "photos" && (
            <PhotoGallery destinationId={destination.id} />
          )}

        </div>
      </div>
    </>
  );
}
