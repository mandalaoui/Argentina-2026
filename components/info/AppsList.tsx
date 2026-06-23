"use client";

import { ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { apps } from "@/data/info";

export default function AppsList() {
  return (
    <ul className="space-y-4">
      {apps.map((app) => (
        <li key={app.id} className="border border-argentina-light rounded-xl p-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-argentina-light flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-navy">{app.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-navy">{app.name}</p>
                {app.mustInstall && <Badge variant="important" label="חובה" />}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{app.description}</p>
              <div className="flex gap-2 mt-2.5 flex-wrap">
                <a
                  href={app.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-argentina text-white px-3 py-2.5 rounded-xl text-xs font-medium min-h-12 hover:opacity-90 transition-opacity"
                  aria-label={`הורד ${app.name} מ-App Store`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  App Store
                </a>
                <a
                  href={app.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-argentina text-argentina px-3 py-2.5 rounded-xl text-xs font-medium min-h-12 hover:bg-argentina-light transition-colors"
                  aria-label={`הורד ${app.name} מ-Play Store`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Play Store
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
