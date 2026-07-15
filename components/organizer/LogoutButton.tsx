"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-5 py-3 font-bold uppercase text-white hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}