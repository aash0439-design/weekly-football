"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/organizer";
      return;
    }

    alert("❌ Incorrect password.");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#111111] p-8">

        <h1 className="text-4xl font-black uppercase text-white">
          Organizer Login
        </h1>

        <p className="mt-3 text-zinc-500 uppercase tracking-widest text-sm">
          Weekly Footy
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <input
            type="password"
            placeholder="Organizer Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-[#ccff00]"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#ccff00] py-4 font-black uppercase text-black hover:bg-[#b3e600]"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}