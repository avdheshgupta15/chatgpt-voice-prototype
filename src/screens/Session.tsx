import { useEffect, useRef, useState } from "react";
import { db } from "../model/db";
import { CUE_ACK, CUE_PHRASE, FALLBACK_REPLY, SCRIPT } from "../model/seed";
import type { Message } from "../model/types";
import {
  HomeIndicator,
  IconCircle,
  Orb,
  StatusBar,
} from "../ui/components";
import {
  MenuIcon,
  MicIcon,
  PlusIcon,
  SlidersIcon,
  XIcon,
} from "../ui/icons";
import { RichText, useDb } from "../ui/hooks";

type Phase = "idle" | "listening" | "thinking" | "speaking";

export function SessionScreen({
  conversationId,
  userName,
  onEnd,
  onMenu,
}: {
  conversationId: string;
  userName: string;
  onEnd: () => void;
  onMenu: () => void;
}) {
  useDb();
  const [phase, setPhase] = useState<Phase>("idle");
  const [liveText, setLiveText] = useState("");
  const [streamText, setStreamText] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const messages = db.messagesOf(conversationId);
  const scriptIdx = messages.filter(
    (m) => m.role === "assistant" && m.content !== CUE_ACK,
  ).length;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const msgs = db.messagesOf(conversationId);
    const last = msgs[msgs.length - 1];
    if (last && last.role === "user") {
      const idx = msgs.filter(
        (m) => m.role === "assistant" && m.content !== CUE_ACK,
      ).length;
      speak(replyFor(idx, last.content));
    }
    // mount-only: answer a message the conversation opened with
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notify = (t: string) => {
    setToast(t);
    later(() => setToast(null), 2600);
  };

  const speak = (reply: string) => {
    setPhase("thinking");
    later(() => {
      setPhase("speaking");
      const words = reply.split(" ");
      words.forEach((_, i) =>
        later(() => setStreamText(words.slice(0, i + 1).join(" ")), i * 55),
      );
      later(() => {
        db.addMessage({
          conversationId,
          role: "assistant",
          content: reply,
          inputMode: "voice",
          isEdited: false,
          reportedBadTranscription: false,
        });
        setStreamText("");
        setPhase("idle");
      }, words.length * 55 + 350);
    }, 650);
  };

  const replyFor = (idx: number, userText: string): string => {
    if (userText.toLowerCase().includes(CUE_PHRASE)) {
      db.markPauseCommand(conversationId);
      return CUE_ACK;
    }
    return idx < SCRIPT.length ? SCRIPT[idx].assistant : FALLBACK_REPLY;
  };

  const listen = () => {
    if (phaseRef.current !== "idle") return;
    const step = SCRIPT[scriptIdx];
    if (!step) {
      notify("Demo script finished — type below or end the call.");
      return;
    }
    setPhase("listening");
    const words = step.user.split(" ");
    words.forEach((_, i) =>
      later(() => setLiveText(words.slice(0, i + 1).join(" ")), 260 + i * 110),
    );
    later(() => {
      db.addMessage({
        conversationId,
        role: "user",
        content: step.user,
        inputMode: "voice",
        isEdited: false,
        reportedBadTranscription: false,
      });
      setLiveText("");
      speak(step.assistant);
    }, 260 + words.length * 110 + 400);
  };

  const sendTyped = () => {
    const text = draft.trim();
    if (!text || phaseRef.current !== "idle") return;
    setDraft("");
    setComposerOpen(false);
    db.addMessage({
      conversationId,
      role: "user",
      content: text,
      inputMode: "typed",
      isEdited: false,
      reportedBadTranscription: false,
    });
    speak(replyFor(scriptIdx, text));
  };

  const end = () => {
    timers.current.forEach(clearTimeout);
    db.endConversation(conversationId);
    onEnd();
  };

  return (
    <div className="flex h-full flex-col">
      <StatusBar micLive={phase === "listening"} />
      <div className="flex items-center justify-between px-6 pt-2">
        <IconCircle label="Menu" onClick={onMenu} className="h-12 w-12">
          <MenuIcon className="h-5 w-5" />
        </IconCircle>
        <IconCircle label="Voice settings" onClick={onMenu} className="h-12 w-12">
          <SlidersIcon className="h-5 w-5" />
        </IconCircle>
      </div>

      <div className="flex flex-col items-center pt-4">
        <Orb size={250} state={phase === "listening" ? "listening" : "idle"} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-8">
        <div className="flex flex-col gap-6">
          {messages.map((m) => (
            <TranscriptLine key={m.id} m={m} userName={userName} />
          ))}
          {phase === "speaking" && streamText && (
            <div className="animate-rise">
              <SpeakerLabel name="ChatGPT" tone="accent" />
              <p className="mt-1 text-[19px] leading-relaxed text-white/95">
                “{streamText}”
              </p>
            </div>
          )}
          {(phase === "listening" || liveText) && (
            <div className="rounded-2xl bg-[#1a1a1a] p-4">
              <div className="flex items-center justify-between">
                <SpeakerLabel name={userName} tone="muted" />
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="dot-pulse h-2 w-2 rounded-full bg-listening"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-1 flex items-center text-[19px] leading-relaxed text-white">
                “{liveText}”
                <span className="animate-caret ml-1 inline-block h-[22px] w-[3px] rounded bg-orb-mid" />
              </p>
            </div>
          )}
          {phase === "thinking" && (
            <p className="text-[15px] text-subtle">ChatGPT is thinking…</p>
          )}
        </div>
      </div>

      {toast && (
        <div className="animate-toast mx-6 mb-2 rounded-2xl bg-card px-4 py-3 text-[15px] text-white/90">
          {toast}
        </div>
      )}

      <div className="px-6 pb-1">
        {composerOpen ? (
          <div className="flex items-center gap-2 rounded-full bg-chip py-2 pr-2 pl-5">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendTyped()}
              placeholder="Type a message"
              className="min-w-0 flex-1 text-[17px] placeholder:text-subtle"
            />
            <button
              onClick={sendTyped}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-white"
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setComposerOpen(true)}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-chip py-4 pr-5 pl-6"
            >
              <PlusIcon className="h-5 w-5 text-white/90" />
              <span className="truncate text-[17px] text-white/90">
                Talk to ChatGPT
              </span>
            </button>
            <button
              aria-label="Microphone"
              onClick={listen}
              className={
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition active:scale-95 " +
                (phase === "listening" ? "bg-chip-pressed" : "bg-chip")
              }
            >
              <MicIcon className="h-6 w-6 text-white" />
            </button>
            <button
              aria-label="End conversation"
              onClick={end}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black transition active:scale-95"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        <HomeIndicator />
      </div>
    </div>
  );
}

function SpeakerLabel({ name, tone }: { name: string; tone: "muted" | "accent" }) {
  return (
    <span
      className={
        "text-[13px] font-semibold tracking-[0.12em] uppercase " +
        (tone === "accent" ? "text-accent" : "text-muted")
      }
    >
      {name}
    </span>
  );
}

function TranscriptLine({ m, userName }: { m: Message; userName: string }) {
  return (
    <div className="animate-rise">
      <SpeakerLabel
        name={m.role === "user" ? userName : "ChatGPT"}
        tone={m.role === "user" ? "muted" : "accent"}
      />
      <div className="mt-1 text-[19px] leading-relaxed text-white/95">
        {m.role === "user" ? <p>“{m.content}”</p> : <RichText text={m.content} />}
      </div>
    </div>
  );
}
