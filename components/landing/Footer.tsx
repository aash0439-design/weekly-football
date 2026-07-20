import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080909]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Weekly Footy · Kasaragod Football Community.</p>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Fixtures updated weekly</span>
          <Link href="/privacy" className="transition hover:text-zinc-300">Privacy</Link>
          <Link href="/help" className="transition hover:text-zinc-300">Help</Link>
        </div>
      </div>
    </footer>
  );
}