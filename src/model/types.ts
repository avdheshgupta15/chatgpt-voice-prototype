export type StartTrigger = "tap_icon" | "wake_word";
export type FeedbackRating = "positive" | "negative";
export type InputMode = "voice" | "typed";
export type Role = "user" | "assistant";

export interface User {
  id: string;
  name: string;
  /** null = not yet asked */
  micPermissionGranted: boolean | null;
  /** FK -> Voice.id, null until Choose-Voice step */
  selectedVoiceId: string | null;
  dataTrainingOptOut: boolean;
  /** for Setup Completion Rate denominator */
  voiceSetupStartedAt: string | null;
  /** for Setup Completion Rate numerator */
  voiceSetupCompletedAt: string | null;
}

export interface Voice {
  id: string;
  name: string;
  tagline: string;
  /** supports Phase-2 Indian regional voices */
  language: string;
}

export interface Conversation {
  id: string;
  userId: string;
  startTrigger: StartTrigger;
  /** Pause Command Adoption metric ("Wait for my cue") */
  pauseCommandUsed: boolean;
  /** 'How was this conversation?' toast */
  feedbackRating: FeedbackRating | null;
  startedAt: string;
  /** set on X-icon tap; Completion Rate = not-null */
  endedAt: string | null;
}

export interface Message {
  id: string;
  conversationId: string;
  role: Role;
  content: string;
  inputMode: InputMode;
  isEdited: boolean;
  reportedBadTranscription: boolean;
  createdAt: string;
}

/**
 * Wake-up command accuracy needs failed attempts too, which no conversation
 * can own — so attempts/activations live at store level (see PRD
 * non-functional metrics).
 */
export interface WakeWordStats {
  attempts: number;
  activations: number;
}

export interface DB {
  users: User[];
  voices: Voice[];
  conversations: Conversation[];
  messages: Message[];
  wakeWord: WakeWordStats;
}
