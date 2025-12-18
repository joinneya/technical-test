# Neya – Agentic AI Take-Home Test

Welcome 👋

This repo contains a very small chat application and an intentionally unfinished AI agent.

The goal is **not** to build a feature-rich app, but to design a **well-behaved AI agent** that helps people find the right local group.

You should be able to make meaningful progress in **~2–3 hours**.

## What We’re Trying to Achieve

At Neya, we’re building an AI “super-neighbour” — an assistant that helps people find, meet, and support others in their local area.

This test is designed to evaluate:

- **Agent behaviour** (not just prompts)
- **Ambiguity handling** (ask one good question when needed)
- **Safe tool use** (don’t hallucinate groups)
- **Clear, calm UX** (trustworthy tone)

We care much more about *how you think* than how much you build.

## The Scenario

A user sends a message to Neya, for example:

> “I’m new here and would love to meet other parents with toddlers nearby.”

Your agent should:

1. Understand the request
2. Decide what action (if any) to take
3. Decide whether to ask a single clarifying question, or search for a matching group
4. Respond in a warm, human way (including a suggestion when possible)

## What You Need To Implement (the actual task)

### Task 1: Add conversation history (multi-turn)

Right now the app sends **only the latest user message** to `/api/chat`.

#### Do

- **Persist the chat history** in the UI (client-side is fine).
- Change the `/api/chat` request so you send **an array of messages**, not just a single message.
- Update the backend so `lib/agent.ts` receives the **full conversation context**.

#### Done looks like

- After the user says “Actually I’m in Cambridge”, the agent uses that information on the next turn.

#### Examples to support

- “Yes, that one”
- “Actually I’m in Cambridge”
- “Weekday mornings would be best”

You do **not** need a database for this. **Client-side state** (sending an array of messages) is completely fine — just explain trade-offs in NOTES.md.

### Task 2: Clarification (ask one good question)

#### Do

- Before searching, decide if you have enough info to pick a group.
- If not, ask **one** clarifying question that *changes* what you would search for.

#### Done looks like

- You ask **one** question (not multiple).
- You don’t ask for unnecessary personal info.

#### Examples of good clarifying questions

- “Are you in Oxford or Cambridge?”
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

You can keep it simple. A basic keyword / scoring search is totally fine.
You can always add details about how you would do it if you had more time to NOTES.md

### Hard requirements (please follow)

- **Do not invent groups**. Only suggest groups that exist in `lib/mockGroups.ts`.
- **If unsure, ask one clarifying question** (not multiple).
- **Be calm and human** (no robotic “As an AI model…” tone).

### Optional / up to you

- Using an agent framework/library vs hand-rolled code
- Adding ranking/shortlists (top 3 matches) vs single best match
- Structured decision output + validation + fallback logic
- Tests

## High-Level Architecture

The architecture is deliberately simple:

Chat UI (very basic)
↓
POST `/api/chat`
↓
Single AI Agent

- Receives messages
- Decides whether to **ask** or **suggest**
- Calls `searchGroups()` when appropriate
- Responds

There is:
- No auth
- No database
- No persistence
- No real geo logic

This is about **agent design**, not infrastructure.

## Repo Structure

Keep things small and easy to reason about:

```
app/
  page.tsx             # minimal chat UI page
  api/chat/route.ts    # POST endpoint

components/
  Chat.tsx             # basic chat component

lib/
  agent.ts             # ⭐ core agent logic (most work here)
  llm.ts               # LLM wrapper (Vercel AI SDK)
  tools.ts             # stubbed tools + mock data
  prompt.ts            # system prompt(s)
  types.ts             # shared types / schemas

README.md
NOTES.md               # optional notes if you run out of time
.env.example
```

Most of your work should happen in:

- `lib/agent.ts`
- `lib/tools.ts`

## Tools (Provided)

You may assume a single tool exists:

- `searchGroups(query: string): Group[]`

They’re backed by simple in-memory mock data. The important part is not how smart the tools are, but:

- When the agent decides to call it
- What inputs it provides
- When it decides not to call anything

## How We’ll Assess Your Submission

We’re not scoring “feature count”. We’re looking for good judgement and reliable behaviour.

- **Correctness**: suggests only real groups; doesn’t hallucinate.
- **Ambiguity handling**: asks one good clarifying question when needed; doesn’t interrogate.
- **Search quality**: can find the right group from messy user text; reasonable ranking/selection.
- **Reliability**: handles empty results and LLM weirdness safely (fallbacks, validation, guardrails).
- **Code quality**: readable TypeScript, sensible structure, clear naming, minimal complexity.
- **Communication**: helpful notes/trade-offs in `NOTES.md` if you run out of time.

## What You Don’t Need to Do

You do not need to implement:

- Authentication
- Persistence
- A database (in-memory / client-side state is fine)
- Perfect matching logic
- Real maps or geo
- Complex UI

Please keep things simple.

## Timeboxing

Please timebox yourself to **2–3 hours**.

It’s completely fine if you don’t complete everything. If you run out of time, leave notes in `NOTES.md` explaining:

- What you’d improve next
- What trade-offs you made
- How you’d evolve the agent with more time

## Libraries / frameworks

This starter uses the **[Vercel AI SDK](https://sdk.vercel.ai/docs)** (see `lib/llm.ts`) to keep the LLM integration tiny and provider-agnostic.

You’re welcome to use **any agent library/framework** you prefer — or **no library at all**. We care more about your decisions and reliability than the specific library choice.

Popular options include:

- [LangChain](https://js.langchain.com/)
- [LangGraph](https://langchain-ai.github.io/langgraphjs/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [LlamaIndex](https://ts.llamaindex.ai/)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-js/)
- [Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/)
- [Mastra](https://mastra.ai/)

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

## Submission

Please share:

- A GitHub repo (or zip)
- Any setup notes
- Roughly how long you spent

If it looks promising, we’ll invite you to a call to walk through your agent design, trade-offs, and how you’d extend this in production.
