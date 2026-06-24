import Flag from "@/components/ui/Flag";
import JournalFeed from "@/components/journal/JournalFeed";

export default function JournalPage() {
  return (
    <main>
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-navy">יומן מסע</h1>
        <Flag code="AR" size={26} />
      </div>
      <p className="px-4 text-xs text-gray-400 mb-4">
        רגעים מהטיול — תמונות, מיקומים, זיכרונות
      </p>
      <JournalFeed />
    </main>
  );
}
