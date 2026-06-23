const AUTH_KEY = "docs_auth";

export function isDocumentsUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function unlockDocuments(): void {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function lockDocuments(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.NEXT_PUBLIC_DOCS_PASSWORD ?? "";
  return password === expected;
}
