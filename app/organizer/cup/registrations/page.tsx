import { getLatestCup } from "@/services/cupService";
import { getCupPlayers } from "@/services/cupRegistrationService";
import RemoveCupPlayerButton from "@/components/cup/RemoveCupPlayerButton";

export default async function CupRegistrationsPage() {
  const cup = await getLatestCup();

  if (!cup) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-3xl font-black">
          No active tournament.
        </h1>
      </main>
    );
  }

  const players = await getCupPlayers(cup.id);

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <h1 className="text-5xl font-black uppercase">
            Cup <span className="text-[#ccff00]">Registrations</span>
          </h1>

          <p className="mt-3 uppercase tracking-widest text-zinc-500">
            {players.length} / {cup.max_players} Registered
          </p>
        </div>

        {players.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-8">
            <p className="text-zinc-400">
              No registrations yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {players.map((registration: any) => (
              <div
                key={registration.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#111111] p-6"
              >
                <div>
                  <h2 className="text-2xl font-black">
                    {registration.player.full_name}
                  </h2>

                  <p className="mt-1 uppercase text-zinc-500">
                    {registration.player.primary_position}
                  </p>

                  <p className="mt-2 font-bold text-[#ccff00]">
                    ⭐ {registration.player.skill_level ?? 3}
                  </p>
                </div>

                <RemoveCupPlayerButton
                  cupId={cup.id}
                  playerId={registration.player.id}
                  playerName={registration.player.full_name}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}