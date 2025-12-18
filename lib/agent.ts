import { NEYA_SYSTEM_PROMPT } from "./prompt";
import { generateText } from "./llm";
import { searchGroups } from "./tools";
import type { Group } from "./types";

export type RunAgentArgs = {
  message: string;
};

export type RunAgentResult = {
  reply: string;
};

export async function runAgent(args: RunAgentArgs): Promise<RunAgentResult> {
  const userMessage = args.message.trim();

  // This starter implementation is intentionally naive: it does one LLM call and returns text.
  // The test is to evolve this into a well-behaved agent with:
  //
  // TODO(candidate): 1) Interpret + decide (structured output)
  // - Ask the LLM for a structured decision (JSON) describing what to do next.
  // - Validate it defensively. Add fallback logic if invalid.
  //
  // TODO(candidate): 2) Tool use with gating
  // - Only call `searchGroups` when the decision explicitly requires it.
  // - Never hallucinate tool outputs or group IDs.
  //
  // TODO(candidate): 3) Separate decisioning from tone
  // - Keep the decision step non-user-facing.
  // - Generate the final user reply after tools run (optional second LLM pass).

  // Starter baseline: try a search. In the starter repo, `searchGroups()` is intentionally a stub.
  // That means this will usually return an empty list, and the model should ask a clarifying question.
  const matchedGroups = await searchGroups(userMessage);

  let seededContext = "";
  if (matchedGroups.length > 0) {
    const top = matchedGroups.slice(0, 3);
    seededContext =
      "\n\nAvailable groups (real data — only reference these):\n" +
      top
        .map(
          (g) =>
            `- id=${g.id} | ${g.name} (${g.locationLabel}) — ${g.description} [tags: ${g.tags.join(", ")}]`,
        )
        .join("\n") +
      "\n";
  }

  const { text } = await generateText({
    system:
      NEYA_SYSTEM_PROMPT +
      "\n\nYou are chatting in a local-neighbourhood app.\nIf you reference a group, only reference groups mentioned in the provided list.\nIf none are relevant, ask a single clarifying question.\n" +
      seededContext,
    user: userMessage,
  });

  const reply = text.trim() || "Sorry — I wasn’t able to generate a response.";

  // Keep the starter response shape minimal; candidates can add debug surfaces if they want.
  void matchedGroups;
  return { reply };
}
