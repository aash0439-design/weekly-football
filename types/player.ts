export interface Player {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  primary_position: string;
  preferred_foot: string;
  jersey_number: number | null;
  skill_level: number | null;
  created_at: string;
}