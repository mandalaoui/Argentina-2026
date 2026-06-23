"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import Flag from "@/components/ui/Flag";
import { useNavActive } from "./useNavActive";

const navItems = [
  { href: "/",          label: "בית" },
  { href: "/trip",      label: "הטיול" },
  { href: "/map",       label: "מפה" },
  { href: "/documents", label: "מסמכים" },
  { href: "/info",      label: "מידע שימושי" },
  { href: "/spanish",   label: "ספרדית" },
  { href: "/worldcup",  label: "מונדיאל" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-argentina shadow-md">
        <div className="flex items-center justify-between h-full px-4 max-w-5xl mx-auto">

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="פתח תפריט"
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Flag code="AR" size={22} />
            Argentina 2026
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>

          {/* Spacer for mobile (balance the hamburger on left) */}
          <div className="md:hidden w-10" />
        </div>
      </header>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = useNavActive(href);

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-white text-argentina"
          : "text-white hover:bg-white/20"
      }`}
    >
      {label}
    </Link>
  );
}
