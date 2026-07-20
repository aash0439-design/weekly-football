import { supabase } from "@/lib/supabase";

export async function createCup(data: {
  name: string;
  max_players: number;
  number_of_teams: number;
  players_per_team: number;
}) {
  const { error } = await supabase
    .from("cups")
    .insert({
      ...data,
      status: "Registration",
    });

  if (error) {
    throw error;
  }
}

export async function getLatestCup() {
  const { data, error } = await supabase
    .from("cups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return data;
}
export {
  getLeaguePlayers,
  getLeaguePlayerCount,
} from "./cupRegistrationService";