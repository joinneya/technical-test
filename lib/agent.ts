import { NEYA_SYSTEM_PROMPT } from "./prompt";
import { generateResponse } from "./llm";
import { searchGroups } from "./tools";

export type RunAgentArgs = { message: string };
export type RunAgentResult = { reply: string };

export async function runAgent(args: RunAgentArgs): Promise<RunAgentResult> {
  const userMessage = args.message.trim();
  const matchedGroups = await searchGroups(userMessage);

  const { text } = await generateResponse({
    system: `${NEYA_SYSTEM_PROMPT} ${matchedGroups.length > 0 ? `\n\nMatched groups based on the users message (only reference these, do not hallucinate):\n${matchedGroups.slice(0, 3).map((g) => `- ${g.id}: ${g.name} (${g.locationLabel})`).join("\n")}\n` : ""}`,
    user: userMessage,
  });

  const reply = text.trim() || "Sorry — I wasn’t able to generate a response.";
  return { reply };
}
