import { useState } from "react";
import {
  ChatIcon,
  GlobeIcon,
  ImageIcon,
  MenuIcon,
  MicIcon,
  PencilIcon,
  PlusIcon,
  SparkleIcon,
} from "../ui/icons";
import {
  IconCircle,
  Orb,
  PrimaryButton,
  StatusBar,
  VoiceOrbButton,
} from "../ui/components";

function ComposerBar({
  onVoice,
  onSendTyped,
  placeholder = "Talk to ChatGPT",
}: {
  onVoice: () => void;
  onSendTyped: (text: string) => void;
  placeholder?: string;
}) {
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    setTyping(false);
    onSendTyped(t);
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-[#212121] py-2 pr-2 pl-5">
      <PlusIcon className="h-6 w-6 shrink-0 text-white" />
      {typing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={placeholder}
          className="min-w-0 flex-1 text-[17px] text-white placeholder:text-subtle"
        />
      ) : (
        <button
          onClick={() => setTyping(true)}
          className="min-w-0 flex-1 truncate text-left text-[17px] text-subtle"
        >
          {placeholder}
        </button>
      )}
      <button aria-label="Dictate" className="px-1 text-white/90">
        <MicIcon className="h-6 w-6" />
      </button>
      <VoiceOrbButton onClick={onVoice} />
    </div>
  );
}

function SuggestionRows({ onTap }: { onTap: () => void }) {
  const rows = [
    { icon: ImageIcon, label: "Create an image or sticker" },
    { icon: PencilIcon, label: "Write or edit" },
    { icon: GlobeIcon, label: "Search the web" },
  ];
  return (
    <div className="flex flex-col gap-5">
      {rows.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={onTap}
          className="flex items-center gap-4 text-left"
        >
          <Icon className="h-6 w-6 text-white/85" />
          <span className="text-[19px] text-white/90">{label}</span>
        </button>
      ))}
    </div>
  );
}

export function HomeScreen({
  onVoice,
  onSendTyped,
  onMenu,
}: {
  onVoice: () => void;
  onSendTyped: (text: string) => void;
  onMenu: () => void;
}) {
  return (
    <div className="flex h-full flex-col px-6">
      <StatusBar />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <IconCircle label="Menu" onClick={onMenu}>
            <MenuIcon className="h-5 w-5" />
          </IconCircle>
          <button className="flex items-center gap-2 rounded-full bg-card px-5 py-3">
            <SparkleIcon className="h-4 w-4 text-accent" />
            <span className="text-[16px] font-medium text-accent">Upgrade</span>
          </button>
        </div>
        <IconCircle label="Chats" className="h-12 w-12">
          <ChatIcon className="h-5 w-5" />
        </IconCircle>
      </div>
      <div className="flex-1" />
      <SuggestionRows onTap={() => undefined} />
      <div className="pt-6 pb-3">
        <ComposerBar onVoice={onVoice} onSendTyped={onSendTyped} />
      </div>
    </div>
  );
}

export function MicPermissionModal({
  onAllow,
  onDeny,
}: {
  onAllow: () => void;
  onDeny: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 px-8">
      <div className="w-full rounded-[28px] bg-[#242424] p-6 shadow-2xl">
        <h2 className="text-center text-[27px] leading-[1.25] font-bold tracking-tight">
          Microphone
          <br />
          access required
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          <PrimaryButton onClick={onAllow}>Allow</PrimaryButton>
          <button
            onClick={onDeny}
            className="w-full rounded-full bg-[#3a3a3a] py-4 text-[17px] font-semibold tracking-tight transition active:scale-[0.985]"
          >
            Don't Allow
          </button>
        </div>
      </div>
    </div>
  );
}

export function MeetNewVoiceScreen({
  onStart,
  onMenu,
}: {
  onStart: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="flex h-full flex-col px-6">
      <StatusBar />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <IconCircle label="Menu" onClick={onMenu}>
            <MenuIcon className="h-5 w-5" />
          </IconCircle>
          <button className="flex items-center gap-2 rounded-full bg-card px-5 py-3">
            <SparkleIcon className="h-4 w-4 text-accent" />
            <span className="text-[16px] font-medium text-accent">Upgrade</span>
          </button>
        </div>
        <IconCircle label="Chats" className="h-12 w-12">
          <ChatIcon className="h-5 w-5" />
        </IconCircle>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <Orb size={200} sideGlow />
        <div className="text-center">
          <h1 className="text-[32px] font-bold tracking-tight">
            Meet the new Voice
          </h1>
          <p className="mt-4 text-[19px] leading-relaxed text-muted">
            More natural conversations, powered
            <br />
            by our next-generation voice model
          </p>
        </div>
        <PrimaryButton wide={false} onClick={onStart}>
          Start Voice
        </PrimaryButton>
      </div>
      <div className="pb-3">
        <div className="flex items-center gap-2 rounded-full bg-[#212121] py-2 pr-2 pl-5">
          <PlusIcon className="h-6 w-6 text-white" />
          <span className="flex-1 text-[17px] text-subtle">Talk To ChatGPT</span>
          <MicIcon className="h-6 w-6 text-white/90" />
          <VoiceOrbButton />
        </div>
      </div>
    </div>
  );
}
