import { Injectable } from '@nestjs/common';
import prisma from 'prisma/db';

@Injectable()
export class CronService {
    async updatePlayers() {
        const players = await prisma.player.findMany({
            include: {
                playerStats: true
            }
        });

        players.map(async (player) => {
            const data = await fetch(`https://api-web.nhle.com/v1/player/${player.id}/landing`);
            const json = await data.json();

            let goals = 0;
            let assists = 0;
            let points = 0;

            json.last5Games.forEach((game: { goals: number; assists: number; points: number; }) => {
                goals += game.goals;
                assists += game.assists;
                points += game.points;
            });

            const stats = {
                playerId: player.id,
                goals,
                assists,
                points
            }
            
            await prisma.playerStats.update({
                where: {
                    playerId: player.id
                },
                data: stats,
            });
        });

        return players;
    }
}
