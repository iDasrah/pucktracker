import { Injectable } from '@nestjs/common';
import prisma from '../../prisma/db';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlayersService {
    async getAllPlayers(includeStats?: boolean, name?: string, position?: string) {
        const include: Prisma.PlayerInclude = {};
        const where: Prisma.PlayerWhereInput = {};

        if (includeStats) {
            include.playerStats = true;
        }

        if (name) {
            where.fullName = {
                contains: name,
                mode: 'insensitive',
            };
        }

        if (position) {
            where.position = {
                contains: position,
                mode: 'insensitive',
            };
        }

        return await prisma.player.findMany({
            include,
            where,
        });
    }

    async getOnePlayer(id: number, includeStats?: boolean) {
        const include: Prisma.PlayerInclude = {};

        if (includeStats) {
            include.playerStats = true;
        }

        return await prisma.player.findUnique({
            where: { id },
            include,
        });
    }

    async getBestPlayers(includeStats?: boolean, position?: string, filter: string = 'points', take?: number) {
        const include: Prisma.PlayerInclude = {};
        const where: Prisma.PlayerWhereInput = {};

        if (includeStats) {
            include.playerStats = true;

            where.playerStats = {
                isNot: null
            };
        }

        if (position) {
            where.position = {
                contains: position,
                mode: 'insensitive',
            };
        }

        return await prisma.player.findMany({
            include,
            where,
            orderBy: {
                playerStats: {
                    [filter]: 'desc',
                },
            },
            take: take,
        });
    }
}
