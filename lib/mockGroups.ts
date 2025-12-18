import type { Group } from "./types";

// In-memory dataset for the take-home.
// Candidates can expand this, change the fields, or swap it for a DB/API in a “next steps” section.
export const MOCK_GROUPS: Group[] = [
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
    id: "g_oxford_new_to_area_coffee",
    name: "New to the Area Coffee",
    description:
      "Casual coffee meetups for people who’ve recently moved nearby and want to make friends locally.",
    locationLabel: "Oxford",
    tags: ["new", "friends", "coffee", "community"],
    cadence: "Saturdays",
  },
  {
    id: "g_oxford_evening_run_club",
    name: "Evening Run Club",
    description: "Friendly 5k-ish runs at an easy pace. Beginners welcome.",
    locationLabel: "Oxford",
    tags: ["running", "fitness", "evenings", "beginners"],
    cadence: "Tuesdays",
  },
  {
    id: "g_oxford_bookclub_quiet",
    name: "Quiet Book Club",
    description:
      "Bring a book, read together in silence for an hour, then optional chat afterwards. Low-pressure and friendly.",
    locationLabel: "Oxford",
    tags: ["books", "reading", "introverts", "quiet", "low-pressure"],
    cadence: "Sundays",
  },
  {
    id: "g_oxford_dog_walkers",
    name: "Dog Walkers (Port Meadow)",
    description:
      "Loose group for dog owners who want regular weekday walks and a bit of company. Dogs must be friendly.",
    locationLabel: "Oxford",
    tags: ["dogs", "walking", "outdoors", "weekday"],
    cadence: "Weekdays",
  },
  {
    id: "g_oxford_language_exchange",
    name: "Language Exchange (EN/ES)",
    description:
      "Meet to practise English and Spanish in relaxed conversation. All levels welcome; we rotate partners.",
    locationLabel: "Oxford",
    tags: ["language", "spanish", "english", "conversation", "learning"],
    cadence: "Wednesdays",
  },
  {
    id: "g_oxford_new_mums_support",
    name: "New Mums Circle",
    description:
      "Supportive, non-judgmental space for new mums. Short walks, a café stop, and a place to talk honestly.",
    locationLabel: "Oxford",
    tags: ["parents", "newborns", "support", "mums", "walks"],
    cadence: "Fridays",
  },
  {
    id: "g_oxford_boardgames",
    name: "Board Games Night",
    description:
      "Weekly board games with a mix of light and strategy games. Come solo or bring a friend.",
    locationLabel: "Oxford",
    tags: ["boardgames", "games", "social", "evenings"],
    cadence: "Thursdays",
  },
  {
    id: "g_oxford_cycling_casual",
    name: "Casual Cycling (Canal Path)",
    description:
      "Easy-paced rides, mostly flat. We stop for coffee halfway. Helmets recommended.",
    locationLabel: "Oxford",
    tags: ["cycling", "outdoors", "fitness", "coffee"],
    cadence: "Saturdays",
  },
  {
    id: "g_oxford_volunteering_litterpick",
    name: "Neighbourhood Litter Pick",
    description:
      "Monthly litter pick to keep local streets and parks tidy. Grabbers and bags provided.",
    locationLabel: "Oxford",
    tags: ["volunteering", "community", "outdoors", "environment"],
    cadence: "Monthly",
  },
  {
    id: "g_cambridge_parents_toddlers",
    name: "Cambridge Parents (Toddlers)",
    description:
      "Parents with toddlers who meet for morning walks and occasional soft-play trips.",
    locationLabel: "Cambridge",
    tags: ["parents", "toddlers", "walks", "soft-play", "weekdays"],
    cadence: "Weekday mornings",
  },
  {
    id: "g_cambridge_new_to_area",
    name: "New in Cambridge",
    description:
      "A friendly group for people new to Cambridge. Coffee, pub quizzes, and low-pressure meetups.",
    locationLabel: "Cambridge",
    tags: ["new", "friends", "coffee", "community", "social"],
    cadence: "Biweekly",
  },
];


