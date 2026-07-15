"use client";

import { useState } from "react";
import {
  joinMatch,
  isPlayerJoined,
} from "@/services/playerService";
interface Player {
  id: string | number;
  full_name: string;
  primary_position: string;
}

interface JoinMatchModalProps {
  players: Player[];
  matchId: string |number;
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinMatchModal({
  players,
  matchId,
  isOpen,
  onClose,
}: JoinMatchModalProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<
    string | number | null
  >(null);

  if (!isOpen) return null;

async function handleJoin() {
  if (!selectedPlayerId) return;

  try {
    const alreadyJoined = await isPlayerJoined(
      matchId as string,
      selectedPlayerId as string
    );

    if (alreadyJoined) {
      alert("⚽ You're already registered for this match!");
      return;
    }

    await joinMatch(
      matchId as string,
      selectedPlayerId as string
    );

    alert("🎉 Successfully joined the match!");

    setSelectedPlayerId(null);
    onClose();

  } catch (error: any) {
  console.error(error);

  if (error.message === "MATCH_FULL") {
    alert("⚽ This match is full.");
    return;
  }

  if (error.message === "Registration is closed.") {
    alert("🚫 Registration has been closed.");
    return;
  }

  alert("Something went wrong.");

  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-3xl bg-[#111111] border border-zinc-800 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>
            <h2 className="text-2xl font-black uppercase">
              Join Match
            </h2>

            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
              Choose your player profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        {/* Players */}

        <div className="max-h-[350px] overflow-y-auto p-6 space-y-3">

          {players.length === 0 ? (

            <p className="text-center text-zinc-500">
              No registered players.
            </p>

          ) : (

            players.map((player) => {

              const isSelected =
                selectedPlayerId === player.id;

              return (

                <div
                  key={player.id}
                  onClick={() =>
                    setSelectedPlayerId(player.id)
                  }
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-[#ccff00] bg-[#ccff00]/10"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3
                        className={`font-black uppercase ${
                          isSelected
                            ? "text-[#ccff00]"
                            : "text-white"
                        }`}
                      >
                        {player.full_name}
                      </h3>

                      <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                        {player.primary_position}
                      </p>

                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-[#ccff00]"
                          : "border-zinc-600"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ccff00]" />
                      )}
                    </div>

                  </div>

                </div>

              );

            })

          )}

        </div>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-6">

          <button
            onClick={handleJoin}
            disabled={!selectedPlayerId}
            className="w-full rounded-xl bg-[#ccff00] py-4 font-black uppercase tracking-widest text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#b8eb00] transition-all"
          >
            Join Match
          </button>

        </div>

      </div>

    </div>
  );
}