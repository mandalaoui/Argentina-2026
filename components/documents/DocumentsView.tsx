"use client";

import { useEffect, useState } from "react";
import { Plane, Shield, BookOpen, Building, FileText, Loader2 } from "lucide-react";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import {
  documentCategories,
  getDocumentsByCategory,
  type DocumentCategory,
} from "@/data/documents";
import { listAvailableStoragePaths } from "@/lib/documents-storage";
import DocumentCard from "./DocumentCard";

const categoryIcons: Record<DocumentCategory, React.ReactNode> = {
  flights:   <Plane size={18} />,
  insurance: <Shield size={18} />,
  passports: <BookOpen size={18} />,
  hotels:    <Building size={18} />,
  other:     <FileText size={18} />,
};

export default function DocumentsView() {
  const [availablePaths, setAvailablePaths] = useState<Set<string> | null>(null);

  useEffect(() => {
    listAvailableStoragePaths()
      .then(setAvailablePaths)
      .catch(() => setAvailablePaths(new Set()));
  }, []);

  if (availablePaths === null) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-gray-400">
        <Loader2 size={20} className="animate-spin text-argentina" />
        <span className="text-sm">טוען מסמכים...</span>
      </div>
    );
  }

  return (
    <Accordion>
      {documentCategories.map((category, index) => {
        const docs = getDocumentsByCategory(category.id);
        const availableCount = docs.filter(
          (d) => d.storagePath && availablePaths.has(d.storagePath)
        ).length;

        return (
          <AccordionItem
            key={category.id}
            title={`${category.label}${docs.length > 0 ? ` (${availableCount}/${docs.length})` : ""}`}
            icon={categoryIcons[category.id]}
            defaultOpen={index === 0 && docs.length > 0}
          >
            {docs.length === 0 ? (
              <p className="text-sm text-gray-400 py-2">אין מסמכים בקטגוריה זו עדיין</p>
            ) : (
              <div className="space-y-3">
                {docs.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    isAvailable={!!doc.storagePath && availablePaths.has(doc.storagePath)}
                  />
                ))}
              </div>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
