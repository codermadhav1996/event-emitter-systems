import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  getHello(): string {
    return 'Hello World!';
  }

  publishEvent(eventName: string, payload?: unknown) {
    const listenerCount = this.eventEmitter.emit(eventName, payload);

    return {
      eventName,
      listenerCount,
      status: 'published',
    };
  }
}
