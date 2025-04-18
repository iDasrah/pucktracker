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

    async getOneTeam(id: string) {
        return prisma.team.findUnique({
            where: {
                teamCode: id.toUpperCase(),
            },
        });
    }
}
