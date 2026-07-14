"use client";

import { useTransition } from "react";
import { removePlayerFromMatch } from "@/services/matchService";

interface Player {
  id: string;
  full_name: string;
  primary_position: string;
}

interface RegisteredPlayersProps {
  matchId: string;
  players: Player[];
}

export default function RegisteredPlayers({
  matchId,
  players,
}: RegisteredPlayersProps) {
  const [isPending, startTransition] = useTransition();

  async function handleRemove(playerId: string) {
    const confirmed = window.confirm(
      "Remove this player from the match?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await removePlayerFromMatch(matchId, playerId);

        alert("✅ Player removed successfully!");

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert("❌ Failed to remove player.");
      }
    });
  }

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">
      <h2 className="text-2xl font-black uppercase mb-6">
        Registered Players
      </h2>

      {players.length === 0 ? (
        <p className="text-zinc-500">
          No registered players.
        </p>
      ) : (
        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 px-5 py-4"
            >
              <div>
                <p className="font-bold">
                  {player.full_name}
                </p>

                <p className="text-sm uppercase text-zinc-500">
                  {player.primary_position}
                </p>
              </div>

              <button
                onClick={() => handleRemove(player.id)}
                disabled={isPending}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold uppercase text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {isPending ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}