import { db } from "./db";

const pct = (num: number, den: number) =>
  den === 0 ? "—" : `${((num / den) * 100).toFixed(1)}%`;

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

/** PRD functional + non-functional metrics, computed live from the store. */
export function computeMetrics() {
  const s = db.snapshot();
  const users = s.users;
  const convs = s.conversations;
  const week = daysAgo(7);
  const today = new Date().toDateString();

  const activeVoiceUsers = users.filter((u) =>
    convs.some((c) => c.userId === u.id),
  ).length;
  const startedSetup = users.filter((u) => u.voiceSetupStartedAt).length;
  const completedSetup = users.filter((u) => u.voiceSetupCompletedAt).length;
  const completedConvs = convs.filter((c) => c.endedAt).length;
  const switchedToTyping = convs.filter((c) =>
    s.messages.some((m) => m.conversationId === c.id && m.inputMode === "typed"),
  ).length;
  const rated = convs.filter((c) => c.feedbackRating);
  const positive = rated.filter((c) => c.feedbackRating === "positive").length;
  const weekConvs = convs.filter((c) => c.startedAt >= week);
  const weekUsers = new Set(weekConvs.map((c) => c.userId)).size;
  const paused = convs.filter((c) => c.pauseCommandUsed).length;
  const dau = new Set(
    convs
      .filter((c) => new Date(c.startedAt).toDateString() === today)
      .map((c) => c.userId),
  ).size;
  const mau = new Set(convs.map((c) => c.userId)).size;

  return [
    { label: "Voice Adoption Rate", value: pct(activeVoiceUsers, users.length) },
    { label: "Setup Completion Rate", value: pct(completedSetup, startedSetup) },
    {
      label: "Conversation Completion Rate",
      value: pct(completedConvs, convs.length),
    },
    {
      label: "Voice → Typing Switch Rate",
      value: pct(switchedToTyping, convs.length),
    },
    { label: "CSAT for conversation", value: pct(positive, rated.length) },
    {
      label: "Avg voice conversations / user (weekly)",
      value: weekUsers === 0 ? "—" : (weekConvs.length / weekUsers).toFixed(1),
    },
    { label: "Pause Command Adoption", value: pct(paused, convs.length) },
    {
      label: "Wake-up Command Accuracy",
      value: pct(s.wakeWord.activations, s.wakeWord.attempts),
    },
    { label: "Stickiness Ratio (DAU/MAU)", value: pct(dau, mau) },
  ];
}
