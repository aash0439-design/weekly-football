"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinCup } from "@/services/cupRegistrationService";

interface Player {
  id: string;
  full_name: string;
  primary_position: string;
  skill_level: number | null;
}

interface Props {
  players: Player[];
  cupId: string;
}

export default function CupRegistrationList({
  players,
  cupId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<string | null>(null);

  async function handleRegister(playerId: string) {
    try {
      setLoading(playerId);

      await joinCup(cupId, playerId);

      alert("✅ Player registered!");

      router.refresh();

    } catch (error: any) {
      console.error(error);

      if (error.message === "ALREADY_REGISTERED") {
        alert("Player already registered.");
      } else if (error.message === "CUP_FULL") {
        alert("Tournament is full.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-10 space-y-4">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#111111] p-6"
        >
          <div>
            <h3 className="text-xl font-black">
              {player.full_name}
            </h3>

            <p className="uppercase text-zinc-500">
              {player.primary_position}
            </p>

            <p className="text-[#ccff00]">
              ⭐ {player.skill_level ?? 3}
            </p>
          </div>

          <button
            onClick={() => handleRegister(player.id)}
            disabled={loading === player.id}
            className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black disabled:opacity-50"
          >
            {loading === player.id
              ? "Registering..."
              : "Register"}
          </button>
        </div>
      ))}
    </div>
  );
}