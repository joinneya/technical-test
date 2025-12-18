import { NEYA_SYSTEM_PROMPT } from "./prompt";
import { generateText } from "./llm";
import { searchGroups } from "./tools";
import type { AgentDecision, Group } from "./types";

export type RunAgentArgs = {
  message: string;
  debug?: boolean;
};

export type RunAgentResult = {
  reply: string;
  debug?: {
    model: string;
    // In a stronger solution, this would be a validated `AgentDecision` (and tool inputs/outputs).
    decision?: AgentDecision;
    matchedGroups?: Group[];
  };
};

export async function runAgent(args: RunAgentArgs): Promise<RunAgentResult> {
  const userMessage = args.message.trim();

  // This starter implementation is intentionally naive: it does one LLM call and returns text.
  // The test is to evolve this into a well-behaved agent with:
  //
  // TODO(candidate): 1) Interpret + decide (structured output)
  // - Ask the LLM for a structured `AgentDecision` (JSON) describing what to do next.
  // - Validate it defensively (e.g. Zod). Add fallback logic if invalid.
  //
  // TODO(candidate): 2) Tool use with gating
  // - Only call `searchGroups` when the decision explicitly requires it.
  // - Never hallucinate tool outputs or group IDs.
  //
  // TODO(candidate): 3) Separate decisioning from tone
  // - Keep the decision step non-user-facing.
  // - Generate the final user reply after tools run (optional second LLM pass).

  // Small “starter heuristic” to make the demo feel less blank, without prescribing a solution:
  // If the message contains a clear keyword, try a quick search and reference a real group.
  const quickQuery = extractQuickQuery(userMessage);
  const matchedGroups = quickQuery ? await searchGroups(quickQuery) : [];

  let seededContext = "";
  if (matchedGroups.length > 0) {
    const top = matchedGroups[0]!;
    seededContext = `\n\nContext (real data): There is an existing group: "${top.name}" in ${top.locationLabel}. Description: ${top.description}\n`;
  }

  const { text, model } = await generateText({
    system:
      NEYA_SYSTEM_PROMPT +
      "\n\nYou are chatting in a local-neighbourhood app.\nIf you reference a group, only reference groups mentioned in the provided context.\n" +
      seededContext,
    user: userMessage,
  });

  const reply = text.trim() || "Sorry — I wasn’t able to generate a response.";

  // Optional debug surface: useful for candidates during development.
  return args.debug
    ? {
        reply,
        debug: {
          model,
          matchedGroups,
          decision: matchedGroups[0]
            ? {
                type: "suggest_group",
                groupId: matchedGroups[0].id,
                reason: "Starter heuristic: keyword search matched a group.",
              }
            : {
                type: "respond_directly",
                reason: "Starter baseline: single-pass response without tool calls.",
              },
        },
      }
    : { reply };
}

function extractQuickQuery(message: string): string | null {
  const m = message.toLowerCase();
  if (m.includes("toddler") || m.includes("toddlers")) return "toddlers";
  if (m.includes("parent") || m.includes("parents")) return "parents";
  if (m.includes("run") || m.includes("running")) return "running";
  if (m.includes("new") && (m.includes("area") || m.includes("here"))) return "new";
  return null;
}

