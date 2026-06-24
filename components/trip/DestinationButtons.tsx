"use client";

import { useState } from "react";
import { destinations } from "@/data/trip";
import DestinationDrawer from "./DestinationDrawer";
import type { Destination, SubTrip } from "@/data/trip";

type DrawerTarget =
  | { type: "destination"; data: Destination }
  | { type: "subtrip"; data: SubTrip };

const ba  = destinations[0];
const brc = destinations[1];
const rosario = ba.subTrips?.find((s) => s.id === "rosario")!;
const colonia = ba.subTrips?.find((s) => s.id === "colonia")!;

const BUTTONS: { label: string; target: DrawerTarget }[] = [
  { label: "בואנוס איירס", target: { type: "destination", data: ba } },
  { label: "רוסאריו",      target: { type: "subtrip",     data: rosario } },
  { label: "קולוניה",      target: { type: "subtrip",     data: colonia } },
  { label: "ברילוצ'ה",     target: { type: "destination", data: brc } },
];

export default function DestinationButtons() {
  const [open, setOpen] = useState<DrawerTarget | null>(null);

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-5">
        {BUTTONS.map(({ label, target }) => (
          <button
            key={label}
            onClick={() => setOpen(target)}
            className="px-4 py-2 bg-white border border-argentina rounded-xl text-sm font-medium text-argentina hover:bg-argentina hover:text-white transition-colors min-h-[40px]"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Destination drawers */}
      {BUTTONS.map(({ label, target }) => {
        const isOpen = open !== null &&
          (target.type === "destination"
            ? open.type === "destination" && (open.data as Destination).id === (target.data as Destination).id
            : open.type === "subtrip" && (open.data as SubTrip).id === (target.data as SubTrip).id);

        return (
          <DestinationDrawer
            key={label}
            destination={target.data}
            isOpen={isOpen}
            onClose={() => setOpen(null)}
            isSubTrip={target.type === "subtrip"}
          />
        );
      })}
    </>
  );
}
