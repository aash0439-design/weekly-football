"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCup } from "@/services/cupService";

export default function CreateCupPage() {
  const router = useRouter();

  const [name, setName] = useState("Weekly Footy Cup 2026");
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [playersPerTeam, setPlayersPerTeam] = useState(8);

  const maxPlayers = numberOfTeams * playersPerTeam;

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      await createCup({
        name,
        max_players: maxPlayers,
        number_of_teams: numberOfTeams,
        players_per_team: playersPerTeam,
      });

      alert("🏆 Tournament created!");

      router.push("/organizer/cup");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black uppercase">
          Create <span className="text-[#ccff00]">Tournament</span>
        </h1>

        <p className="mt-3 uppercase tracking-widest text-zinc-500">
          Weekly Footy Cup
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8"
        >

          {/* Tournament Name */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-zinc-400">
              Tournament Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-black p-4 outline-none"
            />
          </div>

          {/* Number of Teams */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-zinc-400">
              Number of Teams
            </label>

            <input
              type="number"
              min={2}
              value={numberOfTeams}
              onChange={(e) =>
                setNumberOfTeams(Number(e.target.value))
              }
              className="w-full rounded-xl bg-black p-4 outline-none"
            />
          </div>

          {/* Players Per Team */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-zinc-400">
              Players Per Team
            </label>

            <input
              type="number"
              min={5}
              value={playersPerTeam}
              onChange={(e) =>
                setPlayersPerTeam(Number(e.target.value))
              }
              className="w-full rounded-xl bg-black p-4 outline-none"
            />
          </div>

          {/* Auto Calculation */}
          <div className="rounded-2xl border border-[#ccff00]/30 bg-black p-6">

            <p className="text-sm uppercase tracking-widest text-zinc-500">
              Tournament Capacity
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#ccff00]">
              {maxPlayers} Players
            </h2>

            <p className="mt-2 text-zinc-500">
              {numberOfTeams} Teams × {playersPerTeam} Players
            </p>

          </div>

          <button
            className="w-full rounded-xl bg-[#ccff00] p-4 font-black uppercase text-black hover:bg-[#b8eb00] transition"
          >
            Launch Tournament
          </button>

        </form>

      </div>

    </main>
  );
}