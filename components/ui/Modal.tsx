"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-argentina-light shrink-0">
            <h2 className="text-lg font-bold text-navy">{title}</h2>
            <button
              onClick={onClose}
              aria-label="סגור"
              className="p-2 rounded-lg text-gray-400 hover:bg-argentina-light transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
