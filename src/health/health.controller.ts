import { Controller, Get, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { HealthcheckService } from './health.service';
import { healthAns } from "./interfaces/healthAns";

const DEFAULT_HEALTHCECK = 'healthCheck.ts'

@Controller('health')
export class HealthController {
    constructor(private readonly healthcheckService: HealthcheckService) { }
    @Get()
    async advancedHealthCheck(@Query('filePath') filePath: string): Promise<healthAns> {
        console.log(filePath);
        
        if (!filePath) {
            filePath= DEFAULT_HEALTHCECK;
        }

        return await this.healthcheckService.healthCheck(filePath);

    }
    @Get('basic')
    healthcheck(): string {
        return 'All Good';
    }

  
}