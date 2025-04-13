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
        home: Player[];
        away: Player[];
    };
}

export type Player = {
    id: number;
    fullName: string;
    position: string;
    points: number;
    goals: number;
    assists: number;
};