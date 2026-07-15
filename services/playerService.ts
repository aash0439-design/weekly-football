import { supabase } from "@/lib/supabase";
import { Player } from "@/types/player";

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching players:", error);
    throw error;
  }

  return data as Player[];
}

export async function registerPlayer(
  player: Omit<Player, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("players")
    .insert(player)
    .select()
    .single();

  if (error) {
    console.error("Error registering player:", error);
    throw error;
  }

  return data;
}
export async function joinMatch(
  matchId: string,
  playerId: string
) {
  // Get the match
  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("max_players, status")
    .eq("id", matchId)
    .single();

  if (matchError) {
    throw matchError;
  }

  // Don't allow joining closed/full matches
  if (match.status !== "Open") {
    throw new Error("Registration is closed.");
  }

  // Count current registrations
  const { count, error: countError } = await supabase
    .from("match_registrations")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("match_id", matchId);

  if (countError) {
    throw countError;
  }

  // Stop if match is already full
  if (
    match.max_players !== null &&
    (count ?? 0) >= match.max_players
  ) {
    throw new Error("MATCH_FULL");
  }

  // Register the player
  const { data, error } = await supabase
    .from("match_registrations")
    .insert({
      match_id: matchId,
      player_id: playerId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  // If this player filled the last slot,
  // automatically mark the match as Full.
  if (
    match.max_players !== null &&
    (count ?? 0) + 1 >= match.max_players
  ) {
    await supabase
      .from("matches")
      .update({
        status: "Full",
      })
      .eq("id", matchId);
  }

  return data;
}
export async function isPlayerJoined(
  matchId: string,
  playerId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("match_registrations")
    .select("id")
    .eq("match_id", matchId)
    .eq("player_id", playerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
}