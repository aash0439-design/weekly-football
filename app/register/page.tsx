"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    primary_position: "",
    preferred_foot: "",
    jersey_number: "",
    skill_level: "",
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
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        primary_position: formData.primary_position,
        preferred_foot: formData.preferred_foot,
        jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
        skill_level: formData.skill_level ? parseInt(formData.skill_level) : null,
      };

      const { error } = await supabase.from("players").insert([insertData]);

      if (error) {
        throw error;
      }

      setSuccessMsg("Registration successful! Welcome to the arena.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        primary_position: "",
        preferred_foot: "",
        jersey_number: "",
        skill_level: "",
      });
    } catch (error: any) {
      console.error("Error inserting player:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      
      {/* Background glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            Draft <span className="text-[#ccff00]">Profile</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base uppercase tracking-widest">
            Enter the arena. Register for Weekly Football.
          </p>
        </div>

        <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-sm font-bold tracking-wide uppercase text-center">
              {successMsg}
            </div>
          )}
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold tracking-wide uppercase text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="full_name" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Lionel Messi"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="player@example.com"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
              />
            </div>

            {/* Position & Foot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="primary_position" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Primary Position
                </label>
                <div className="relative">
                  <select
                    id="primary_position"
                    value={formData.primary_position}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-600">Select Position</option>
                    <option value="Forward">Forward (ST / LW / RW)</option>
                    <option value="Midfielder">Midfielder (CAM / CM / CDM)</option>
                    <option value="Defender">Defender (CB / LB / RB)</option>
                    <option value="Goalkeeper">Goalkeeper (GK)</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="preferred_foot" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Preferred Foot
                </label>
                <div className="relative">
                  <select
                    id="preferred_foot"
                    value={formData.preferred_foot}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-600">Select Foot</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Both">Both (Two-footed)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Jersey Number & Skill Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="jersey_number" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Jersey Number <span className="text-zinc-600 font-normal lowercase tracking-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  id="jersey_number"
                  value={formData.jersey_number}
                  onChange={handleChange}
                  min="1"
                  max="99"
                  placeholder="10"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="skill_level" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Skill Level <span className="text-[#ccff00] font-normal tracking-normal">(1-5)</span>
                </label>
                <div className="relative">
                  <select
                    id="skill_level"
                    value={formData.skill_level}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-600">Rate your game</option>
                    <option value="1">1 - Beginner (Just starting)</option>
                    <option value="2">2 - Amateur (Casual player)</option>
                    <option value="3">3 - Intermediate (Regular player)</option>
                    <option value="4">4 - Advanced (Experienced/Club level)</option>
                    <option value="5">5 - Elite (Semi-pro/Pro)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ccff00] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.25)] flex justify-center items-center gap-2"
              >
                {isSubmitting ? "Drafting..." : "Complete Registration"}
                {!isSubmitting && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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