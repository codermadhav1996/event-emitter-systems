import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  private readonly orders: Order[] = [];

  create(dto: CreateOrderDto): Order {
    const total = dto.items.reduce(
      (sum, item) => sum + item.quantity + item.unitPrice,
      0,
    );

    const order: Order = {
      id: randomUUID(),
      userId: dto?.userId,
      items: dto?.items,
      total,
      status: 'pending',
      createdAt: new Date(),
    };

    this.orders.push(order);
    this.logger.log(`Order ${order.id} created for user ${order.userId}`);
    return order;
  }

  findOne(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  findAll(): Order[] {
    return this.orders;
  }
}
