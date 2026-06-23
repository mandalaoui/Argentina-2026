import { NextResponse } from "next/server";
import { translateText, type TranslateLang } from "@/lib/translate";

const VALID_LANGS: TranslateLang[] = ["he", "es"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, from, to } = body as {
      text?: string;
      from?: TranslateLang;
      to?: TranslateLang;
    };

    if (!text?.trim()) {
      return NextResponse.json({ error: "טקסט ריק" }, { status: 400 });
    }

    if (!from || !to || !VALID_LANGS.includes(from) || !VALID_LANGS.includes(to)) {
      return NextResponse.json({ error: "כיוון תרגום לא תקין" }, { status: 400 });
    }

    if (from === to) {
      return NextResponse.json({ error: "יש לבחור כיווני תרגום שונים" }, { status: 400 });
    }

    const translatedText = await translateText(text, from, to);
    return NextResponse.json({ translatedText });
  } catch {
    return NextResponse.json(
      { error: "התרגום נכשל — נסו שוב מאוחר יותר" },
      { status: 502 }
    );
  }
}
