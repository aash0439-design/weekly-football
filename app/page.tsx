import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-sans">
      
      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 min-h-[85vh] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-4 leading-none">
            Weekly<br />
            <span className="text-[#ccff00]">Football</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 text-zinc-100">
            More Than a Match. A Community.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed px-4">
            Join Kasaragod's growing football community. Every Sunday. Every Match. Every Player Matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link 
              href="/register" 
              className="bg-[#ccff00] text-black font-bold uppercase tracking-wide py-4 px-8 rounded-full hover:bg-[#b3e600] transition-all transform active:scale-95 flex items-center justify-center"
            >
              Join This Week's Match
            </Link>
            <Link 
              href="#about" 
              className="bg-transparent border border-zinc-700 text-white font-bold uppercase tracking-wide py-4 px-8 rounded-full hover:bg-zinc-900 transition-all transform active:scale-95 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Match Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full relative z-10">
        <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="absolute top-0 right-0 bg-[#ccff00]/10 text-[#ccff00] text-xs font-bold px-5 py-2 rounded-bl-2xl border-l border-b border-[#ccff00]/20 uppercase tracking-widest">
            2 Days Left
          </div>
          
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            Upcoming Match
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
            <div className="space-y-1 md:border-r border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Venue</p>
              <p className="text-2xl font-black uppercase tracking-tight">Uliyathadkka Turf</p>
            </div>
            
            <div className="space-y-1 md:border-r border-zinc-800 md:pl-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Kickoff</p>
              <p className="text-2xl font-black uppercase tracking-tight">Sunday</p>
              <p className="text-xl font-bold text-[#ccff00]">6:00 PM</p>
            </div>
            
            <div className="space-y-1 md:pl-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Players Joined</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black tracking-tighter">18</p>
                <p className="text-xl font-bold text-zinc-600">/ 24</p>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#ccff00] h-full rounded-full w-[75%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="about" className="py-24 px-4 max-w-6xl mx-auto w-full">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16">
          How It <span className="text-zinc-600">Works</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Register', desc: 'Set up your player profile and stats.' },
            { step: '02', title: 'Join Weekly Match', desc: 'Secure your spot before the lobby fills.' },
            { step: '03', title: 'Get Your Team', desc: 'Teams are balanced based on roles.' },
            { step: '04', title: 'Play Football', desc: 'Arrive at the turf and leave it all on the pitch.' },
          ].map((item, i) => (
            <div key={item.step} className="flex flex-col p-8 border border-zinc-800 rounded-3xl bg-black hover:bg-[#111] hover:border-zinc-600 transition-all duration-300 group">
              <span className="text-[#ccff00] text-5xl font-black mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                {item.step}
              </span>
              <h4 className="text-lg font-bold uppercase tracking-wide mb-3">{item.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Weekly Footy League Cup Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full text-center pb-32">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-zinc-800 p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          {/* Gold/Neon gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ccff00]/15 via-transparent to-transparent opacity-60"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="bg-black/50 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full mb-8 backdrop-blur-md">
              Coming Soon
            </span>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
              Weekly Footy<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">League Cup</span>
            </h3>
            <p className="text-zinc-400 max-w-md mx-auto text-base">
              The ultimate competitive bracket. Build your legacy, win the cup. Prepare your squad.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}