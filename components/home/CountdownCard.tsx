import Card from "@/components/ui/Card";
import { Plane } from "lucide-react";

const DEPARTURE = new Date("2026-06-30T16:05:00+03:00");

export default function CountdownCard() {
  const now = new Date();
  const diff = DEPARTURE.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  return (
    <Card className="bg-argentina text-white border-0">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Plane size={20} aria-hidden="true" />
        <span className="font-semibold text-sm opacity-90">הטיסה מתקרבת</span>
      </div>
      <div className="flex items-end justify-center gap-3">
        <div className="text-center">
          <p className="text-5xl font-bold leading-none">{days}</p>
          <p className="text-xs opacity-80 mt-1">ימים</p>
        </div>
        <p className="text-3xl font-light mb-2 opacity-70">:</p>
        <div className="text-center">
          <p className="text-5xl font-bold leading-none">{hours}</p>
          <p className="text-xs opacity-80 mt-1">שעות</p>
        </div>
      </div>
      <p className="text-xs opacity-70 mt-3 text-center">יציאה 30.06.2026 · 16:05 מתל אביב</p>
    </Card>
  );
}
