import { useEffect, useState, type ReactNode } from "react";
import { WaveIcon } from "./icons";

export function StatusBar({ micLive }: { micLive?: boolean }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const hh = now.getHours();
  const mm = now.getMinutes().toString().padStart(2, "0");
  return (
    <div className="flex items-center justify-between px-7 pt-4 pb-1 text-white">
      <span className="w-16 text-[17px] font-semibold tracking-tight">
        {hh}:{mm}
      </span>
      {micLive ? (
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
      ) : (
        <span />
      )}
      <span className="flex w-16 items-center justify-end gap-1.5">
        <svg viewBox="0 0 18 12" className="h-3 w-4 fill-white">
          <rect x="0" y="7" width="3" height="5" rx="0.8" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" opacity="0.45" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-3 w-4 fill-white">
          <path d="M8 9.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM8 6c1.9 0 3.6.7 4.9 2l-1.4 1.4A4.9 4.9 0 0 0 8 8a4.9 4.9 0 0 0-3.5 1.4L3.1 8A6.8 6.8 0 0 1 8 6zm0-4c3 0 5.7 1.2 7.7 3.1l-1.4 1.4A8.8 8.8 0 0 0 8 4a8.8 8.8 0 0 0-6.3 2.5L.3 5.1A10.8 10.8 0 0 1 8 2z" />
        </svg>
        <svg viewBox="0 0 25 12" className="h-3 w-6">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3"
            fill="none"
            stroke="white"
            strokeOpacity="0.5"
          />
          <rect x="2" y="2" width="18" height="8" rx="1.8" fill="white" />
          <path d="M23 4v4a2.2 2.2 0 0 0 0-4z" fill="white" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function Orb({
  size = 230,
  state = "idle",
  sideGlow,
}: {
  size?: number;
  state?: "idle" | "listening" | "speaking";
  sideGlow?: boolean;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {sideGlow && (
        <div
          className="absolute top-1/2 -right-[38%] h-[86%] w-[70%] -translate-y-1/2 rounded-r-full bg-orb-deep/70 blur-2xl"
          aria-hidden
        />
      )}
      <div
        className={
          "relative h-full w-full rounded-full " +
          (state === "listening" ? "animate-orb-listen" : "animate-orb-breathe")
        }
        style={{
          background:
            "radial-gradient(circle at 38% 30%, #eef3ff 0%, var(--color-orb-light) 22%, var(--color-orb-mid) 52%, var(--color-orb-base) 78%, var(--color-orb-deep) 100%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.7), transparent 55%)",
          }}
        />
      </div>
      <div
        className="absolute inset-0 -z-10 rounded-full bg-blue-500/15 blur-2xl"
        aria-hidden
      />
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  wide = true,
}: {
  children: ReactNode;
  onClick?: () => void;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full bg-white py-4 text-[17px] font-semibold tracking-tight text-black shadow-lg transition active:scale-[0.985] hover:bg-neutral-100 " +
        (wide ? "w-full" : "px-10")
      }
    >
      {children}
    </button>
  );
}

export function IconCircle({
  children,
  onClick,
  className = "",
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-white/90 transition hover:bg-chip-pressed active:scale-95 " +
        className
      }
    >
      {children}
    </button>
  );
}

export function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={
            "h-1.5 w-1.5 rounded-full " +
            (i === active ? "bg-white" : "bg-dot-inactive")
          }
        />
      ))}
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="flex justify-center pb-2 pt-1">
      <div className="h-1 w-36 rounded-full bg-white" />
    </div>
  );
}

export function Waveform({ tone }: { tone: "white" | "blue" }) {
  const heights = [6, 14, 20, 26, 18, 24, 12, 16, 8, 5];
  return (
    <div className="flex items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className={
            "w-[3px] rounded-full " +
            (tone === "white" ? "bg-white/85" : "bg-orb-mid")
          }
          style={{ height: h, opacity: 0.35 + (h / 26) * 0.65 }}
        />
      ))}
    </div>
  );
}

export function LiveWave({ active }: { active: boolean }) {
  return (
    <span className="flex items-end gap-[2.5px]">
      {[10, 16, 20, 16, 10].map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-white transition-all duration-200"
          style={{
            height: active ? h : 6,
            opacity: active ? 1 : 0.85,
          }}
        />
      ))}
    </span>
  );
}

export function VoiceOrbButton({
  onClick,
  active,
}: {
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      aria-label="Start voice conversation"
      onClick={onClick}
      className={
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_0_18px_rgba(31,124,245,0.55)] transition active:scale-95 " +
        (active ? "ring-2 ring-white/40" : "")
      }
    >
      <WaveIcon className="h-5 w-5" />
    </button>
  );
}
