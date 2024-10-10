import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../shared/src/typeORM/entities/order.entity';
import { User } from 'apps/shared/src/typeORM/entities/user.entity';
import { Repository } from 'typeorm';
import { createOrder, updateOrder } from './libs/types';
import { createOrderDTO } from './dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderModel: Repository<Order>,
    @InjectRepository(User) private userModel: Repository<User>,
  ) {}

  async createOrder(data: createOrder): Promise<any> {
    try {
      const response = this.orderModel.create(data);
      //await this.orderModel.insert(response)
      return response;
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || 'Internal server error',
          status: err.status,
        },
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrders(id: number): Promise<any> {
    try {
      const user = await this.userModel.findOne({ where: { id } });

      const order = await this.orderModel.find({ where: { user } });

      if (!order) {
        return new HttpException(
          {
            message: 'No order Found',
          },
          HttpStatus.NO_CONTENT,
        );
      }
      return order;
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || 'Internal server error',
          status: err.status,
        },
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrder(id: number, data: updateOrder) {
    try {
      const findOrder = await this.orderModel.findOne({ where: { id } });

      if (!findOrder) {
        return new HttpException(
          {
            message: 'No order Found',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return await this.orderModel.update({ id: findOrder.id }, data);
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || 'Internal server error',
          status: err.status,
        },
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrderAck(data: createOrderDTO) {
    return { message: 'Order has been Successfully created', data };
  }
}
