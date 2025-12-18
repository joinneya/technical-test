import { GoogleGenerativeAI } from "@google/generative-ai";

export type LlmTextRequest = {
  system: string;
  user: string;
  model?: string;
};

export type LlmTextResponse = {
  text: string;
  model: string;
};

function requireGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "Missing GEMINI_API_KEY. Create a `.env.local` (see `.env.example`) and set GEMINI_API_KEY=....",
    );
  }
  return key;
}

export async function generateText(req: LlmTextRequest): Promise<LlmTextResponse> {
  const apiKey = requireGeminiApiKey();
  const modelName = req.model ?? "gemini-2.5-flash";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  // Gemini’s SDK doesn’t have a “system role” identical to OpenAI’s chat messages.
  // We keep it simple by concatenating system + user into a single prompt.
  // Candidates can evolve this into structured prompting / multi-turn later.
  const prompt = `${req.system}\n\nUser message:\n${req.user}\n`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return { text, model: modelName };
}


