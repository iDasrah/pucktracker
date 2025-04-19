import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TeamsService } from 'src/teams/teams.service';

@Module({
    imports: [],
    controllers: [GamesController],
    providers: [GamesService, TeamsService],
    exports: [],
})
export class GamesModule {}
