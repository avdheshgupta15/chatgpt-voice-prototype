import type { Voice } from "./types";

/** 9 seeds to match the 9 pagination dots on Choose-your-voice. */
export const SEED_VOICES: Voice[] = [
  { id: "v_ember", name: "Ember", tagline: "Confident and optimistic", language: "English" },
  { id: "v_breeze", name: "Breeze", tagline: "Light and easygoing", language: "English" },
  { id: "v_juniper", name: "Juniper", tagline: "Warm and encouraging", language: "English" },
  { id: "v_cove", name: "Cove", tagline: "Calm and steady", language: "English" },
  { id: "v_maple", name: "Maple", tagline: "Friendly and bright", language: "English" },
  { id: "v_sol", name: "Sol", tagline: "Energetic and upbeat", language: "English" },
  { id: "v_spruce", name: "Spruce", tagline: "Grounded and clear", language: "English" },
  { id: "v_vale", name: "Vale", tagline: "Soft and thoughtful", language: "English" },
  { id: "v_arbor", name: "Arbor", tagline: "Deep and reassuring", language: "English" },
];

export const DEMO_USER_NAME = "Aagam";

export const SCRIPT: { user: string; assistant: string }[] = [
  {
    user:
      "Hey ChatGPT, what's a quick way to remember Porter's Five Forces before my strategy exam?",
    assistant:
      "Try the acronym '**CRIST**' — Competitive rivalry, Rivalry... want me to make a mnemonic sentence instead?",
  },
  {
    user: "Yeah, do that.",
    assistant:
      "Here you go: \"**C**lever **R**ivals **S**neak **B**ehind **S**ubstitutes\" — Competitors, Rivals, Suppliers, Buyers, Substitutes. Say it once and the five forces stick.",
  },
];

export const CUE_PHRASE = "wait for my cue";
export const WAKE_PHRASE = "hey chatgpt";

export const CUE_ACK = "Got it — I'll wait for your cue. Take your time.";

export const FALLBACK_REPLY =
  "Happy to keep going on that — want me to summarise it, or test you with a quick recall question?";

export const REANSWER_LIST =
  "Absolutely — use \"**C-R-S-B-S**\":\n\n**Manga Five Forces =**\n\n1. **Competitors** — rivalry among existing firms\n2. **Rivals/new entrants** — threat of new entrants\n3. **Suppliers** — bargaining power of suppliers\n4. **Buyers** — bargaining power of customers\n5. **Substitutes** — threat of substitutes";
