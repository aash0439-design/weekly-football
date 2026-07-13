"use client";

import { useTransition } from "react";
import { closeRegistration } from "@/services/matchService";

interface MatchActionsProps {
  matchId: string;
}

export default function MatchActions({
  matchId,
}: MatchActionsProps) {
  const [isPending, startTransition] = useTransition();

  async function handleCloseRegistration() {
    startTransition(async () => {
      try {
        console.log("Match ID received:", matchId);

const result = await closeRegistration(matchId);

console.log("Result:", result);

alert("✅ Registration closed successfully!");

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert("❌ Failed to close registration.");
      }
    });
  }

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={handleCloseRegistration}
        disabled={isPending}
        className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black transition hover:bg-[#b3e600] disabled:opacity-50"
      >
        {isPending ? "Closing..." : "Close Registration"}
      </button>
    </div>
  );
}