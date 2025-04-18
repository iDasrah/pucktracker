import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './player/players.controller';
import { PlayersService } from './player/players.service';

@Module({
    imports: [],
    controllers: [AppController, PlayersController],
    providers: [AppService, PlayersService],
})
export class AppModule {}
