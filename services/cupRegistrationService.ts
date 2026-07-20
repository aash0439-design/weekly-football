import { supabase } from "@/lib/supabase";

export async function joinCup(
  cupId: string,
  playerId: string
) {
  // Get Cup
  const { data: cup, error: cupError } = await supabase
    .from("cups")
    .select("max_players, status")
    .eq("id", cupId)
    .single();

  if (cupError) throw cupError;

  if (cup.status !== "Registration") {
    throw new Error("Registration is closed.");
  }

  // Already registered?
  const { data: existing, error: existingError } = await supabase
    .from("cup_registrations")
    .select("id")
    .eq("cup_id", cupId)
    .eq("player_id", playerId)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    throw new Error("ALREADY_REGISTERED");
  }

  // Count registrations
  const { count, error: countError } = await supabase
    .from("cup_registrations")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("cup_id", cupId);

  if (countError) throw countError;

  if ((count ?? 0) >= cup.max_players) {
    throw new Error("CUP_FULL");
  }

  // Register player
  const { data, error } = await supabase
    .from("cup_registrations")
    .insert({
      cup_id: cupId,
      player_id: playerId,
    })
    .select()
    .single();

  if (error) throw error;

  // Auto-close registration
  if ((count ?? 0) + 1 >= cup.max_players) {
    await supabase
      .from("cups")
      .update({
        status: "Full",
      })
      .eq("id", cupId);
  }

  return data;
}

export async function getCupPlayers(
  cupId: string
) {
  const { data, error } = await supabase
    .from("cup_registrations")
    .select(`
      *,
      player:players(*)
    `)
    .eq("cup_id", cupId);

  if (error) throw error;

  return data;
}

export async function getCupPlayerCount(
  cupId: string
) {
  const { count, error } = await supabase
    .from("cup_registrations")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("cup_id", cupId);

  if (error) throw error;

  return count ?? 0;
}

export async function removeCupPlayer(
  cupId: string,
  playerId: string
) {
  const { error } = await supabase
    .from("cup_registrations")
    .delete()
    .eq("cup_id", cupId)
    .eq("player_id", playerId);

  if (error) throw error;

  await supabase
    .from("cups")
    .update({
      status: "Registration",
    })
    .eq("id", cupId);
}