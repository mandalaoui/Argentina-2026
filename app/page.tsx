import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import EmergencyCard from "@/components/ui/EmergencyCard";
import { Utensils, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-argentina">Argentina 2026 Hub 🇦🇷</h1>

      {/* Cards + Badges */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-navy">Buenos Aires</h2>
          <Badge variant="today" />
        </div>
        <p className="text-sm text-gray-500">01.07 – 06.07 · 5 לילות</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-navy">Bariloche</h2>
          <Badge variant="upcoming" />
        </div>
        <p className="text-sm text-gray-500">06.07 – 10.07 · 4 לילות</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-navy">מסמך חשוב</h2>
          <Badge variant="important" />
        </div>
        <p className="text-sm text-gray-500">כרטיס טיסה TLV → EZE</p>
      </Card>

      {/* Accordion */}
      <Accordion>
        <AccordionItem title="מסעדות" icon={<Utensils size={16} />} defaultOpen>
          <p className="text-sm text-gray-600">Don Julio, La Cabrera, El Ferroviario</p>
        </AccordionItem>
        <AccordionItem title="אטרקציות" icon={<Star size={16} />}>
          <p className="text-sm text-gray-600">Teatro Colón, Recoleta Cemetery, La Bombonera</p>
        </AccordionItem>
      </Accordion>

      {/* Emergency Card */}
      <EmergencyCard
        name="שגרירות ישראל"
        phone="+54-11-4338-2500"
        description="Buenos Aires"
        mapsUrl="https://maps.google.com"
      />
    </main>
  );
}
