# Neya – Agentic AI Take-Home Test

## Overview

This repo contains a very small chat application and an intentionally unfinished AI agent.

The goal is **not** to build a feature-rich app, but to design a **well-behaved AI agent** that helps people find the right group.

Timebox: **~2–3 hours**.

## The scenario

A user sends a message to Neya, for example:

> “I’m new and would love to meet other parents with toddlers.”

Your agent should:

- Understand the request
- Decide whether to ask **one** clarifying question, or search for a matching group
- Respond in a warm, human way (including a suggestion when possible)

## The tasks

### Task 1: Add conversation history (multi-turn)

Right now the app sends **only the latest user message** to `/api/chat`.

#### Do

- **Persist the chat history** in the UI (client-side is fine).
- Change the `/api/chat` request so you send **an array of messages**, not just a single message.
- Update the backend so the agent receives the **full conversation context** (not just the last message).

Suggested touch points:

- `components/Chat.tsx`
- `app/api/chat/route.ts`
- `lib/agent.ts`

#### Done looks like

- After the user adds important context (e.g. “Actually I prefer weekday mornings”), the agent uses that information on the next turn.

You do **not** need a database for this. **Client-side state** (sending an array of messages) is completely fine — just explain trade-offs in `NOTES.md`.

### Task 2: Clarification (ask one good question)

#### Do

- Before searching, decide if you have enough info to pick a group.
- If not, ask **one** clarifying question that *changes* what you would search for.

#### Done looks like

- You ask **one** question (not multiple).
- You don’t ask for unnecessary personal info.

#### Examples of good clarifying questions (aligned with the dataset)

- “Is this for parents with toddlers, new mums, or meeting people generally?”
- “Would you prefer something like a weekday morning walk, or an evening meetup?”
- “Are you hoping for something active (a run / cycle), or something social (coffee / board games / book club)?”
- “Are you looking for something community-focused (like volunteering), or more just to meet people?”

### Task 3: Group search + suggestion

#### Do

- Implement `searchGroups(query)` in `lib/tools.ts` (it’s intentionally a stub).
- Use `lib/mockGroups.ts` as the only source of truth (feel free to extend).
- In `lib/agent.ts`, when the request is clear enough:
  - Call `searchGroups()`
  - Pick the best match (or a small shortlist)
  - Respond with a suggestion and a short reason

#### Done looks like

- The agent suggests a **real group** from `lib/mockGroups.ts`.
- It doesn’t hallucinate groups or details.
- If search returns no good match, the agent falls back to **Task 2** (ask one clarifying question).

You can keep it simple. A basic keyword / scoring search is totally fine. If you run out of time, write “next steps” in `NOTES.md`.

## Hard requirements (please follow)

- **Do not invent groups**. Only suggest groups that exist in `lib/mockGroups.ts`.
- **If unsure, ask one clarifying question** (not multiple).
- **Be calm and human** (no robotic “As an AI model…” tone).

## What you don’t need to do

- Authentication
- A database (client-side / in-memory state is fine)
- Perfect matching logic
- Real maps or geo
- Complex UI

## How we’ll assess your submission

We’re not scoring “feature count”. We’re looking for good judgement and reliable behaviour.

- **Correctness**: suggests only real groups; doesn’t hallucinate.
- **Ambiguity handling**: asks one good clarifying question when needed; doesn’t interrogate.
- **Search quality**: can find the right group from messy user text; reasonable ranking/selection.
- **Reliability**: handles empty results and LLM weirdness safely (fallbacks, validation, guardrails).
- **Code quality**: readable TypeScript, sensible structure, clear naming, minimal complexity.
- **Communication**: helpful notes/trade-offs in `NOTES.md` if you run out of time.

## Libraries / frameworks

This starter uses the **[Vercel AI SDK](https://sdk.vercel.ai/docs)** (see `lib/llm.ts`) to keep the LLM integration tiny and provider-agnostic.

You’re welcome to use **any agent library/framework** you prefer — or **no library at all**.

Popular options include:

- [LangChain](https://js.langchain.com/)
- [LangGraph](https://langchain-ai.github.io/langgraphjs/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [LlamaIndex](https://ts.llamaindex.ai/)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-js/)
- [Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/)
- [Mastra](https://mastra.ai/)

## Submission

Please share:

- A GitHub repo (or zip)
- Any setup notes
- Roughly how long you spent

If it looks promising, we’ll invite you to a call to walk through your agent design, trade-offs, and how you’d extend this in production.


