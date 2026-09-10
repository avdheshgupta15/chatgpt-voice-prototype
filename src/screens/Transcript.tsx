import { useRef, useState } from "react";
import { db } from "../model/db";
import type { Message } from "../model/types";
import {
  HomeIndicator,
  IconCircle,
  StatusBar,
  VoiceOrbButton,
} from "../ui/components";
import {
  CopyIcon,
  EditSquareIcon,
  MenuIcon,
  MicIcon,
  MoreIcon,
  PencilIcon,
  PlusIcon,
  SelectTextIcon,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  XIcon,
} from "../ui/icons";
import { RichText, useDb } from "../ui/hooks";

type MenuTarget = { messageId: string; allowEdit: boolean } | null;

export function TranscriptScreen({
  conversationId,
  onEdit,
  onNewSession,
  onMenu,
}: {
  conversationId: string;
  onEdit: (messageId: string) => void;
  onNewSession: () => void;
  onMenu: () => void;
}) {
  useDb();
  const conv = db.conversation(conversationId);
  const messages = db.messagesOf(conversationId);
  const [menu, setMenu] = useState<MenuTarget>(null);
  const [thanked, setThanked] = useState(false);
  const press = useRef<number | null>(null);

  if (!conv) return null;

  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  const longPress = (id: string, allowEdit: boolean) => ({
    onPointerDown: () => {
      press.current = window.setTimeout(
        () => setMenu({ messageId: id, allowEdit }),
        450,
      );
    },
    onPointerUp: () => press.current && clearTimeout(press.current),
    onPointerLeave: () => press.current && clearTimeout(press.current),
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();
      setMenu({ messageId: id, allowEdit });
    },
  });

  const act = (kind: string, m: Message) => {
    setMenu(null);
    if (kind === "copy") {
      navigator.clipboard?.writeText(m.content).catch(() => undefined);
      return;
    }
    if (kind === "edit") {
      onEdit(m.id);
      return;
    }
    if (kind === "bad") {
      db.updateMessage(m.id, { reportedBadTranscription: true });
      return;
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center justify-between px-6 pt-2">
        <IconCircle label="Menu" onClick={onMenu} className="h-12 w-12">
          <MenuIcon className="h-5 w-5" />
        </IconCircle>
        <div className="flex items-center gap-4 rounded-full bg-chip px-5 py-3">
          <button
            aria-label="Edit last message"
            onClick={() => lastUser && onEdit(lastUser.id)}
          >
            <EditSquareIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Message actions"
            onClick={() =>
              lastUser && setMenu({ messageId: lastUser.id, allowEdit: true })
            }
          >
            <MoreIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <div className="flex flex-col gap-6">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <button
                  {...longPress(m.id, true)}
                  className="max-w-[85%] rounded-3xl bg-user-bubble px-5 py-4 text-left text-[17px] leading-relaxed text-white"
                >
                  {m.content}
                  {m.isEdited && (
                    <span className="ml-2 text-[13px] text-white/60">edited</span>
                  )}
                </button>
              </div>
            ) : (
              <div key={m.id} className="animate-rise">
                <div
                  {...longPress(m.id, false)}
                  className="text-[17px] leading-relaxed text-white/95"
                >
                  <RichText text={m.content} />
                </div>
                <div className="mt-4 flex items-center gap-6 text-muted">
                  <button
                    aria-label="Copy"
                    onClick={() =>
                      navigator.clipboard?.writeText(m.content).catch(() => undefined)
                    }
                  >
                    <CopyIcon className="h-5 w-5" />
                  </button>
                  <button aria-label="Good response">
                    <ThumbUpIcon className="h-5 w-5" />
                  </button>
                  <button aria-label="Bad response">
                    <ThumbDownIcon className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="More"
                    onClick={() => setMenu({ messageId: m.id, allowEdit: false })}
                  >
                    <MoreIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ),
          )}

          {conv.feedbackRating === null ? (
            <div className="mt-2 flex items-center justify-between rounded-2xl bg-card px-5 py-4">
              <span className="text-[16px]">How was this conversation?</span>
              <span className="flex items-center gap-5">
                <button
                  aria-label="Negative"
                  onClick={() => {
                    db.setFeedback(conversationId, "negative");
                    setThanked(true);
                  }}
                >
                  <ThumbDownIcon className="h-6 w-6" />
                </button>
                <button
                  aria-label="Positive"
                  onClick={() => {
                    db.setFeedback(conversationId, "positive");
                    setThanked(true);
                  }}
                >
                  <ThumbUpIcon className="h-6 w-6" />
                </button>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {thanked && conv.feedbackRating !== null && (
        <div className="animate-toast absolute inset-x-4 top-28 z-20 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#20262e] to-[#173a63] px-4 py-4 shadow-xl">
          <IconCircle label="Dismiss" onClick={() => setThanked(false)}>
            <XIcon className="h-3.5 w-3.5" />
          </IconCircle>
          <span className="text-[17px] font-semibold">
            Thank you for your feedback!
          </span>
        </div>
      )}

      <div className="px-5 pb-1">
        <div className="flex items-center gap-2 rounded-full bg-[#212121] py-2 pr-2 pl-5">
          <PlusIcon className="h-6 w-6 text-white" />
          <button
            onClick={onNewSession}
            className="min-w-0 flex-1 truncate text-left text-[17px] text-subtle"
          >
            Talk to ChatGPT
          </button>
          <button aria-label="Dictate" onClick={onNewSession} className="px-1">
            <MicIcon className="h-6 w-6 text-white/90" />
          </button>
          <VoiceOrbButton onClick={onNewSession} />
        </div>
        <HomeIndicator />
      </div>

      {menu && (
        <ContextMenu
          message={messages.find((m) => m.id === menu.messageId)!}
          allowEdit={menu.allowEdit}
          onClose={() => setMenu(null)}
          onAct={act}
        />
      )}
    </div>
  );
}

