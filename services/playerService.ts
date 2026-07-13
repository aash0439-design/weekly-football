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
  const { data, error } = await supabase
    .from("match_registrations")
    .insert({
      match_id: matchId,
      player_id: playerId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error joining match:", error);
    throw error;
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