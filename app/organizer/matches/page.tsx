import DeleteMatchButton from "@/components/organizer/DeleteMatchButton";
import EditMatchModal from "@/components/organizer/EditMatchModal";
import MatchActions from "@/components/organizer/MatchActions";
import RegisteredPlayers from "@/components/organizer/RegisteredPlayers";
import TeamGenerator from "@/components/organizer/TeamGenerator";
import {
  getLatestMatch,
  getJoinedPlayersCount,
  getJoinedPlayers,
} from "@/services/matchService";

export default async function MatchesPage() {
  const match = await getLatestMatch();
const joinedCount = match
  ? await getJoinedPlayersCount(match.id)
  : 0;
  const joinedPlayers = match
  ? await getJoinedPlayers(match.id)
  : [];

  return (
    <main className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-black uppercase">
            Manage <span className="text-[#ccff00]">Matches</span>
          </h1>

          <p className="text-zinc-500 uppercase tracking-widest mt-3">
            Control your upcoming fixtures.
          </p>
        </div>

        {!match ? (
          <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">
            No upcoming matches.
          </div>
        ) : (
          <>
            <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black text-[#ccff00] uppercase">
                    {match.title}
                  </h2>

                  <p className="text-zinc-400 mt-3">
                    📍 {match.venue}
                  </p>

                  <p className="text-zinc-400">
                    📅 {new Date(match.match_date).toLocaleDateString()}
                  </p>

                  <p className="text-zinc-400">
                    🕗 {match.kickoff_time}
                  </p>
                </div>

                <div className="text-right">
                  <span className="bg-[#ccff00]/10 text-[#ccff00] px-4 py-2 rounded-full font-bold uppercase">
                    {match.status}
                  </span>

                  <p className="mt-6 text-2xl font-black">
                    {joinedCount} / {match.max_players}
                  </p>
                </div>
              </div>
            </div>

           <div className="mt-8 flex flex-wrap gap-4">

  <div className="mt-8 flex flex-wrap gap-4">

  <MatchActions
    matchId={match.id}
    status={match.status}
  />

  <EditMatchModal
    match={match}
  />

  <DeleteMatchButton
    matchId={match.id}
  />

</div>

</div>
<RegisteredPlayers
  matchId={match.id}
  players={joinedPlayers.map((registration: any) => registration.player)}
/>
<TeamGenerator
  players={joinedPlayers.map((registration: any) => registration.player)}
/>
          </>
        )}
      </div>
    </main>
  );
}