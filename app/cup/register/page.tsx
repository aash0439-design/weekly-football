import { getLatestCup } from "@/services/cupService";
import { getPlayers } from "@/services/playerService";
import CupRegistrationList from "@/components/cup/CupRegistrationList";

export default async function CupRegisterPage() {
  const cup = await getLatestCup();
  const players = await getPlayers();

  if (!cup) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black">
          No active tournament.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black py-12 px-4 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-black uppercase">
          Weekly Footy{" "}
          <span className="text-[#ccff00]">
            Cup
          </span>
        </h1>

        <p className="mt-3 text-zinc-500 uppercase tracking-widest">
          Tournament Registration
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-black">
                {cup.name}
              </h2>

              <p className="mt-2 text-zinc-500">
                Status: {cup.status}
              </p>
            </div>

            <span className="rounded-full bg-[#ccff00]/10 px-5 py-2 font-bold uppercase text-[#ccff00]">
              {cup.status}
            </span>

          </div>

        </div>

        <CupRegistrationList
  players={players}
  cupId={cup.id}
/>

      </div>
    </main>
  );
}