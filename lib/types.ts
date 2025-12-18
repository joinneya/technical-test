export type Group = {
  id: string;
  name: string;
  description: string;
  locationLabel: string;
  tags: string[];
  cadence?: string;
};

// Candidates are encouraged to evolve this into a strict schema (e.g. with Zod) and
// to validate LLM outputs defensively.
export type AgentDecision =
  | {
      type: "suggest_group";
      groupId: string;
      reason: string;
    }
  | {
      type: "ask_clarifying_question";
      question: string;
      reason: string;
    }
  | {
      type: "respond_directly";
      reason: string;
    };


