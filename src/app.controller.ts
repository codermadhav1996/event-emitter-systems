import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface PublishEventRequest {
  eventName: string;
  payload?: unknown;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('events')
  publishEvent(@Body() request: PublishEventRequest) {
    return this.appService.publishEvent(request.eventName, request.payload);
  }
}
