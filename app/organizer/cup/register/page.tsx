import RegistrationList from "@/components/league/RegistrationList";
import { getLatestCup } from "@/services/cupService";
import { getPlayers } from "@/services/playerService";

export default async function LeagueRegisterPage() {
  const league = await getLatestCup();
  const players = await getPlayers();

  if (!league) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        No active league.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-12 px-4">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-black uppercase">
          Register For{" "}
          <span className="text-[#ccff00]">
            {league.name}
          </span>
        </h1>

        <p className="mt-3 text-zinc-500">
          Choose your player profile.
        </p>

        <div className="mt-10 grid gap-4">

          <RegistrationList
  players={players}
  leagueId={league.id}
/>

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
                className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black"
              >
                Register
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}