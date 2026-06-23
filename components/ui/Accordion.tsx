"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, icon, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-argentina-light rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-argentina-light/50 transition-colors text-right"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 font-semibold text-navy">
          {icon && <span className="text-argentina">{icon}</span>}
          {title}
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "text-argentina transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-argentina-light">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
