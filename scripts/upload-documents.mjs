/**
 * Upload documents from assets/ to Supabase Storage.
 *
 * Prerequisites:
 *   1. Run scripts/setup-supabase-storage.sql in Supabase SQL Editor
 *   2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Dashboard → Settings → API)
 *   3. Place PDFs in assets/flights/, assets/hotels/, etc.
 *
 * Usage:
 *   node scripts/upload-documents.mjs
 *   node scripts/upload-documents.mjs --category flights
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS = join(ROOT, "assets");

const CATEGORY_FOLDERS = ["flights", "insurance", "passports", "hotels", "documents"];

function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim().replace(/\s+#.*$/, "");
  }
  return env;
}

function collectFiles(dir, base = dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full, base));
    } else if (/\.(pdf|jpg|jpeg|png|webp)$/i.test(entry)) {
      files.push({ localPath: full, storagePath: relative(base, full).replace(/\\/g, "/") });
    }
  }
  return files;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const categoryFilter = process.argv.includes("--category")
  ? process.argv[process.argv.indexOf("--category") + 1]
  : null;

const folders = categoryFilter ? [categoryFilter] : CATEGORY_FOLDERS;
let uploaded = 0;
let skipped = 0;

for (const folder of folders) {
  const dir = join(ASSETS, folder);
  const files = collectFiles(dir, dir).map((f) => ({
    ...f,
    storagePath: `${folder}/${f.storagePath.split("/").pop()}`,
  }));

  if (files.length === 0) {
    console.log(`⏭  ${folder}/ — no files found`);
    continue;
  }

  for (const { localPath, storagePath } of files) {
    const body = readFileSync(localPath);
    const contentType = localPath.endsWith(".pdf")
      ? "application/pdf"
      : localPath.match(/\.jpe?g$/i)
        ? "image/jpeg"
        : "image/png";

    const { error } = await supabase.storage
      .from("documents")
      .upload(storagePath, body, { contentType, upsert: true });

    if (error) {
      console.error(`✗  ${storagePath}: ${error.message}`);
      skipped++;
    } else {
      console.log(`✓  ${storagePath}`);
      uploaded++;
    }
  }
}

console.log(`\nDone: ${uploaded} uploaded, ${skipped} failed`);
