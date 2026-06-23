"use client";

import { useState } from "react";
import { Eye, Download, Loader2, FileX } from "lucide-react";
import type { TripDocument } from "@/data/documents";
import Badge from "@/components/ui/Badge";
import { getDocumentSignedUrl } from "@/lib/documents-storage";

interface Props {
  document: TripDocument;
  isAvailable: boolean;
}

export default function DocumentCard({ document, isAvailable }: Props) {
  const [loadingAction, setLoadingAction] = useState<"view" | "download" | null>(null);
  const [error, setError] = useState("");

  const canOpen = isAvailable && !!document.storagePath;

  const openDocument = async (action: "view" | "download") => {
    if (!document.storagePath) return;

    setLoadingAction(action);
    setError("");

    try {
      const url = await getDocumentSignedUrl(document.storagePath);

      if (action === "view") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const link = window.document.createElement("a");
        link.href = url;
        link.download = document.storagePath.split("/").pop() ?? "document.pdf";
        link.rel = "noopener noreferrer";
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(msg || "לא ניתן לטעון את המסמך — בדוק חיבור לאינטרנט");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="bg-soft-gray rounded-xl p-4 border border-argentina-light/50">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy text-sm leading-snug">{document.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{document.date}</p>
        </div>
        {document.important && <Badge variant="important" />}
      </div>

      {!canOpen && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-1">
          <FileX size={16} className="flex-shrink-0" />
          <span>הקובץ טרם הועלה</span>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mb-2" role="alert">
          {error}
        </p>
      )}

      {canOpen && (
        <div className="flex gap-2">
          <button
            onClick={() => openDocument("view")}
            disabled={loadingAction !== null}
            className="flex-1 flex items-center justify-center gap-1.5 bg-argentina text-white rounded-xl px-3 py-2.5 text-sm font-medium min-h-12 disabled:opacity-50"
          >
            {loadingAction === "view" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Eye size={16} />
            )}
            צפה
          </button>
          <button
            onClick={() => openDocument("download")}
            disabled={loadingAction !== null}
            className="flex-1 flex items-center justify-center gap-1.5 border border-argentina text-argentina rounded-xl px-3 py-2.5 text-sm font-medium min-h-12 disabled:opacity-50"
          >
            {loadingAction === "download" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            הורד
          </button>
        </div>
      )}
    </div>
  );
}
