import { ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/72fvFNS3kWQvQMA89";

export default function MapGoogleEmbed() {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-argentina-light rounded-2xl bg-white text-sm font-medium text-navy hover:bg-argentina-light transition-colors"
    >
      <ExternalLink size={15} className="text-argentina" aria-hidden="true" />
      פתח מפת Google מלאה
    </a>
  );
}
