import { supabase } from "@/lib/supabase";

const SIGNED_URL_EXPIRY_SECONDS = 3600; // 1 hour

const STORAGE_FOLDERS = ["flights", "hotels", "insurance", "passports", "documents"] as const;

export async function listAvailableStoragePaths(): Promise<Set<string>> {
  const paths = new Set<string>();

  for (const folder of STORAGE_FOLDERS) {
    const { data, error } = await supabase.storage.from("documents").list(folder);
    if (error) continue;
    for (const file of data ?? []) {
      if (file.name && !file.name.endsWith("/")) {
        paths.add(`${folder}/${file.name}`);
      }
    }
  }

  return paths;
}

export async function getDocumentSignedUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRY_SECONDS);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message ?? "לא ניתן לטעון את המסמך");
  }

  return data.signedUrl;
}
