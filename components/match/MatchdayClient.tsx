"use client";

import { useState } from "react";
import JoinMatchModal from "./JoinMatchModal";

interface Player {
  id: string | number;
  full_name: string;
  primary_position: string;
}

interface MatchdayClientProps {
  matchId: string;
  players: Player[];
  status: string;
}

export default function MatchdayClient({
  matchId,
  players,
  status,
}: MatchdayClientProps){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     {status === "Closed" ? (
  <button
    disabled
    className="w-full bg-zinc-800 text-zinc-500 font-black uppercase tracking-widest py-5 rounded-xl cursor-not-allowed"
  >
    Registration Closed
  </button>
) : (
  <button
    onClick={() => setIsOpen(true)}
    className="w-full bg-[#ccff00] text-black font-black uppercase tracking-widest py-5 rounded-xl hover:bg-[#b3e600] transition-all"
  >
    Join Match
  </button>
)}

      <JoinMatchModal
        matchId={matchId}
        players={players}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}