function ContextMenu({
  message,
  allowEdit,
  onClose,
  onAct,
}: {
  message: Message;
  allowEdit: boolean;
  onClose: () => void;
  onAct: (kind: string, m: Message) => void;
}) {
  const time = new Date(message.createdAt);
  const label = `Today, ${time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  const rows: { kind: string; label: string; icon: React.ReactNode }[] = [
    { kind: "copy", label: "Copy", icon: <CopyIcon className="h-5 w-5" /> },
    ...(allowEdit
      ? [{ kind: "edit", label: "Edit", icon: <PencilIcon className="h-5 w-5" /> }]
      : []),
    {
      kind: "select",
      label: "Select text",
      icon: <SelectTextIcon className="h-5 w-5" />,
    },
    ...(allowEdit
      ? [
          {
            kind: "bad",
            label: "Bad transcription",
            icon: <ThumbDownIcon className="h-5 w-5" />,
          },
        ]
      : []),
    {
      kind: "share",
      label: "Share prompt",
      icon: <ShareIcon className="h-5 w-5" />,
    },
  ];
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 px-10"
      onClick={onClose}
    >
      <div
        className="animate-rise w-full rounded-3xl bg-[#242424] p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="px-4 pt-2 pb-3 text-[15px] text-muted">{label}</p>
        {rows.map((r) => (
          <button
            key={r.kind}
            onClick={() => onAct(r.kind, message)}
            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[17px] hover:bg-chip-pressed"
          >
            {r.label}
            <span className="text-white/85">{r.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function EditMessageScreen({
  initial,
  onCancel,
  onSend,
}: {
  initial: string;
  onCancel: () => void;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState(initial);
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-center gap-6 px-6 pt-2">
        <IconCircle label="Cancel" onClick={onCancel} className="h-12 w-12">
          <XIcon className="h-5 w-5" />
        </IconCircle>
        <h1 className="flex-1 pr-12 text-center text-[17px] font-semibold">
          Edit message
        </h1>
      </div>
      <div className="flex-1" />
      <div className="px-5 pb-4">
        <div className="rounded-3xl bg-[#1f1f1f] p-5">
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full resize-none text-[17px] leading-relaxed"
          />
          <div className="mt-3 flex items-center justify-between">
            <PlusIcon className="h-6 w-6 text-white" />
            <span className="flex items-center gap-5">
              <MicIcon className="h-6 w-6 text-white/90" />
              <button
                aria-label="Send edit"
                onClick={() => text.trim() && onSend(text.trim())}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
