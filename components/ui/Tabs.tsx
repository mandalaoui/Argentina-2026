"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ tabs, children, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  return (
    <div className={cn("w-full", className)}>
      {/* Tab bar */}
      <div className="flex overflow-x-auto gap-1 pb-2 mb-4 border-b border-argentina-light scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors shrink-0",
              activeTab === tab.id
                ? "bg-argentina text-white"
                : "text-gray-500 hover:bg-argentina-light hover:text-navy"
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{children(activeTab)}</div>
    </div>
  );
}
