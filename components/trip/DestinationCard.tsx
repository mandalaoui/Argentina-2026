"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Flag from "@/components/ui/Flag";
import DestinationDrawer from "./DestinationDrawer";
import type { Destination, SubTrip } from "@/data/trip";

function getStatus(dest: Destination): "past" | "today" | "upcoming" {
  const today = new Date().toISOString().split("T")[0];
  if (today > dest.endDate) return "past";
  if (today >= dest.startDate && today <= dest.endDate) return "today";
  return "upcoming";
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    d.toLocaleDateString("he-IL", { day: "numeric", month: "numeric" });
  return `${fmt(s)} – ${fmt(e)}`;
}

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination: dest }: Props) {
  const [open, setOpen] = useState(false);
  const [openSubTrip, setOpenSubTrip] = useState<SubTrip | null>(null);
  const status = getStatus(dest);

  return (
    <>
      <Card onClick={() => setOpen(true)} className="cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Flag code={dest.flag} size={22} />
              <h3 className="font-bold text-navy text-base truncate">{dest.nameHe}</h3>
            </div>
            <p className="text-sm text-gray-500">
              {formatDateRange(dest.startDate, dest.endDate)} · {dest.nights} לילות
            </p>
            <p className="text-xs text-gray-400 mt-1 truncate">{dest.accommodation.name}</p>

            {/* Sub-trip tags — clickable */}
            {dest.subTrips && dest.subTrips.length > 0 && (
              <div className="flex gap-1.5 mt-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                {dest.subTrips.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setOpenSubTrip(sub)}
                    className="text-xs bg-argentina-light text-navy px-2 py-1 rounded-full hover:bg-argentina hover:text-white transition-colors min-h-[28px]"
                  >
                    📍 {sub.nameHe}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Badge variant={status} />
            <ChevronLeft size={18} className="text-gray-300 rotate-180" aria-hidden="true" />
          </div>
        </div>
      </Card>

      {/* Main destination drawer */}
      <DestinationDrawer
        destination={dest}
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      {/* Sub-trip drawers */}
      {dest.subTrips?.map((sub) => (
        <DestinationDrawer
          key={sub.id}
          destination={sub}
          isOpen={openSubTrip?.id === sub.id}
          onClose={() => setOpenSubTrip(null)}
          isSubTrip
        />
      ))}
    </>
  );
}
