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