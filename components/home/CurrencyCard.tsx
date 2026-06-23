import Card from "@/components/ui/Card";
import { getCurrencyRates } from "@/lib/currency";
import { DollarSign } from "lucide-react";

export default async function CurrencyCard() {
  try {
    const rates = await getCurrencyRates();

    return (
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={16} className="text-argentina" aria-hidden="true" />
          <span className="text-sm font-semibold text-navy">שערי מטבע</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">$1 דולר</span>
            <span className="font-bold text-navy">{rates.usdToArs.toLocaleString()} ARS</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">₪1 שקל</span>
            <span className="font-bold text-navy">{rates.ilsToArs.toLocaleString()} ARS</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-left">עודכן: {rates.updatedAt}</p>
      </Card>
    );
  } catch {
    return (
      <Card>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">שערי מטבע — לא זמין</span>
        </div>
      </Card>
    );
  }
}
