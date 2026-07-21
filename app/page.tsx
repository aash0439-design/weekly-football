import Link from "next/link";
import type { ReactNode } from "react";

import Footer from "@/components/landing/Footer";
import CommunityGallery from "@/components/landing/CommunityGallery";
import { communityGalleryPhotos } from "@/components/landing/communityGalleryData";
import Navbar from "@/components/landing/Navbar";
import MatchCard from "@/components/match/MatchCard";

function ScrollReveal({ children, className }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

const seasonStats = [
  { value: "120+", label: "active players" },
  { value: "60+", label: "matches played" },
  { value: "86%", label: "average attendance" },
  { value: "8", label: "match organizers" },
];

const standards = [
  {
    number: "01",
    title: "Balanced sides",
    copy: "Teams are set by the organizers so every match starts competitive, not lopsided.",
  },
  {
    number: "02",
    title: "Clear match info",
    copy: "Time, pitch, format, and confirmed players live in one place before matchday.",
  },
  {
    number: "03",
    title: "Good football culture",
    copy: "Show up on time, play fair, and help make the next game even better.",
  },
];

const steps = [
  { step: "01", title: "Create your profile", copy: "Tell us how you play so organizers can place you well." },
  { step: "02", title: "Join a fixture", copy: "Reserve a slot while the match is still open." },
  { step: "03", title: "Check your team", copy: "Get your side, pitch details, and kick-off reminder." },
  { step: "04", title: "Turn up and play", copy: "Bring your boots. The rest is organized." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070807] font-sans text-white selection:bg-[#ccff00] selection:text-black">
      <style>{`html { scroll-behavior: smooth; } @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`}</style>
      <Navbar />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.14),transparent_30%),linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-16 lg:px-10 lg:py-20">
          <ScrollReveal className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ccff00]">
              <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_14px_3px_rgba(204,255,0,0.35)]" />
              Kasaragod Football Community
            </div>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
              Your week,
              <span className="block text-[#ccff00]">on the pitch.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              An organized place for Kasaragod&apos;s footballers to find fixtures, meet their team, and play good games every week.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="#current-match" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-[#ccff00]/50 hover:bg-[#ccff00]/10">
                View this week&apos;s match <span aria-hidden="true">↓</span>
              </Link>
              <span className="text-sm text-zinc-500">11-a-side · 90 min · open to all levels</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#101210]/90 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur sm:p-6">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#ccff00]/10 blur-3xl" />
              <div className="relative flex items-start justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Next fixture</p>
                  <p className="mt-2 text-xl font-black uppercase tracking-[-0.035em] text-white">Friday Night Football</p>
                </div>
                <span className="rounded-full bg-[#ccff00]/10 px-3 py-1.5 text-xs font-bold text-[#ccff00]">Open</span>
              </div>
              <div className="relative grid grid-cols-3 divide-x divide-white/10 py-6 text-center">
                <div><p className="text-xs font-medium text-zinc-500">Day</p><p className="mt-2 text-lg font-bold text-white">Friday</p></div>
                <div><p className="text-xs font-medium text-zinc-500">Kick-off</p><p className="mt-2 text-lg font-bold text-white">7:30 PM</p></div>
                <div><p className="text-xs font-medium text-zinc-500">Format</p><p className="mt-2 text-lg font-bold text-white">11v11</p></div>
              </div>
              <div className="relative flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3.5 text-sm">
                <span className="text-zinc-400">Municipal Stadium, Kasaragod</span>
                <span className="font-bold text-white">8 spots left</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="current-match" className="scroll-mt-20 border-b border-white/10 bg-[#090a09] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">This week</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">Match centre</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">Availability, teams, and all match details stay here—no chasing messages in a group chat.</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101210] p-3 shadow-2xl shadow-black/30 sm:p-4">
              <MatchCard />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="community" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">The community, in numbers</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">A regular game needs regular players.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-500">Every number points to one thing: more dependable football, with people who want to keep coming back.</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {seasonStats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 70} className="h-full bg-[#0d0f0d]">
                <article className="p-6 sm:p-7">
                  <p className="text-4xl font-black tracking-[-0.05em] text-[#ccff00]">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CommunityGallery photos={communityGalleryPhotos} />

      <section className="border-b border-white/10 bg-[#090a09] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">Matchday standard</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">The details that make a good game.</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {standards.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 90}>
                <article className="h-full rounded-2xl border border-white/10 bg-[#101210] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/35 hover:bg-[#131613] sm:p-7">
                  <p className="text-sm font-black text-[#ccff00]">{item.number}</p>
                  <h3 className="mt-10 text-xl font-bold tracking-[-0.025em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{item.copy}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">First match</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">How your first game works.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">Everything is designed to get you from sign-up to kick-off without friction.</p>
          </ScrollReveal>
          <div className="grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            {steps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 75}>
                <article className="flex gap-5 py-7 md:px-7 md:odd:pl-0">
                  <span className="pt-0.5 text-sm font-black text-[#ccff00]">{item.step}</span>
                  <div><h3 className="text-lg font-bold text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.copy}</p></div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#ccff00]/20 bg-[#11150b] px-6 py-10 sm:px-10 sm:py-12">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(204,255,0,0.16),transparent_55%)]" />
              <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">Season one · 2026</p>
                  <h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl">Weekly Footy<br /><span className="text-[#ccff00]">League Cup</span></h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">A structured competition for the same community that fills the weekly fixtures. Registration opens with the next squad announcement.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm">
                  <p className="text-zinc-500">Format</p><p className="mt-1 font-bold text-white">8 teams · 7 matchweeks</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0d0f0d] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">For organizers</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Organizing matches? Manage registrations, fixtures, and results from the Organizer Portal.</p>
              </div>
              <Link href="/login" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:border-[#ccff00]/45 hover:bg-[#ccff00]/10 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#070807]">
                Go to Organizer Portal
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
