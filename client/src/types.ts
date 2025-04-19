export type Game = {
    gameId: number,
    homeTeam: Team
    awayTeam: Team
}

export type Team = {
    teamCode: string;
    name: string;
    players?: Player[];
    bestPlayers?: Player[];
}

export type Player = {
    id: number;
    fullName: string;
    teamId: string;
    position: string;
    playerStats?: {
        points: number;
        goals: number;
        assists: number;
    }
}