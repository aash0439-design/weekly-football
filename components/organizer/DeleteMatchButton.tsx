"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMatch } from "@/services/matchService";

interface DeleteMatchButtonProps {
  matchId: string;
}

export default function DeleteMatchButton({
  matchId,
}: DeleteMatchButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    const confirmed = window.confirm(
      "⚠️ Delete this match permanently?\n\nThis cannot be undone."
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteMatch(matchId);

        alert("✅ Match deleted successfully!");

        router.push("/organizer");
        router.refresh();
      } catch (error) {
        console.error(error);

        alert("❌ Failed to delete match.");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-xl bg-red-600 px-6 py-3 font-black uppercase text-white transition hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Match"}
    </button>
  );
}