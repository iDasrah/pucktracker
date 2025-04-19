import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { GamesModule } from './games/games.module';

@Module({
    imports: [PlayersModule, TeamsModule, GamesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
