import { DEMO_USER_NAME, SEED_VOICES } from "./seed";
import type {
  Conversation,
  DB,
  FeedbackRating,
  Message,
  StartTrigger,
  User,
} from "./types";

const KEY = "chatgpt-voice/db/v1";

function fresh(): DB {
  return {
    users: [
      {
        id: "u_aagam",
        name: DEMO_USER_NAME,
        micPermissionGranted: null,
        selectedVoiceId: null,
        dataTrainingOptOut: false,
        voiceSetupStartedAt: null,
        voiceSetupCompletedAt: null,
      },
    ],
    voices: SEED_VOICES,
    conversations: [],
    messages: [],
    wakeWord: { attempts: 0, activations: 0 },
  };
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DB;
  } catch {
    /* corrupted store -> reseed */
  }
  return fresh();
}

let state: DB = load();
const listeners = new Set<() => void>();

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state));
  const next = { ...state };
  state = next;
  listeners.forEach((fn) => fn());
}

export const db = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  snapshot(): DB {
    return state;
  },
  reset() {
    state = fresh();
    persist();
  },

  user(): User {
    return state.users[0];
  },
  updateUser(patch: Partial<User>) {
    state.users = state.users.map((u) => ({ ...u, ...patch }));
    persist();
  },

  voice(id: string | null) {
    return state.voices.find((v) => v.id === id) ?? null;
  },

  startConversation(trigger: StartTrigger): Conversation {
    const conv: Conversation = {
      id: `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      userId: this.user().id,
      startTrigger: trigger,
      pauseCommandUsed: false,
      feedbackRating: null,
      startedAt: new Date().toISOString(),
      endedAt: null,
    };
    state.conversations = [...state.conversations, conv];
    if (trigger === "wake_word") {
      state.wakeWord = {
        attempts: state.wakeWord.attempts + 1,
        activations: state.wakeWord.activations + 1,
      };
    }
    persist();
    return conv;
  },
  recordMissedWakeWord() {
    state.wakeWord = { ...state.wakeWord, attempts: state.wakeWord.attempts + 1 };
    persist();
  },
  endConversation(id: string) {
    state.conversations = state.conversations.map((c) =>
      c.id === id && !c.endedAt ? { ...c, endedAt: new Date().toISOString() } : c,
    );
    persist();
  },
  markPauseCommand(id: string) {
    state.conversations = state.conversations.map((c) =>
      c.id === id ? { ...c, pauseCommandUsed: true } : c,
    );
    persist();
  },
  setFeedback(id: string, rating: FeedbackRating) {
    state.conversations = state.conversations.map((c) =>
      c.id === id ? { ...c, feedbackRating: rating } : c,
    );
    persist();
  },
  conversation(id: string) {
    return state.conversations.find((c) => c.id === id) ?? null;
  },

  addMessage(m: Omit<Message, "id" | "createdAt"> & { createdAt?: string }): Message {
    const msg: Message = {
      ...m,
      id: `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: m.createdAt ?? new Date().toISOString(),
    };
    state.messages = [...state.messages, msg];
    persist();
    return msg;
  },
  messagesOf(conversationId: string): Message[] {
    return state.messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
  updateMessage(id: string, patch: Partial<Message>) {
    state.messages = state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m));
    persist();
  },
  /** Editing a message invalidates everything that answered it. */
  truncateAfter(messageId: string) {
    const target = state.messages.find((m) => m.id === messageId);
    if (!target) return;
    state.messages = state.messages.filter(
      (m) =>
        m.conversationId !== target.conversationId ||
        m.createdAt <= target.createdAt ||
        m.id === messageId,
    );
    persist();
  },
};
