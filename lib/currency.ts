export interface CurrencyRates {
  usdToArs: number;
  ilsToArs: number;
  updatedAt: string;
}

export async function getCurrencyRates(): Promise<CurrencyRates> {
  const key = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hour
  if (!res.ok) throw new Error("Currency fetch failed");
  const data = await res.json();
  return {
    usdToArs: Math.round(data.conversion_rates.ARS),
    ilsToArs: Math.round(data.conversion_rates.ARS / data.conversion_rates.ILS),
    updatedAt: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
  };
}
