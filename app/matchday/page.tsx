import { Matchregistration } from "@/types/registration";
import MatchdayClient from "@/components/match/MatchdayClient";
import { getPlayers } from "@/services/playerService";
import {
  getLatestMatch,
  getJoinedPlayers,
} from "@/services/matchService";

export default async function MatchdayPage() {
  const match = await getLatestMatch();
  const joinedPlayers = match
  ? await getJoinedPlayers(match.id)
  : [];
  const players = await getPlayers();

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-3">
            Matchday <span className="text-[#ccff00]">Arena</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base uppercase tracking-widest">
            Lock in your spot for the upcoming fixture.
          </p>
        </div>

        {!match ? (
          <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-300">
              No Fixture Available
            </h2>
            <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest">
              There is no upcoming match scheduled right now.
            </p>
          </div>
        ) : (
          <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            
            {/* Status Badge */}
            <div className="absolute top-0 right-0 bg-[#ccff00]/10 text-[#ccff00] text-xs font-bold px-5 py-2 rounded-bl-2xl border-l border-b border-[#ccff00]/20 uppercase tracking-widest">
              {match.status}
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              Match Details
            </h3>

            <div className="space-y-8">
              
              {/* Title & Venue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Match Title</p>
                  <p className="text-3xl font-black uppercase tracking-tight text-[#ccff00] leading-none mt-1">
                    {match.title}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Venue</p>
                  <p className="text-2xl font-black uppercase tracking-tight leading-none mt-1">
                    {match.venue}
                  </p>
                </div>
              </div>

              {/* Date, Time & Players */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-800/50">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Date</p>
                  <p className="text-xl font-black uppercase tracking-tight leading-none mt-1">
                    {new Date(match.match_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Kickoff Time</p>
                  <p className="text-xl font-black uppercase tracking-tight text-[#ccff00] leading-none mt-1">
                    {match.kickoff_time}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Maximum Players</p>
                  <p className="text-xl font-black uppercase tracking-tight leading-none mt-1">
                    {match.max_players ? `${match.max_players} Players` : 'TBD'}
                  </p>
                </div>
              </div>

            </div>
            {/* Registered Players */}

<div className="pt-8 mt-8 border-t border-zinc-800">
  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
    Registered Players
  </h3>

  {joinedPlayers.length === 0 ? (
    <p className="text-zinc-500 text-sm">
      No players have joined yet.
    </p>
  ) : (
    <div className="space-y-3">
      {joinedPlayers.map((registration) => {
        const player = Array.isArray(registration.player)
          ? registration.player[0]
          : registration.player;

        if (!player) return null;

        return (
          <div
            key={player.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black px-4 py-3"
          >
            <div>
              <p className="font-bold text-white">
                {player.full_name}
              </p>

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                {player.primary_position}
              </p>
            </div>

            <div className="text-[#ccff00] font-black">
              ✓
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

            {/* Action Button */}
            <div className="pt-10 mt-8 border-t border-zinc-800">
             <MatchdayClient
  matchId={match.id}
  players={players}
  status={match.status}
/>
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}