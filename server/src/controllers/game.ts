import { Request, Response } from "express";
import prisma from "../services/db";

export const getTodaysGames = async (req: Request, res: Response) => {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api-web.nhle.com/v1/schedule/${today}`);
    const { gameWeek } = await response.json();

    const gameData = gameWeek[0].games.map((game: any) => ({
        homeTeam: {
            fullName: `${game.homeTeam.placeName.default} ${game.homeTeam.commonName.default}`,
            teamCode: game.homeTeam.abbrev,
        },
        awayTeam: {
            fullName: `${game.awayTeam.placeName.default} ${game.awayTeam.commonName.default}`,
            teamCode: game.awayTeam.abbrev,
        }
    }));

    res.status(200).json(gameData);
};

export const getTodaysGamesBestPlayers = async (req: Request, res: Response) => {
    const today = new Date().toISOString().split("T")[0];

    try {
        const response = await fetch(`https://api-web.nhle.com/v1/schedule/${today}`);
        const { gameWeek } = await response.json();

        const games = gameWeek[0].games;
        const results = [];

        for (const game of games) {
            const homeTeamCode = game.homeTeam.abbrev;
            const awayTeamCode = game.awayTeam.abbrev;

            const [homePlayers, awayPlayers] = await Promise.all([
                prisma.player.findMany({
                    where: { teamId: homeTeamCode },
                    include: { playerStats: true },
                }),
                prisma.player.findMany({
                    where: { teamId: awayTeamCode },
                    include: { playerStats: true },
                }),
            ]);

            const topHome = homePlayers
                .filter(p => p.playerStats)
                .sort((a, b) => (b.playerStats!.points ?? 0) - (a.playerStats!.points ?? 0))
                .slice(0, 3);

            const topAway = awayPlayers
                .filter(p => p.playerStats)
                .sort((a, b) => (b.playerStats!.points ?? 0) - (a.playerStats!.points ?? 0))
                .slice(0, 3);

            results.push({
                homeTeam: {
                    fullName: `${game.homeTeam.placeName.default} ${game.homeTeam.commonName.default}`,
                    teamCode: homeTeamCode,
                },
                awayTeam: {
                    fullName: `${game.awayTeam.placeName.default} ${game.awayTeam.commonName.default}`,
                    teamCode: awayTeamCode,
                },
                bestPlayers: {
                    home: topHome.map(p => ({
                        id: p.id,
                        fullName: p.fullName,
                        position: p.position,
                        points: p.playerStats!.points,
                        goals: p.playerStats!.goals,
                        assists: p.playerStats!.assists,
                    })),
                    away: topAway.map(p => ({
                        id: p.id,
                        fullName: p.fullName,
                        position: p.position,
                        points: p.playerStats!.points,
                        goals: p.playerStats!.goals,
                        assists: p.playerStats!.assists,
                    })),
                },
            });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Erreur dans getTodaysGamesBestPlayers:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
}