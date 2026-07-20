import { Player } from "./team-generator";

export interface TeamStats {
  players: number;
  skill: number;
  goalkeepers: number;
  defenders: number;
  midfielders: number;
  forwards: number;
}

export function getTeamStats(team: Player[]): TeamStats {
  return {
    players: team.length,
    skill: team.reduce(
      (sum, player) => sum + (player.skill_level ?? 3),
      0
    ),
    goalkeepers: team.filter(
      (p) => p.primary_position.toLowerCase() === "goalkeeper"
    ).length,
    defenders: team.filter(
      (p) => p.primary_position.toLowerCase() === "defender"
    ).length,
    midfielders: team.filter(
      (p) => p.primary_position.toLowerCase() === "midfielder"
    ).length,
    forwards: team.filter(
      (p) => p.primary_position.toLowerCase() === "forward"
    ).length,
  };
}

export function calculateBalanceScore(
  teamA: Player[],
  teamB: Player[]
): number {

  const a = getTeamStats(teamA);
  const b = getTeamStats(teamB);

  let score = 100;

  score -= Math.abs(a.players - b.players) * 25;
  score -= Math.abs(a.skill - b.skill) * 5;
  score -= Math.abs(a.goalkeepers - b.goalkeepers) * 10;
  score -= Math.abs(a.defenders - b.defenders) * 6;
  score -= Math.abs(a.midfielders - b.midfielders) * 4;
  score -= Math.abs(a.forwards - b.forwards) * 4;

  return Math.max(0, score);
}