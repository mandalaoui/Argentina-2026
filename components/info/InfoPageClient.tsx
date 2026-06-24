"use client";

import { useEffect, useState } from "react";
import { Backpack, Smartphone, Wallet, Wifi, AlertTriangle, Gift } from "lucide-react";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import EmergencyCard from "@/components/ui/EmergencyCard";
import Flag from "@/components/ui/Flag";
import PackingChecklist, { usePackingStorage } from "@/components/info/PackingChecklist";
import AppsList from "@/components/info/AppsList";
import GiftsList from "@/components/info/GiftsList";
import { moneyTips, communicationTips } from "@/data/info";
import { emergencyContacts } from "@/data/emergency";

function TipList({ tips }: { tips: { id: string; title: string; body: string }[] }) {
  return (
    <ul className="space-y-3">
      {tips.map((tip) => (
        <li key={tip.id} className="border border-argentina-light rounded-xl p-3">
          <p className="text-sm font-semibold text-navy">{tip.title}</p>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{tip.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function InfoPageClient() {
  const { checks, toggle, packedCount, total } = usePackingStorage();
  const [mounted, setMounted] = useState(false);
  const activeContacts = emergencyContacts.filter((c) => c.phone !== "TODO");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="p-4 max-w-lg mx-auto pb-24">
      <div className="pt-2 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-navy flex items-center gap-2">
          מידע שימושי <Flag code="AR" size={28} />
        </h1>
        <p className="text-sm text-gray-400 mt-1">ציוד, אפליקציות, כסף ומספרי חירום</p>
      </div>

      <Accordion>
        <AccordionItem
          title={mounted ? `ציוד (${packedCount}/${total})` : "ציוד"}
          icon={<Backpack size={18} />}

        >
          <PackingChecklist checks={checks} onToggle={toggle} />
        </AccordionItem>

        <AccordionItem
          title="אפליקציות"
          icon={<Smartphone size={18} />}
        >
          <AppsList />
        </AccordionItem>

        <AccordionItem
          title="כסף"
          icon={<Wallet size={18} />}
        >
          <TipList tips={moneyTips} />
        </AccordionItem>

        <AccordionItem
          title="תקשורת"
          icon={<Wifi size={18} />}
        >
          <TipList tips={communicationTips} />
        </AccordionItem>

        <AccordionItem
          title="חירום"
          icon={<AlertTriangle size={18} />}
        >
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 space-y-3">
            {activeContacts.map((contact) => (
              <EmergencyCard
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                description={contact.description}
                mapsUrl={contact.mapsUrl}
              />
            ))}
            {emergencyContacts.some((c) => c.phone === "TODO") && (
              <p className="text-xs text-red-600 px-1">
                מספר חברת הביטוח יתווסף לפני הטיול
              </p>
            )}
          </div>
        </AccordionItem>

        <AccordionItem title="מתנות" icon={<Gift size={18} />}>
          <GiftsList />
        </AccordionItem>

      </Accordion>
    </main>
  );
}
