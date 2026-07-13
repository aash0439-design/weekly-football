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