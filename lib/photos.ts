import { supabase } from "./supabase";

const BUCKET = "photos";

export interface UploadedPhoto {
  path: string;
  url: string;
  uploadedAt: string;
  destinationId: string;
}

/** Upload a photo to Supabase storage and return its public URL */
export async function uploadPhoto(
  file: File,
  destinationId: string
): Promise<UploadedPhoto> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}.${ext}`;
  const path = `${destinationId}/${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    path,
    url: data.publicUrl,
    uploadedAt: new Date().toISOString(),
    destinationId,
  };
}

/** List all photos for a destination */
export async function listPhotos(destinationId: string): Promise<UploadedPhoto[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(destinationId, { sortBy: { column: "created_at", order: "asc" } });

  if (error || !data) return [];

  return data
    .filter((f) => f.name && !f.name.endsWith("/"))
    .map((f) => {
      const path = `${destinationId}/${f.name}`;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return {
        path,
        url: urlData.publicUrl,
        uploadedAt: f.created_at ?? "",
        destinationId,
      };
    });
}

/** Delete a photo from Supabase storage */
export async function deletePhoto(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}
