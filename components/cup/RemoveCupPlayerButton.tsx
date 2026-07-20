"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeCupPlayer } from "@/services/cupRegistrationService";

interface Props {
  cupId: string;
  playerId: string;
  playerName: string;
}

export default function RemoveCupPlayerButton({
  cupId,
  playerId,
  playerName,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    const confirmed = confirm(
      `Remove ${playerName} from this tournament?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await removeCupPlayer(cupId, playerId);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to remove player.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="rounded-xl bg-red-600 px-5 py-2 font-bold uppercase text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Removing..." : "Remove"}
    </button>
  );
}