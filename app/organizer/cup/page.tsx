import Link from "next/link";
import {
  getLatestCup,
} from "@/services/cupService";

import {
  getCupPlayerCount,
} from "@/services/cupRegistrationService";

export default async function CupDashboardPage() {
  const cup = await getLatestCup();

  const registeredCount = cup
  ? await getCupPlayerCount(cup.id)
  : 0;
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-5xl font-black uppercase">
            Weekly Footy{" "}
            <span className="text-[#ccff00]">
              League
            </span>
          </h1>

          <p className="mt-3 uppercase tracking-widest text-zinc-500">
            Community Football League
          </p>
        </div>

        {!cup ? (
          <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-10">

            <h2 className="text-3xl font-black">
              No League Created
            </h2>

            <p className="mt-4 text-zinc-400">
              Create your first Weekly Footy League.
            </p>

            <Link
              href="/organizer/cup/create"
              className="mt-8 inline-block rounded-xl bg-[#ccff00] px-8 py-4 font-black uppercase text-black hover:bg-[#b8eb00]"
            >
              Create League
            </Link>

          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-10">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-4xl font-black uppercase text-[#ccff00]">
                  {cup.name}
                </h2>

                <p className="mt-3 uppercase tracking-widest text-zinc-500">
                  {cup.status}
                </p>

              </div>

              <span className="rounded-full bg-[#ccff00]/10 px-5 py-2 font-bold uppercase text-[#ccff00]">
                {cup.status}
              </span>

            </div>

            {/* Statistics */}

            <div className="mt-10 grid gap-6 md:grid-cols-4">

              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Capacity
                </p>

                <p className="mt-2 text-3xl font-black">
                  {cup.max_players}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Teams
                </p>

                <p className="mt-2 text-3xl font-black">
                  {cup.number_of_teams}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Players / Team
                </p>

                <p className="mt-2 text-3xl font-black">
                  {cup.players_per_team}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Registered
                </p>

                <p className="mt-2 text-3xl font-black text-[#ccff00]">
                  {registeredCount} / {cup.max_players}
                </p>
              </div>

            </div>

            {/* Actions */}

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <Link
                href="/organizer/cup/registrations"
                className="rounded-2xl border border-zinc-800 p-6 transition hover:border-[#ccff00]"
              >
                <h3 className="text-xl font-black">
                  Registrations
                </h3>

                <p className="mt-2 text-zinc-500">
                  View registered players
                </p>
              </Link>

              <div className="rounded-2xl border border-zinc-800 p-6 opacity-60">
                <h3 className="text-xl font-black">
                  Generate Teams
                </h3>

                <p className="mt-2 text-zinc-500">
                  Coming Soon
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-6 opacity-60">
                <h3 className="text-xl font-black">
                  Fixtures
                </h3>

                <p className="mt-2 text-zinc-500">
                  Coming Soon
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 p-6 opacity-60">
                <h3 className="text-xl font-black">
                  Standings
                </h3>

                <p className="mt-2 text-zinc-500">
                  Coming Soon
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}