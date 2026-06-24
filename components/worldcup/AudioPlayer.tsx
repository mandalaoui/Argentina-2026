"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Props {
  src: string;
  title: string;
}

function formatTime(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setCurrent(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onEnd  = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else         { el.play();  setPlaying(true);  }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(e.target.value);
    setCurrent(el.currentTime);
  };

  const skip = (delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(duration, el.currentTime + delta));
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="bg-argentina-light/50 rounded-xl px-3 py-2.5 mt-2">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Controls */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => skip(-10)} aria-label="10 שניות אחורה"
          className="p-1 text-navy hover:text-argentina transition-colors">
          <SkipBack size={16} />
        </button>

        <button onClick={togglePlay} aria-label={playing ? "השהה" : "נגן"}
          className="w-9 h-9 rounded-full bg-argentina text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
          {playing ? <Pause size={16} /> : <Play size={16} className="mr-[-1px]" />}
        </button>

        <button onClick={() => skip(10)} aria-label="10 שניות קדימה"
          className="p-1 text-navy hover:text-argentina transition-colors">
          <SkipForward size={16} />
        </button>

        {/* Time */}
        <span className="text-xs text-gray-500 tabular-nums mr-auto">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>

      {/* Seek bar */}
      <div className="relative">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={current}
          onChange={seek}
          aria-label={`מיקום ב${title}`}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to left, #74ACDF ${pct}%, #D1E9F6 ${pct}%)`,
          }}
        />
      </div>
    </div>
  );
}
