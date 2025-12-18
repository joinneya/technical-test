# Neya technical test (setup)

This repo is a small Next.js app with a chat UI and a minimal API route.

For the take-home brief, see **`INSTRUCTIONS.md`**.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local`:

```bash
cp .env.example .env.local
```

3. Add an LLM API key to `.env.local`:

```bash
GEMINI_API_KEY=...

# or (if you prefer OpenAI):
# OPENAI_API_KEY=...
```

If you set both keys, the app will **prefer Gemini**.

4. Run the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.
