"use client";

import { useState } from "react";

interface Player {
  id: string;
  full_name: string;
  primary_position: string;
}

interface TeamGeneratorProps {
  players: Player[];
}

export default function TeamGenerator({
  players,
}: TeamGeneratorProps) {
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);

  function generateTeams() {
  const goalkeepers = players.filter(
    (p) => p.primary_position === "GOALKEEPER"
  );

  const defenders = players.filter(
    (p) => p.primary_position === "DEFENDER"
  );

  const midfielders = players.filter(
    (p) => p.primary_position === "MIDFIELDER"
  );

  const forwards = players.filter(
    (p) => p.primary_position === "FORWARD"
  );

  function shuffle<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const teamA: Player[] = [];
  const teamB: Player[] = [];

  function splitGroup(group: Player[]) {
    shuffle(group).forEach((player, index) => {
      if (index % 2 === 0) {
        teamA.push(player);
      } else {
        teamB.push(player);
      }
    });
  }

  splitGroup(goalkeepers);
  splitGroup(defenders);
  splitGroup(midfielders);
  splitGroup(forwards);

  setTeamA(teamA);
  setTeamB(teamB);
}

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase">
          Team Generator
        </h2>

        <button
          onClick={generateTeams}
          className="rounded-xl bg-[#ccff00] px-5 py-3 font-black uppercase text-black"
        >
          Generate Teams
        </button>
      </div>

      {teamA.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-black text-[#ccff00]">
              🟢 Team A
            </h3>

            {teamA.map((player) => (
              <p key={player.id}>
                {player.full_name}
              </p>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-xl font-black text-[#ccff00]">
              🔵 Team B
            </h3>

            {teamB.map((player) => (
              <p key={player.id}>
                {player.full_name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}