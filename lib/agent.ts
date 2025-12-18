import { NEYA_SYSTEM_PROMPT } from "./prompt";
import { generateResponse } from "./llm";

export type RunAgentArgs = { message: string };
export type RunAgentResult = { reply: string };

export async function runAgent(args: RunAgentArgs): Promise<RunAgentResult> {
  const userMessage = args.message.trim();

  const { text } = await generateResponse({
    system: NEYA_SYSTEM_PROMPT,
    user: userMessage,
  });

  const reply = text.trim() || "Sorry — I wasn’t able to generate a response.";
  return { reply };
}
