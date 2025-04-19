import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Get()
    getAllTeams(
        @Query('includePlayers', new DefaultValuePipe(false), ParseBoolPipe) includePlayers?: boolean,
        @Query('name') name?: string
    ) {
        return this.teamsService.getAllTeams(includePlayers, name);
    }

    @Get('/:id/players')
    getTeamPlayers(
        @Param('id') id: string,
        @Query('includeTeam', new DefaultValuePipe(false), ParseBoolPipe) includeTeam?: boolean,
        @Query('position') position?: string,
        @Query('includeStats', new DefaultValuePipe(false), ParseBoolPipe) includeStats?: boolean,
    ) {
        return this.teamsService.getTeamPlayers(id, includeTeam, position, includeStats);
    }

    @Get(':id')
    getOneTeam(@Param('id') id: string) {
        return this.teamsService.getOneTeam(id);
    }
}
