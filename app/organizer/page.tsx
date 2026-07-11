"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrganizerDashboardPage() {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    match_date: "",
    kickoff_time: "",
    max_players: "",
    status: "Open",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const insertData = {
        title: formData.title,
        venue: formData.venue,
        match_date: formData.match_date,
        kickoff_time: formData.kickoff_time,
        max_players: formData.max_players ? parseInt(formData.max_players) : null,
        status: formData.status,
      };

      const { error } = await supabase.from("matches").insert([insertData]);

      if (error) {
        throw error;
      }

      setSuccessMsg("Match created successfully! Ready for kickoff.");
      setFormData({
        title: "",
        venue: "",
        match_date: "",
        kickoff_time: "",
        max_players: "",
        status: "Open",
      });
    } catch (error: any) {
      console.error("Error creating match:", error);
      setErrorMsg(error.message || "Failed to create match. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-3xl w-full mx-auto">
        <div className="mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            Organizer <span className="text-[#ccff00]">Dashboard</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base uppercase tracking-widest">
            Create and manage weekly football matches.
          </p>
        </div>

        <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold px-4 py-2 rounded-bl-2xl border-l border-b border-[#ccff00]/20 uppercase tracking-widest">
            Match Creator
          </div>

          {successMsg && (
            <div className="mt-4 mb-6 p-4 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-sm font-bold tracking-wide uppercase text-center">
              {successMsg}
            </div>
          )}
          
          {errorMsg && (
            <div className="mt-4 mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold tracking-wide uppercase text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-8 mt-4" onSubmit={handleSubmit}>
            
            {/* Title & Venue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Match Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sunday Night Derby"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="venue" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Uliyathadkka Turf"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-800/50">
              <div className="space-y-2">
                <label htmlFor="match_date" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Match Date
                </label>
                <input
                  type="date"
                  id="match_date"
                  value={formData.match_date}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="kickoff_time" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Kickoff Time
                </label>
                <input
                  type="time"
                  id="kickoff_time"
                  value={formData.kickoff_time}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Players & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-800/50">
              <div className="space-y-2">
                <label htmlFor="max_players" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Maximum Players
                </label>
                <input
                  type="number"
                  id="max_players"
                  value={formData.max_players}
                  onChange={handleChange}
                  required
                  min="1"
                  max="50"
                  placeholder="24"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all cursor-pointer"
                  >
                    <option value="Open">Open (Accepting Players)</option>
                    <option value="Closed">Closed (Roster Full)</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 mt-4 border-t border-zinc-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ccff00] text-black font-black uppercase tracking-widest py-5 rounded-xl hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.25)] flex justify-center items-center gap-2"
              >
                {isSubmitting ? "Creating Match..." : "Create Match"}
                {!isSubmitting && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                  </svg>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </main>
  );
}