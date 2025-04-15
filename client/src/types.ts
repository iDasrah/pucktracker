export type Game = {
    gameId: number,
    homeTeam: {
        fullName: string;
        teamCode: string;
    };
    awayTeam: {
        fullName: string;
        teamCode: string;
    };
    bestPlayers?: {
        home: PlayerWithStats[];
        away: PlayerWithStats[];
    };
}

export type Team = {
    teamCode: string;
    name: string;
    players?: Player[];
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

export type PlayerWithStats = {
    id: number;
    fullName: string;
    teamCode: string;
    position: string;
    points: number;
    goals: number;
    assists: number;
}

export type PlayerStatsWithPlayer = {
    playerId: number;
    points: number;
    goals: number;
    assists: number;
    player: {
        id: number;
        fullName: string;
        teamCode: string;
        position: string;
    }
};