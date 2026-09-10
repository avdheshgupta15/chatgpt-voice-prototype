import { useSyncExternalStore } from "react";
import { db } from "../model/db";
import type { DB } from "../model/types";

export function useDb(): DB {
  return useSyncExternalStore(db.subscribe, db.snapshot, db.snapshot);
}

/** **bold** segments and blank-line paragraphs, per transcript designs. */
export function RichText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={i > 0 ? "mt-4" : undefined}>
          {p.split("\n").map((line, j) => (
            <span key={j} className="block">
              {line.split("**").map((seg, k) =>
                k % 2 === 1 ? (
                  <strong key={k} className="font-bold">
                    {seg}
                  </strong>
                ) : (
                  <span key={k}>{seg}</span>
                ),
              )}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}
