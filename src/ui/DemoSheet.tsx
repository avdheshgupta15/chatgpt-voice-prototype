import { computeMetrics } from "../model/metrics";
import { PrimaryButton } from "./components";

export function DemoSheet({
  onClose,
  onWakeStart,
  onMissedWake,
  onReset,
}: {
  onClose: () => void;
  onWakeStart: () => void;
  onMissedWake: () => void;
  onReset: () => void;
}) {
  const metrics = computeMetrics();
  return (
    <div
      className="absolute inset-0 z-40 flex items-end bg-black/60"
      onClick={onClose}
    >
      <div
        className="animate-sheet max-h-[82%] w-full overflow-y-auto rounded-t-3xl bg-[#1c1c1e] p-6 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/25" />
        <h2 className="text-[20px] font-bold tracking-tight">Demo &amp; Metrics</h2>
        <p className="mt-1 text-[14px] text-muted">
          Prototype controls for things a real device would sense (wake word)
          plus live PRD metrics from the local store.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <PrimaryButton onClick={onWakeStart}>
            Simulate “Hey ChatGPT” (wake start)
          </PrimaryButton>
          <button
            onClick={onMissedWake}
            className="w-full rounded-full bg-[#3a3a3a] py-3.5 text-[16px] font-semibold transition active:scale-[0.985]"
          >
            Simulate missed wake word
          </button>
          <button
            onClick={onReset}
            className="w-full rounded-full py-3.5 text-[16px] font-semibold text-[#ff8a80] transition active:scale-[0.985]"
          >
            Reset demo data
          </button>
        </div>

        <h3 className="mt-7 mb-2 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">
          PRD metrics
        </h3>
        <div className="overflow-hidden rounded-2xl bg-[#242424]">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={
                "flex items-center justify-between px-4 py-3 text-[15px] " +
                (i > 0 ? "border-t border-white/5" : "")
              }
            >
              <span className="text-white/85">{m.label}</span>
              <span className="font-semibold">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
