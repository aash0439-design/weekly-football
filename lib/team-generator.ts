export interface Player {
  id: string;
  full_name: string;
  primary_position: string;
  skill_level: number | null;
}

export interface TeamResult {
  teamA: Player[];
  teamB: Player[];
  skillA: number;
  skillB: number;
}
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
export function generateBalancedTeams(players: Player[]): TeamResult {

  const goalkeepers = shuffle(
    players.filter(
      (p) => p.primary_position.toLowerCase() === "goalkeeper"
    )
  );

  const defenders = shuffle(
    players.filter(
      (p) => p.primary_position.toLowerCase() === "defender"
    )
  );

  const midfielders = shuffle(
    players.filter(
      (p) => p.primary_position.toLowerCase() === "midfielder"
    )
  );

  const forwards = shuffle(
    players.filter(
      (p) => p.primary_position.toLowerCase() === "forward"
    )
  );

  const teamA: Player[] = [];
  const teamB: Player[] = [];

  let skillA = 0;
  let skillB = 0;

  function addBalanced(group: Player[]) {

    group.sort(
      (a, b) =>
        (b.skill_level ?? 3) -
        (a.skill_level ?? 3)
    );

    for (const player of group) {

      const skill = player.skill_level ?? 3;

      if (teamA.length < teamB.length) {

        teamA.push(player);
        skillA += skill;

      } else if (teamB.length < teamA.length) {

        teamB.push(player);
        skillB += skill;

      } else {

        if (skillA <= skillB) {

          teamA.push(player);
          skillA += skill;

        } else {

          teamB.push(player);
          skillB += skill;

        }

      }

    }

  }

  addBalanced(goalkeepers);
  addBalanced(defenders);
  addBalanced(midfielders);
  addBalanced(forwards);

  return {
    teamA,
    teamB,
    skillA,
    skillB,
  };

}