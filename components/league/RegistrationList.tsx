"use client";

import { useState } from "react";
import { joinLeague } from "@/services/cupRegistrationService";

interface Player {
  id: string;
  full_name: string;
  primary_position: string;
  skill_level: number | null;
}

interface Props {
  players: Player[];
  leagueId: string;
}

export default function RegistrationList({
  players,
  leagueId,
}: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleRegister(playerId: string) {
    try {
      setLoadingId(playerId);

      await joinLeague(leagueId, playerId);

      alert("✅ Registered successfully!");

      window.location.reload();
    } catch (err: any) {
      if (err.message === "ALREADY_REGISTERED") {
        alert("Player already registered.");
      } else if (err.message === "LEAGUE_FULL") {
        alert("League is already full.");
      } else {
        alert(err.message);
      }
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="mt-10 grid gap-4">

      {players.map((player) => (

        <div
          key={player.id}
          className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 flex items-center justify-between"
        >

          <div>

            <h2 className="text-xl font-black">
              {player.full_name}
            </h2>

            <p className="text-zinc-500 uppercase">
              {player.primary_position}
            </p>

            <p className="text-[#ccff00]">
              ⭐ {player.skill_level ?? 3}
            </p>

          </div>

          <button
            onClick={() => handleRegister(player.id)}
            disabled={loadingId === player.id}
            className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black disabled:opacity-50"
          >
            {loadingId === player.id
              ? "Registering..."
              : "Register"}
          </button>

        </div>

      ))}

    </div>
  );
}