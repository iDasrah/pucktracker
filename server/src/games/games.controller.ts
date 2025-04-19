import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get('today')
    getTodayGames() {
        return this.gamesService.getTodayGames();
    }

    @Get(':id/players/best')
    getBestPlayers(
        @Param('id', ParseIntPipe) id: number,
        @Query('position') position?: string,
        @Query('filter') filter?: 'points' | 'goals' | 'assists',
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    ) {
        return this.gamesService.getBestPlayers(id, position, filter, take);
    }
}
