export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  description?: string;
  mapsUrl?: string;
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "police",
    name: "משטרה ארגנטינה",
    phone: "911",
    description: "Police / Policía",
  },
  {
    id: "ambulance",
    name: "אמבולנס SAME",
    phone: "107",
    description: "Buenos Aires only",
  },
  {
    id: "israel-embassy",
    name: "שגרירות ישראל",
    phone: "+54-11-4338-2500",
    description: "Buenos Aires",
    mapsUrl: "https://maps.google.com/?q=Embajada+de+Israel+Buenos+Aires",
  },
  {
    id: "hospital-britanico",
    name: "Hospital Británico",
    phone: "+54-11-4309-6400",
    description: "Buenos Aires — מומלץ לתיירים",
    mapsUrl: "https://maps.google.com/?q=Hospital+Británico+Buenos+Aires",
  },
  {
    id: "insurance",
    name: "חברת ביטוח",
    phone: "TODO",
    description: "TODO — להוסיף לפני הטיול",
  },
];
