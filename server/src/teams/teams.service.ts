import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'prisma/db';

@Injectable()
export class TeamsService {
    async getAllTeams(includePlayers?: boolean, name?: string) {
        const include: Prisma.TeamInclude = {}
        const where: Prisma.TeamWhereInput = {}

        if (includePlayers) {
            include.players = true;
        }

        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            }
        }

        return await prisma.team.findMany({
            include,
            where,
        });
    }

    async getTeamPlayers(id: string, includeTeam?: boolean, position?: string, includeStats?: boolean) {
        const include: Prisma.PlayerInclude = {}
        const where: Prisma.PlayerWhereInput = {}

        if (includeTeam) {
            include.team = true;
        }

        if (includeStats) {
            include.playerStats = true;
        }

        if (position) {
            where.position = {
                contains: position,
                mode: 'insensitive',
            }
        }

        return prisma.player.findMany({
            where: {
                teamId: id.toUpperCase(),
                ...where,
            },
            include,
        });
    }

    async getOneTeam(id: string, includePlayers?: boolean) {
        const include: Prisma.TeamInclude = {}

        if (includePlayers) {
            include.players = true;
        }

        return prisma.team.findUnique({
            where: {
                teamCode: id.toUpperCase(),
            },
            include,
        });
    }

    async getBestPlayers(id: string, includeStats?: boolean, position?: string, filter: 'points' | 'goals' | 'assists' = 'points', take?: number) {
        const where: Prisma.PlayerWhereInput = {}

        if (position) {
            where.position = {
                contains: position,
                mode: 'insensitive',
            }
        }

        const team = await prisma.team.findUnique({
            where: {
                teamCode: id.toUpperCase(),
            },
            include: {
                players: {
                    where,
                    include: {
                        playerStats: true,
                    }
                },
            },
        });

        if (!team) {
            return null;
        }

        const bestPlayers = team.players
            .filter((p) => p.playerStats)
            .sort((a, b) => (b.playerStats![filter] ?? 0) - (a.playerStats![filter] ?? 0))
            .slice(0, take ?? 3)
            .map((p) => ({
                id: p.id,
                fullName: p.fullName,
                position: p.position,
                playerStats: {}
            }));

        if (includeStats) {
            bestPlayers.forEach((p, i) => {
                const player = team.players[i];
                if (player.playerStats) {
                    p.playerStats = {
                        points: player.playerStats.points,
                        goals: player.playerStats.goals,
                        assists: player.playerStats.assists,
                    };
                }
            });
        }

        return {
            teamCode: team.teamCode,
            name: team.name,
            bestPlayers
        };
    }
}
