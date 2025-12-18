import type { Group } from "./types";
import { MOCK_GROUPS } from "./mockGroups";

export async function searchGroups(query: string): Promise<Group[]> {
  // TODO(candidate): Implement group search.
  //
  // Requirements:
  // - Return groups from `MOCK_GROUPS` that best match the user's request.
  // - Consider matching across name/description/tags.
  // - Handle multiple plausible matches (e.g. return ranked list, top N, etc.).
  // - Keep it simple: keyword scoring is fine; embeddings are optional.
  //
  // NOTE: This stub intentionally returns no results so the starter agent
  // naturally falls back to asking a clarifying question.
  void query;
  void MOCK_GROUPS;
  return [];
}


