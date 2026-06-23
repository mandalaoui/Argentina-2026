"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({ isOpen, onClose, title, children, className }: DrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out max-h-[90vh] flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full",
          // On desktop: centered modal
          "md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:rounded-2xl md:w-full md:max-w-2xl md:max-h-[85vh]",
          isOpen ? "md:-translate-y-1/2" : "md:translate-y-full md:opacity-0",
          className
        )}
      >
        {/* Handle bar — mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-argentina-light flex-shrink-0">
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

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-4">
          {children}
        </div>
      </div>
    </>
  );
}
