import type { Group } from "./types";

const MOCK_GROUPS: Group[] = [
  {
    id: "g_oxford_parents_toddlers",
    name: "Oxford Parents (Toddlers)",
    description:
      "A small group of parents with toddlers who meet for weekday morning walks and occasional playground meetups.",
    locationLabel: "Oxford",
    tags: ["parents", "toddlers", "walks", "playground", "weekdays"],
    cadence: "Weekday mornings",
  },
  {
    id: "g_new_to_area_coffee",
    name: "New to the Area Coffee",
    description:
      "Casual coffee meetups for people who’ve recently moved nearby and want to make friends locally.",
    locationLabel: "Oxford",
    tags: ["new", "friends", "coffee", "community"],
    cadence: "Saturdays",
  },
  {
    id: "g_evening_run_club",
    name: "Evening Run Club",
    description: "Friendly 5k-ish runs at an easy pace. Beginners welcome.",
    locationLabel: "Oxford",
    tags: ["running", "fitness", "evenings", "beginners"],
    cadence: "Tuesdays",
  },
];

export async function searchGroups(query: string): Promise<Group[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Intentionally simple: candidates can upgrade this to embeddings/similarity, etc.
  return MOCK_GROUPS.filter((g) => {
    const haystack = `${g.name}\n${g.description}\n${g.locationLabel}\n${g.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}


