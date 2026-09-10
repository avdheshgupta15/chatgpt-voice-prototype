import { useState, type ReactNode } from "react";
import { db } from "../model/db";
import type { Voice } from "../model/types";
import {
  HomeIndicator,
  IconCircle,
  Orb,
  PrimaryButton,
  StatusBar,
  Waveform,
} from "../ui/components";
import {
  InfoIcon,
  ShieldIcon,
  SlidersIcon,
  WaveIcon,
  XIcon,
} from "../ui/icons";

function WizardShell({
  onClose,
  children,
  footer,
}: {
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="absolute top-2 right-6 z-10">
          <IconCircle label="Close" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </IconCircle>
        </div>
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-7">
          <div className="m-auto flex w-full flex-col items-center">
            {children}
          </div>
        </div>
      </div>
      <div className="px-7 pb-1">
        {footer}
        <HomeIndicator />
      </div>
    </div>
  );
}

export function MeetVoiceScreen({
  onContinue,
  onClose,
}: {
  onContinue: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      footer={<PrimaryButton onClick={onContinue}>Continue</PrimaryButton>}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <Orb size={230} sideGlow />
        <h1 className="text-[36px] font-bold tracking-tight">Meet Voice</h1>
        <div className="flex w-full flex-col gap-8">
          <div className="flex gap-5">
            <WaveIcon className="mt-1 h-7 w-7 shrink-0 text-white" />
            <p className="text-[19px] leading-relaxed text-on-surface-variant">
              Say what's on your mind. ChatGPT listens, responds, and keeps the
              conversation flowing naturally.
            </p>
          </div>
          <div className="flex gap-5">
            <InfoIcon className="mt-1 h-7 w-7 shrink-0 text-white" />
            <p className="text-[19px] leading-relaxed text-on-surface-variant">
              Audio and video are saved to let you continue the conversation.{" "}
              <span className="underline underline-offset-4">Learn more</span>
            </p>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}

export function ChooseVoiceScreen({
  voices,
  onContinue,
  onClose,
}: {
  voices: Voice[];
  onContinue: (voiceId: string) => void;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState<number | null>(null);
  const voice = voices[idx];

  const commit = (dx: number) => {
    if (dx < -48) setIdx((i) => Math.min(i + 1, voices.length - 1));
    if (dx > 48) setIdx((i) => Math.max(i - 1, 0));
  };

  return (
    <WizardShell
      onClose={onClose}
      footer={<PrimaryButton onClick={() => onContinue(voice.id)}>Continue</PrimaryButton>}
    >
      <div className="mt-6 mb-2 w-full">
        <h1 className="text-center text-[25px] font-bold tracking-tight">
          Choose your voice
        </h1>
      </div>
      <div
        className="flex w-full flex-1 touch-pan-y flex-col items-center justify-center gap-9"
        onPointerDown={(e) => setDragX(e.clientX)}
        onPointerUp={(e) => {
          if (dragX !== null) commit(e.clientX - dragX);
          setDragX(null);
        }}
      >
        <Orb size={250} />
        <div className="text-center">
          <h2 className="text-[36px] font-bold tracking-tight">{voice.name}</h2>
          <p className="mt-2 text-[20px] text-muted">{voice.tagline}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {voices.map((v, i) => (
            <button
              key={v.id}
              aria-label={v.name}
              onClick={() => setIdx(i)}
              className={
                "h-1.5 w-1.5 rounded-full " +
                (i === idx ? "bg-white" : "bg-dot-inactive")
              }
            />
          ))}
        </div>
      </div>
    </WizardShell>
  );
}

function PhraseCard({
  chip,
  chipTone,
  phrase,
  hint,
  tone,
}: {
  chip: string;
  chipTone: "white" | "blue";
  phrase: string;
  hint: string;
  tone: "white" | "blue";
}) {
  return (
    <div className="w-full rounded-3xl bg-[#1c1c1e] p-6">
      <span
        className={
          "inline-flex items-center gap-2 rounded-full bg-[#2c2c2e] px-4 py-1.5 text-[13px] font-semibold tracking-[0.08em] " +
          (chipTone === "white" ? "text-white/80" : "text-[#a5b4ff]")
        }
      >
        <span
          className={
            "h-1.5 w-1.5 rounded-full " +
            (chipTone === "white" ? "bg-white" : "bg-orb-mid")
          }
        />
        {chip}
      </span>
      <h3 className="mt-4 text-[23px] font-bold tracking-tight">“{phrase}”</h3>
      <p className="mt-1.5 text-[16px] text-muted">{hint}</p>
      <div className="mt-5">
        <Waveform tone={tone} />
      </div>
    </div>
  );
}

export function WakeWaitScreen({
  onContinue,
  onClose,
}: {
  onContinue: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      footer={<PrimaryButton onClick={onContinue}>Continue</PrimaryButton>}
    >
      <div className="mt-6 mb-2 w-full">
        <h1 className="text-center text-[25px] leading-snug font-bold tracking-tight">
          Introducing Wake word and
          <br />
          Wait Word
        </h1>
      </div>
      <div className="my-4">
        <Orb size={210} sideGlow />
      </div>
      <div className="flex w-full flex-col gap-5 pb-4">
        <PhraseCard
          chip="PHRASE 1 • WAKE WORD"
          chipTone="white"
          phrase="Hey ChatGPT"
          hint="Say phrase to start talking hands-free"
          tone="white"
        />
        <PhraseCard
          chip="PHRASE 2 • CUE PHRASE"
          chipTone="blue"
          phrase="Wait For My Cue"
          hint="Say the word to express a long thought"
          tone="blue"
        />
      </div>
    </WizardShell>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={
        "relative h-7 w-12 shrink-0 rounded-full transition-colors " +
        (on ? "bg-cta" : "bg-white/20")
      }
    >
      <span
        className={
          "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all " +
          (on ? "left-[22px]" : "left-0.5")
        }
      />
    </button>
  );
}

export function SecurityControlScreen({
  onFinish,
  onClose,
}: {
  onFinish: (optOut: boolean) => void;
  onClose: () => void;
}) {
  const [optOut, setOptOut] = useState(db.user().dataTrainingOptOut);
  return (
    <WizardShell
      onClose={onClose}
      footer={
        <PrimaryButton onClick={() => onFinish(optOut)}>
          Start Conversation
        </PrimaryButton>
      }
    >
      <div className="my-6">
        <Orb size={220} sideGlow />
      </div>
      <h1 className="text-[34px] font-bold tracking-tight">
        Security and Control
      </h1>
      <div className="mt-8 flex w-full flex-col gap-8">
        <div className="flex gap-5">
          <ShieldIcon className="mt-1 h-7 w-7 shrink-0 text-white" />
          <p className="text-[18px] leading-relaxed text-on-surface-variant">
            <strong className="font-semibold text-white">Full Encryption:</strong>{" "}
            Your audio is securely encrypted while traveling to our servers and
            whenever it is stored.
          </p>
        </div>
        <div className="flex gap-5">
          <SlidersIcon className="mt-1 h-7 w-7 shrink-0 text-white" />
          <p className="text-[18px] leading-relaxed text-on-surface-variant">
            <strong className="font-semibold text-white">
              You're in Control:
            </strong>{" "}
            You can opt out of data training or delete your voice history at
            any time in your Account Settings.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#1c1c1e] px-5 py-4">
          <span className="text-[16px] font-semibold">
            Opt out of data training
          </span>
          <Toggle on={optOut} onChange={setOptOut} />
        </div>
        <button className="text-left text-[16px] text-muted underline underline-offset-4">
          Learn more about voice security &amp; encryption
        </button>
      </div>
      <div className="flex-1" />
    </WizardShell>
  );
}
