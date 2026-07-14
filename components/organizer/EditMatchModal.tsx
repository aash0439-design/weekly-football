"use client";

import { useState } from "react";
import { updateMatch } from "@/services/matchService";

interface EditMatchModalProps {
  match: {
    id: string;
    title: string;
    venue: string;
    match_date: string;
    kickoff_time: string;
    max_players: number | null;
  };
}

export default function EditMatchModal({
  match,
}: EditMatchModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: match.title,
    venue: match.venue,
    match_date: match.match_date,
    kickoff_time: match.kickoff_time,
    max_players: match.max_players?.toString() ?? "",
  });

  const [isSaving, setIsSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      setIsSaving(true);

      await updateMatch(match.id, {
        title: formData.title,
        venue: formData.venue,
        match_date: formData.match_date,
        kickoff_time: formData.kickoff_time,
        max_players: Number(formData.max_players),
      });

      alert("✅ Match updated!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("❌ Failed to update match.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-blue-600 px-6 py-3 font-black uppercase text-white hover:bg-blue-700 transition"
      >
        Edit Match
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-[#111111] p-8">

            <h2 className="mb-8 text-3xl font-black uppercase">
              Edit Match
            </h2>

            <div className="space-y-5">

              <input
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Match Title"
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
              />

              <input
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue"
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
              />

              <input
                id="match_date"
                type="date"
                value={formData.match_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
              />

              <input
                id="kickoff_time"
                type="time"
                value={formData.kickoff_time}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
              />

              <input
                id="max_players"
                type="number"
                value={formData.max_players}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3"
              />

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-zinc-700 px-5 py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl bg-[#ccff00] px-6 py-3 font-black uppercase text-black disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}