"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Avoid hydration mismatch: active styles apply only after client mount. */
export function useNavActive(href: string): boolean {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && pathname === href;
}
