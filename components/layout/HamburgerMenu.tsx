"use client";

import { X, Home, Map, MapPin, FileText, Info, MessageSquare, Trophy, Camera, type LucideIcon } from "lucide-react";
import Flag from "@/components/ui/Flag";
import Link from "next/link";
import { useNavActive } from "./useNavActive";

const navItems = [
  { href: "/",          label: "בית",           icon: Home },
  { href: "/trip",      label: "הטיול",          icon: Map },
  { href: "/map",       label: "מפה",            icon: MapPin },
  { href: "/documents", label: "מסמכים",         icon: FileText },
  { href: "/info",      label: "מידע שימושי",    icon: Info },
  { href: "/spanish",   label: "ספרדית",         icon: MessageSquare },
  { href: "/worldcup",  label: "מונדיאל",        icon: Trophy },
  { href: "/journal",   label: "יומן מסע",       icon: Camera },
];

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
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

      {/* Drawer — slides in from the right (RTL) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-argentina-light">
          <span className="text-lg font-bold text-navy flex items-center gap-2">
            Argentina 2026 <Flag code="AR" size={20} />
          </span>
          <button
            onClick={onClose}
            aria-label="סגור תפריט"
            className="p-2 rounded-lg text-gray-500 hover:bg-argentina-light transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col p-3 gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <DrawerNavLink
              key={href}
              href={href}
              label={label}
              icon={Icon}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

function DrawerNavLink({
  href,
  label,
  icon: Icon,
  onClose,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  onClose: () => void;
}) {
  const isActive = useNavActive(href);

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
        isActive
          ? "bg-argentina text-white"
          : "text-navy hover:bg-argentina-light"
      }`}
    >
      <Icon size={20} aria-hidden="true" />
      {label}
    </Link>
  );
}
