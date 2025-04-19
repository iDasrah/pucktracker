import { Controller, Get, UseGuards } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronGuard } from './cron.guard';

@Controller('cron')
export class CronController {
    constructor(private readonly cronServices: CronService) {}

    @Get('update/players')
    @UseGuards(CronGuard)
    updatePlayers() {
        return this.cronServices.updatePlayers();
    }
}
