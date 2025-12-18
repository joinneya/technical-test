import type { Group } from "./types";
import { MOCK_GROUPS } from "./mockGroups";

export async function searchGroups(query: string): Promise<Group[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Intentionally simple: candidates can upgrade this to embeddings/similarity, etc.
  return MOCK_GROUPS.filter((g) => {
    const haystack = `${g.name}\n${g.description}\n${g.locationLabel}\n${g.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}


