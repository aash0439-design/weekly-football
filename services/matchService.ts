import { supabase } from "@/lib/supabase";
import { Match } from "@/types/match";

export async function getLatestMatch(): Promise<Match | null> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data as Match;
}

export async function getJoinedPlayersCount(
  matchId: string
): Promise<number> {
  const { count, error } = await supabase
    .from("match_registrations")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("match_id", matchId);

  if (error) {
    throw error;
  }

  return count ?? 0;
}
export async function getJoinedPlayers(matchId: string) {
  const { data, error } = await supabase
    .from("match_registrations")
    .select(`
      player:players (
        id,
        full_name,
        primary_position
      )
    `)
    .eq("match_id", matchId);

  if (error) {
    throw error;
  }

  return data;
}
export async function closeRegistration(matchId: string) {
  console.log("Updating match:", matchId);

  const { data, error } = await supabase
    .from("matches")
    .update({
      status: "Closed",
    })
    .eq("id", matchId)
    .select();

  console.log("Supabase returned:", data);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}
export async function reopenRegistration(matchId: string) {
  const { data, error } = await supabase
    .from("matches")
    .update({
      status: "Open",
    })
    .eq("id", matchId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
export async function removePlayerFromMatch(
  matchId: string,
  playerId: string
) {
  const { error } = await supabase
    .from("match_registrations")
    .delete()
    .eq("match_id", matchId)
    .eq("player_id", playerId);

  if (error) {
    throw error;
  }
}
export async function updateMatch(
  matchId: string,
  updates: {
    title: string;
    venue: string;
    match_date: string;
    kickoff_time: string;
    max_players: number;
  }
) {
  const { data, error } = await supabase
    .from("matches")
    .update(updates)
    .eq("id", matchId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
export async function deleteMatch(matchId: string) {
  const { data, error } = await supabase
    .from("matches")
    .delete()
    .eq("id", matchId)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
