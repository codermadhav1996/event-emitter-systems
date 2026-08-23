import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../orders/events/order-created.event';
import { ORDER_EVENTS } from '../orders/events/order-events.constants';

@Injectable()
export class InventoryListener {
  private readonly logger = new Logger(InventoryListener.name);

  @OnEvent(ORDER_EVENTS.CREATED)
  handleOrderCreated(event: OrderCreatedEvent): void {
    this.logger.log(
      `Reserving stock for order ${event.orderId} (${event?.items?.length} items) `,
    );

    for (const item of event?.items) {
      this.logger.log(`Reserved ${item.quantity} X prody ${item?.productId}`);
    }

    this.logger.log(`Stock reservation complete for Order ${event.orderId}`);
  }
}
