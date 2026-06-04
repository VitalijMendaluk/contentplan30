import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: "Ніша не вказана" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY не налаштований" }, { status: 500 });
    }

    const prompt = `Створи детальний план на 30 днів для TikTok-акаунту в ніші "${niche}". Поділи на 4 тижні. Кожен тиждень — 5–7 конкретних завдань. Кожне завдання — одне речення, конкретна дія. Відповідь ТІЛЬКИ чистий JSON без markdown: { "week1": { "title": "Тиждень 1: ...", "tasks": ["..."] }, "week2": { "title": "Тиждень 2: ...", "tasks": ["..."] }, "week3": { "title": "Тиждень 3: ...", "tasks": ["..."] }, "week4": { "title": "Тиждень 4: ...", "tasks": ["..."] } }. Мова — українська.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Ти — експерт з TikTok-маркетингу. Відповідаєш ТІЛЬКИ валідним JSON без жодного тексту до або після." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Groq API error ${res.status}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";

    const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let roadmap;
    try {
      roadmap = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) roadmap = JSON.parse(match[0]);
      else throw new Error("Не вдалося розпарсити відповідь від AI");
    }

    for (const w of ["week1", "week2", "week3", "week4"]) {
      if (!roadmap[w] || !Array.isArray(roadmap[w].tasks)) {
        throw new Error(`Некоректна структура відповіді (відсутній ${w})`);
      }
    }

    return NextResponse.json({ roadmap });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Невідома помилка";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
