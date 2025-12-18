import type { Group } from "./types";

// In-memory dataset for the take-home.
// Candidates can expand this, change the fields, or swap it for a DB/API in a “next steps” section.
export const MOCK_GROUPS: Group[] = [
  {
    id: "g_parents_toddlers_walks",
    name: "Parents (Toddlers) Walks",
    description:
      "A small group of parents with toddlers who meet for weekday morning walks and occasional playground meetups.",
    tags: ["parents", "toddlers", "walks", "playground", "weekdays"],
    cadence: "Weekday mornings",
  },
  {
    id: "g_newcomers_coffee",
    name: "Newcomers Coffee",
    description:
      "Casual coffee meetups for people who’ve recently moved and want to make new friends.",
    tags: ["new", "friends", "coffee", "community"],
    cadence: "Saturdays",
  },
  {
    id: "g_evening_run_club",
    name: "Evening Run Club",
    description: "Friendly 5k-ish runs at an easy pace. Beginners welcome.",
    tags: ["running", "fitness", "evenings", "beginners"],
    cadence: "Tuesdays",
  },
  {
    id: "g_quiet_book_club",
    name: "Quiet Book Club",
    description:
      "Bring a book, read together in silence for an hour, then optional chat afterwards. Low-pressure and friendly.",
    tags: ["books", "reading", "introverts", "quiet", "low-pressure"],
    cadence: "Sundays",
  },
  {
    id: "g_dog_walkers",
    name: "Dog Walkers Meetup",
    description:
      "Loose group for dog owners who want regular weekday walks and a bit of company. Dogs must be friendly.",
    tags: ["dogs", "walking", "outdoors", "weekday"],
    cadence: "Weekdays",
  },
  {
    id: "g_language_exchange_en_es",
    name: "Language Exchange (EN/ES)",
    description:
      "Meet to practise English and Spanish in relaxed conversation. All levels welcome; we rotate partners.",
    tags: ["language", "spanish", "english", "conversation", "learning"],
    cadence: "Wednesdays",
  },
  {
    id: "g_new_mums_circle",
    name: "New Mums Circle",
    description:
      "Supportive, non-judgmental space for new mums. Short walks, a café stop, and a place to talk honestly.",
    tags: ["parents", "newborns", "support", "mums", "walks"],
    cadence: "Fridays",
  },
  {
    id: "g_board_games_night",
    name: "Board Games Night",
    description:
      "Weekly board games with a mix of light and strategy games. Come solo or bring a friend.",
    tags: ["boardgames", "games", "social", "evenings"],
    cadence: "Thursdays",
  },
  {
    id: "g_casual_cycling_ride",
    name: "Casual Cycling Ride",
    description:
      "Easy-paced rides, mostly flat. We stop for coffee halfway. Helmets recommended.",
    tags: ["cycling", "outdoors", "fitness", "coffee"],
    cadence: "Saturdays",
  },
  {
    id: "g_community_litter_pick",
    name: "Community Litter Pick",
    description:
      "Monthly litter pick to help keep shared spaces tidy. Grabbers and bags provided.",
    tags: ["volunteering", "community", "outdoors", "environment"],
    cadence: "Monthly",
  },
];


