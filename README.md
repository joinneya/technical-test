# Neya – Agentic AI Take-Home Test

Welcome 👋

This repo contains a very small chat application and an intentionally unfinished AI agent.

The goal of this exercise is **not** to build a feature-rich app, but to design a **well-behaved AI agent** that makes good decisions when helping people connect with others nearby.

You should be able to make meaningful progress on this in **one evening**.

## What We’re Trying to Achieve

At Neya, we’re building an AI “super-neighbour” — an assistant that helps people find, meet, and support others in their local area.

This test is designed to evaluate how you:

- Design **agent behaviour**, not just prompts
- Handle **ambiguity and uncertainty**
- Optionally use **tool usage**
- Separate **reasoning from user-facing language**
- Build AI systems that feel **calm, human, and trustworthy**

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

Most of this repo is just scaffolding. The core task is:

- **Implement group search** in `lib/tools.ts` (`searchGroups(query)`).
- **Implement agent behaviour** in `lib/agent.ts` so that for a given user message Neya will:
  - Suggest the best matching group when the request is clear enough, **or**
  - Ask **one** clarifying question when key info is missing (e.g. Oxford vs Cambridge).

You can keep it simple. A basic keyword / scoring search is totally fine.

### Hard requirements

- **Do not invent groups**. Only suggest groups that exist in `lib/mockGroups.ts`.
- **If unsure, ask one clarifying question** (not multiple).
- **Be calm and human** (no robotic “As an AI model…” tone).

### What’s optional / up to you

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
- interprets the message
- makes a decision
- uses tools if appropriate
- generates a final response

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
  llm.ts               # thin Gemini wrapper
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

## The Agent’s Responsibilities

The agent should roughly follow this loop:

User message → Interpret → Decide what to do → Use tools (or not) → Generate a final response

How you implement this is up to you, but we are looking for **clear separation of concerns**.

## Tools (Provided)

You may assume a single tool exists:

- `searchGroups(query: string): Group[]`

They’re backed by simple in-memory mock data. The important part is not how smart the tools are, but:

- When the agent decides to call it
- What inputs it provides
- When it decides not to call anything

## Key Objectives

### 1) Agentic Decision-Making

We’re looking for an explicit decision step, for example:

- Suggest an existing group
- Ask a clarifying question
- Decide to do nothing yet

Strong solutions usually represent this as a structured decision, not free-text.

### 2) Handling Ambiguity

Users will often be vague. For example:

> “I’d like to meet people nearby.”

Good agent behaviour here is:

- Recognising missing information
- Asking one helpful follow-up question
- Not hallucinating a solution

### 3) Tool Control

The agent should:

- Only use tools when it makes sense
- Avoid inventing data
- Handle empty or low-confidence results gracefully

### 4) Separation of Reasoning and Tone

We strongly prefer designs where:

- The agent’s internal reasoning / decision is not shown to the user
- The final user message is generated after the decision is made
- The response feels human, calm, and supportive (not robotic)

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
- Perfect matching logic
- Real maps or geo
- Complex UI

Please keep things simple.

## Timeboxing

Please timebox yourself to **2–4 hours**.

It’s completely fine if you don’t complete everything. If you run out of time, leave notes in `NOTES.md` explaining:

- What you’d improve next
- What trade-offs you made
- How you’d evolve the agent with more time

## Libraries / frameworks

You’re welcome to use an **agent library/framework** if you prefer (or write it “by hand”). We care more about your decisions and reliability than the specific library choice.

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
