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

    @Get(':id')
    getOnePlayer(
        @Param('id', ParseIntPipe) id: number,
        @Query('includeStats', ParseBoolPipe) includeStats: boolean,
    ) {
        return this.playerService.getOnePlayer(id, includeStats);
    }
}
