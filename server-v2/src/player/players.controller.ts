import {
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
    constructor(private readonly playerService: PlayersService) {}

    @Get()
    getAllPlayers(
        @Query('includeStats', new DefaultValuePipe(false), ParseBoolPipe)
        includeStats?: boolean,
        @Query('name') name?: string,
        @Query('position') position?: string,
    ) {
        return this.playerService.getAllPlayers(includeStats, name, position);
    }

    @Get('best')
    getBestPlayers(
        @Query('includeStats', new DefaultValuePipe(false), ParseBoolPipe)
        includeStats?: boolean,
        @Query('position') position?: string,
        @Query('filter') filter?: 'points' | 'goals' | 'assists',
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    ) {
        return this.playerService.getBestPlayers(
            includeStats,
            position,
            filter,
            take,
        );
    }

    @Get(':id')
    getOnePlayer(
        @Param('id', ParseIntPipe) id: number,
        @Query('includeStats', new DefaultValuePipe(false), ParseBoolPipe) includeStats?: boolean,
    ) {
        return this.playerService.getOnePlayer(id, includeStats);
    }
}
