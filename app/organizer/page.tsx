import LogoutButton from "@/components/organizer/LogoutButton";
import {
  getLatestMatch,
  getJoinedPlayersCount,
} from "@/services/matchService";
import Link from "next/link";

export default async function OrganizerDashboardPage() {
    const match = await getLatestMatch();

const joinedCount = match
  ? await getJoinedPlayersCount(match.id)
  : 0;
  return (
    <main className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10 flex items-start justify-between">
  <div>
    <h1 className="text-5xl font-black uppercase">
      Organizer <span className="text-[#ccff00]">Dashboard</span>
    </h1>

    <p className="text-zinc-500 uppercase tracking-widest mt-3">
      Manage your football community.
    </p>
  </div>

  <LogoutButton />
</div>
{match && (
  <div className="mb-10 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-black uppercase">
        Upcoming Match
      </h2>

      <span className="rounded-full bg-[#ccff00]/10 px-4 py-1 text-sm font-bold uppercase text-[#ccff00]">
        {match.status}
      </span>
    </div>

    <h3 className="text-4xl font-black uppercase text-[#ccff00]">
      {match.title}
    </h3>

    <div className="mt-8 grid gap-6 md:grid-cols-3">

      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Venue
        </p>

        <p className="mt-1 font-bold">
          {match.venue}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Date
        </p>

        <p className="mt-1 font-bold">
          {new Date(match.match_date).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Registered
        </p>

        <p className="mt-1 font-bold text-[#ccff00]">
          {joinedCount} / {match.max_players}
        </p>
      </div>

    </div>

  </div>
)}
        <div className="grid gap-6 md:grid-cols-2">

          <Link
            href="/organizer/create"
            className="rounded-3xl border border-zinc-800 bg-[#111111] p-8 hover:border-[#ccff00] transition"
          >
            <h2 className="text-2xl font-black">
              Create Match
            </h2>

            <p className="mt-2 text-zinc-500">
              Schedule a new football match.
            </p>
          </Link>

          <Link
            href="/organizer/matches"
            className="rounded-3xl border border-zinc-800 bg-[#111111] p-8 hover:border-[#ccff00] transition"
          >
            <h2 className="text-2xl font-black">
              Manage Matches
            </h2>

            <p className="mt-2 text-zinc-500">
              View and manage existing matches.
            </p>
          </Link>

          <Link
            href="/organizer/players"
            className="rounded-3xl border border-zinc-800 bg-[#111111] p-8 hover:border-[#ccff00] transition"
          >
            <h2 className="text-2xl font-black">
              Players
            </h2>

            <p className="mt-2 text-zinc-500">
              Browse your registered players.
            </p>
          </Link>

          <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8 opacity-60">
            <h2 className="text-2xl font-black">
              Generate Teams
            </h2>

            <p className="mt-2 text-zinc-500">
              Coming Soon 🚀
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
