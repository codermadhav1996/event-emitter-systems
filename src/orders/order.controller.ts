import {
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const order = this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order ${id} is not found`);
    }
    return order;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}
