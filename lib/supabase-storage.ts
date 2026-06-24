import { supabase } from "./supabase";

/**
 * Generic key/value store backed by Supabase `app_data` table.
 * Falls back gracefully if offline.
 */

export async function dbGet<T>(key: string): Promise<T | null> {
  const { data, error } = await supabase
    .from("app_data")
    .select("value")
    .eq("key", key)
    .single();
  if (error || !data) return null;
  return data.value as T;
}

export async function dbSet<T>(key: string, value: T): Promise<void> {
  await supabase
    .from("app_data")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

export async function dbDelete(key: string): Promise<void> {
  await supabase.from("app_data").delete().eq("key", key);
}
