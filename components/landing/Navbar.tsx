import Link from "next/link";

const links = [
  { href: "#current-match", label: "This week" },
  { href: "#community", label: "Community" },
  { href: "#how-it-works", label: "How it works" },
];

const organizerButtonClass = "inline-flex h-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-3.5 text-sm font-semibold text-zinc-200 transition hover:border-[#ccff00]/45 hover:bg-[#ccff00]/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#080909]";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080909]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Weekly Footy home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ccff00] text-sm font-black text-black">M</span>
          <span className="hidden text-sm font-black tracking-[-0.03em] text-white sm:block">WEEKLY FOOTY</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-md bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-500 lg:block">Kasaragod</span>
          <Link href="/login" className={`hidden md:inline-flex ${organizerButtonClass}`}>
            Organizer Portal
          </Link>
          <Link href="/cup/register" className="inline-flex h-9 items-center justify-center rounded-lg bg-[#ccff00] px-2 text-xs font-bold text-black transition hover:bg-[#d9ff36] focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#080909] sm:px-3.5 sm:text-sm">
            Join Current Match
          </Link>

          <details className="relative md:hidden">
            <summary className="flex h-9 cursor-pointer list-none items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-3 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-xl border border-white/12 bg-[#111311] p-2 shadow-2xl shadow-black/50">
              <div className="space-y-1 border-b border-white/10 pb-2">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link href="/login" className={`mt-2 flex w-full ${organizerButtonClass}`}>
                Organizer Portal
              </Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
