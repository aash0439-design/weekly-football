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
    <main className="min-h-screen bg-black px-4 py-12 font-sans text-white selection:bg-[#ccff00] selection:text-black sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#ccff00]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-10 border-b border-zinc-800 pb-8 text-center md:text-left">
          <h1 className="mb-3 text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Squad <span className="text-[#ccff00]">Database</span>
          </h1>
          <p className="text-sm uppercase tracking-widest text-zinc-400 md:text-base">
            Active roster of registered players.
          </p>
        </header>

        {!players || players.length === 0 ? (
          <section className="mx-auto mt-12 max-w-2xl rounded-3xl border border-zinc-800 bg-[#111111] p-10 text-center shadow-2xl backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <svg className="h-6 w-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-300">Empty Roster</h2>
            <p className="mt-2 text-sm uppercase tracking-widest text-zinc-500">No registered players yet.</p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Registered players">
            {players.map((player: Player) => (
              <article key={player.id} className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] p-6 shadow-xl transition-colors hover:border-zinc-600">
                <div className="absolute left-0 top-0 h-full w-1 bg-zinc-800 transition-colors group-hover:bg-[#ccff00]" />

                <div className="mb-6 pl-2">
                  <h2 className="truncate text-2xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#ccff00]">
                    {player.full_name}
                  </h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    {player.primary_position}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-4 pl-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Pref. Foot</p>
                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-200">{player.preferred_foot}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Skill Level</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-[#ccff00]">{player.skill_level ?? "-"}</span>
                      <span className="text-xs font-bold text-zinc-600">/ 5</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
