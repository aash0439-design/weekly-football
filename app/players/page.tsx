import { getPlayers } from "@/services/playerService";

interface Player {
  id: string | number;
  full_name: string;
  primary_position: string;
  preferred_foot: string;
  skill_level: number | null;
}

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-zinc-800 pb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-3">
            Squad <span className="text-[#ccff00]">Database</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base uppercase tracking-widest">
            Active roster of registered players.
          </p>
        </div>

        {!players || players.length === 0 ? (
          <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl backdrop-blur-sm max-w-2xl mx-auto mt-12">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-300">
              Empty Roster
            </h2>
            <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest">
              No registered players yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player: Player) => (
              <div 
                key={player.id} 
                className="bg-[#111111] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors shadow-xl"
              >
                {/* Decorative neon accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-[#ccff00] transition-colors"></div>

                <div className="mb-6 pl-2">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors truncate">
                    {player.full_name}
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                    {player.primary_position}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50 pl-2">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Pref. Foot
                    </p>
                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-200">
                      {player.preferred_foot}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Skill Level
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-[#ccff00]">
                        {player.skill_level ? player.skill_level : '-'}
                      </span>
                      <span className="text-xs font-bold text-zinc-600">/ 5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}