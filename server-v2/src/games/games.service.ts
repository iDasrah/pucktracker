import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'prisma/db';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class GamesService {
    constructor(private readonly teamsService: TeamsService) {}

    async getTodayGames() {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api-web.nhle.com/v1/schedule/${today}`);
        const { gameWeek } = await response.json();

        const games = gameWeek[0].games;

        return games.map((game: any) =>
            ({
                gameId: game.id,
                homeTeam: {
                    fullName: `${game.homeTeam.placeName.default} ${game.homeTeam.commonName.default}`,
                    teamCode: game.homeTeam.abbrev,
                },
                awayTeam: {
                    fullName: `${game.awayTeam.placeName.default} ${game.awayTeam.commonName.default}`,
                    teamCode: game.awayTeam.abbrev,
                },
            })
        );
    }

    async getBestPlayers(id: number, position?: string, filter: 'points' | 'goals' | 'assists' = 'points', take?: number) {
        const where: Prisma.PlayerWhereInput = {}

        if (position) {
            where.position = position;
        }

        const response = await fetch(`https://api-web.nhle.com/v1/gamecenter/${id}/landing`);
        const { homeTeam, awayTeam } = await response.json();

        const homeTeamCode = homeTeam.abbrev;
        const awayTeamCode = awayTeam.abbrev;

        const [homePlayers, awayPlayers] = await Promise.all([
            prisma.player.findMany({
                where: { teamId: homeTeamCode, ...where },
                include: {
                    playerStats: true,
                },
            }),
            prisma.player.findMany({
                where: { teamId: awayTeamCode, ...where },
                include: {
                    playerStats: true,
                },
            }),
        ]);

        const topHome = homePlayers
            .filter((p) => p.playerStats)
            .sort((a, b) => (b.playerStats![filter] ?? 0) - (a.playerStats![filter] ?? 0))
            .slice(0, take ?? 3)
            .map((p) => ({
                id: p.id,
                fullName: p.fullName,
                position: p.position,
                playersStats: {
                    points: p.playerStats!.points,
                    goals: p.playerStats!.goals,
                    assists: p.playerStats!.assists,
                },
            }));

        const topAway = awayPlayers
            .filter((p) => p.playerStats)
            .sort((a, b) => (b.playerStats![filter] ?? 0) - (a.playerStats![filter] ?? 0))
            .slice(0, take ?? 3)
            .map((p) => ({
                id: p.id,
                fullName: p.fullName,
                position: p.position,
                playersStats: {
                    points: p.playerStats!.points,
                    goals: p.playerStats!.goals,
                    assists: p.playerStats!.assists,
                },
            }));

        return {
            homeTeam: {
                fullName: `${homeTeam.placeName.default} ${homeTeam.commonName.default}`,
                teamCode: homeTeamCode,
            },
            awayTeam: {
                fullName: `${awayTeam.placeName.default} ${awayTeam.commonName.default}`,
                teamCode: awayTeamCode,
            },
            bestPlayers: {
                home: topHome,
                away: topAway,
            },
        };
    }
}
