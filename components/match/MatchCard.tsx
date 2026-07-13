import { getLatestMatch } from "@/services/matchService";

export default async function MatchCard() {
  const match = await getLatestMatch();

  if (!match) {
    return (
      <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-sm shadow-2xl min-h-[200px] flex flex-col justify-center items-center">
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
          No upcoming match scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-sm shadow-2xl min-h-[200px] flex flex-col justify-center">
      
      {/* Match Status Badge */}
      <div className="absolute top-0 right-0 bg-[#ccff00]/10 text-[#ccff00] text-xs font-bold px-5 py-2 rounded-bl-2xl border-l border-b border-[#ccff00]/20 uppercase tracking-widest">
        {match.status}
      </div>

      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
        Upcoming Match
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 items-start">
        
        {/* Match Title */}
        <div className="space-y-1 md:border-r border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Match Title</p>
          <p className="text-2xl font-black uppercase tracking-tight text-[#ccff00] leading-none mt-1">
            {match.title}
          </p>
        </div>

        {/* Venue */}
        <div className="space-y-1 md:border-r border-zinc-800 md:pl-2">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Venue</p>
          <p className="text-xl font-black uppercase tracking-tight text-white leading-none mt-1">
            {match.venue}
          </p>
        </div>
        
        {/* Date & Time */}
        <div className="space-y-1 md:border-r border-zinc-800 md:pl-2">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Kickoff</p>
          <p className="text-xl font-black uppercase tracking-tight text-white leading-none mt-1">
            {new Date(match.match_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
          <p className="text-lg font-bold text-[#ccff00] mt-1">{match.kickoff_time}</p>
        </div>
        
        {/* Capacity */}
        <div className="space-y-1 md:pl-2">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Capacity</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-4xl font-black tracking-tighter text-white leading-none">
              {match.max_players ?? 'TBD'}
            </p>
            {match.max_players && <p className="text-lg font-bold text-zinc-600">Max</p>}
          </div>
        </div>

      </div>
    </div>
  );
}