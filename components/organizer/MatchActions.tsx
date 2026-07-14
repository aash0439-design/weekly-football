"use client";

import { useTransition } from "react";
import {
  closeRegistration,
  reopenRegistration,
} from "@/services/matchService";

interface MatchActionsProps {
  matchId: string;
  status: string;
}

export default function MatchActions({
  matchId,
  status,
}: MatchActionsProps) {
  const [isPending, startTransition] = useTransition();

  async function handleCloseRegistration() {
  startTransition(async () => {
    try {
      await closeRegistration(matchId);

      alert("✅ Registration closed successfully!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("❌ Failed to close registration.");
    }
  });
}

async function handleReopenRegistration() {
  startTransition(async () => {
    try {
      await reopenRegistration(matchId);

      alert("✅ Registration reopened!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("❌ Failed to reopen registration.");
    }
  });
}

  return (
  <div className="mt-8 flex flex-wrap gap-4">
    {status === "Open" ? (
      <button
        onClick={handleCloseRegistration}
        disabled={isPending}
        className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black transition hover:bg-[#b3e600] disabled:opacity-50"
      >
        {isPending ? "Closing..." : "Close Registration"}
      </button>
    ) : (
      <button
        onClick={handleReopenRegistration}
        disabled={isPending}
        className="rounded-xl bg-blue-500 px-6 py-3 font-black uppercase text-white transition hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "Reopening..." : "Reopen Registration"}
      </button>
    )}
  </div>
);
}