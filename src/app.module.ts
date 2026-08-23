import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventEmitterModule.forRoot({
      wildcard: true, // Allow wildcard event names
      delimiter: '.', // Use '.' as the delimiter for event names
      maxListeners: 10, // Set the maximum number of listeners for each event
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
