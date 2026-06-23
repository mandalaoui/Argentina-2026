export type TranslateLang = "he" | "es";

export async function translateText(
  text: string,
  from: TranslateLang,
  to: TranslateLang
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const langPair = `${from}|${to}`;
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${langPair}`
  );

  if (!res.ok) {
    throw new Error("Translation request failed");
  }

  const data = await res.json();

  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || "Translation failed");
  }

  return data.responseData.translatedText as string;
}
