# TikTok Roadmap 1–30 | Наставник Віталік

Інтерактивний 30-денний роадмап для учнів TikTok-курсу. Введи нішу — отримай персональний план від Gemini AI.

---

## Як отримати Gemini API Key

1. Перейди на [aistudio.google.com](https://aistudio.google.com)
2. Увійди з Google-акаунтом
3. Натисни **"Get API Key"** → **"Create API key"**
4. Скопіюй ключ — він починається з `AIza...`

---

## Локальний запуск

```bash
# 1. Встанови залежності
npm install

# 2. Створи .env.local і додай ключ
cp .env.local.example .env.local
# Відредагуй .env.local — встав свій GEMINI_API_KEY

# 3. Запусти dev-сервер
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000)

---

## Deploy на Vercel (3 кроки)

### 1. Push на GitHub
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/tiktok-roadmap.git
git push -u origin main
```

### 2. Імпортуй на Vercel
- Зайди на [vercel.com](https://vercel.com) → **"Add New Project"**
- Вибери свій GitHub репозиторій
- Натисни **"Deploy"**

### 3. Додай змінну середовища
- В Vercel Dashboard → **Settings** → **Environment Variables**
- Додай: `GEMINI_API_KEY` = `твій_ключ_від_aistudio`
- Зроби **Redeploy** (Settings → Deployments → Redeploy)

---

## Стек

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** (анімації)
- **Google Gemini API** (gemini-1.5-flash, безкоштовний tier)
- **localStorage** (збереження прогресу)
