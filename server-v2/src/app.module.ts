import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './player/players.controller';
import { PlayersService } from './player/players.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';

@Module({
    imports: [],
    controllers: [AppController, PlayersController, TeamsController],
    providers: [AppService, PlayersService, TeamsService],
})
export class AppModule {}
