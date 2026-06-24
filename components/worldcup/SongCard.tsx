"use client";

import { useState } from "react";
import { Music, ExternalLink, Copy, ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import AudioPlayer from "./AudioPlayer";
import type { Song } from "@/data/songs";

export default function SongCard({ song }: { song: Song }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLyrics = () => {
    navigator.clipboard.writeText(song.lyricsSpanish);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <Music size={16} className="text-argentina flex-shrink-0" aria-hidden="true" />
          <h3 className="font-bold text-navy text-base">{song.title}</h3>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "הסתר מילים" : "הצג מילים"}
          className="p-1 text-gray-400 hover:text-argentina transition-colors flex-shrink-0"
        >
          <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-1">{song.descriptionHe}</p>
      <p className="text-xs text-argentina font-medium mb-3">{song.whenToChantHe}</p>

      {/* Lyrics — collapsible */}
      {open && (
        <div className="mb-3 border border-argentina-light rounded-xl p-3 bg-argentina-light/40">
          {/* Spanish */}
          <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">ספרדית</p>
          <p className="text-sm text-navy whitespace-pre-line leading-relaxed mb-3 font-medium" dir="ltr">
            {song.lyricsSpanish}
          </p>
          {/* Hebrew translation */}
          <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">תרגום</p>
          <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
            {song.translationHe}
          </p>
        </div>
      )}

      {/* Audio player — shows only if song has MP3 */}
      {song.audioUrl && (
        <AudioPlayer src={song.audioUrl} title={song.title} />
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <a
          href={song.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-red-600 transition-colors min-h-[36px]"
          aria-label={`פתח ${song.title} ב-YouTube`}
        >
          <ExternalLink size={14} aria-hidden="true" />
          YouTube
        </a>
        <button
          onClick={copyLyrics}
          className="flex items-center gap-1.5 border border-argentina-light text-navy px-3 py-2 rounded-xl text-xs font-medium hover:bg-argentina-light transition-colors min-h-[36px]"
          aria-label="העתק מילים"
        >
          <Copy size={14} aria-hidden="true" />
          {copied ? "הועתק ✓" : "העתק"}
        </button>
      </div>
    </Card>
  );
}
