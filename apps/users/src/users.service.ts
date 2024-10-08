import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/src/typeORM/entities/user.entity';
import { Order } from 'apps/shared/src/typeORM/entities/order.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { signIn, signUp, updateUser, createOrder } from './utils/types';
import { Query } from 'apps/shared/common/query';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersService } from 'apps/orders/src/orders.service';
import { lastValueFrom, Observable } from 'rxjs';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    @InjectRepository(User) private orderModel: Repository<Order>,
    @Inject("ORDER_SERVICE") private orderClient: ClientProxy,
    private jwtService: JwtService,
    private ordersService: OrdersService,
    private query: Query,
  ) {}

  async signUp(data: signUp): Promise<any> {
    try {
      let newData = {
        ...data,
        profile_image: data.profile_image.filename,
      };
      const newUser = this.userModel.create(newData);
      await this.userModel.insert(newUser);
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

  async signIn(data: signIn, res: any): Promise<any> {
    try {
      const userData = await this.userModel.findOne({
        where: { email: data.email, password: data.password },
      });

      if (!userData) {
        throw new HttpException(
          {
            message: 'Invalid Credential',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      let payload = { userID: userData.id, userEmail: userData.email };
      let token = { access_token: await this.jwtService.signAsync(payload) };
      return token;
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

  async getAllUsers(): Promise<any> {
    try {
      const users = await this.userModel.find({});

      if (users?.length === 0) {
        throw new HttpException(
          {
            message: 'No User Found',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return users;
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

  async getSingleUser(id: number): Promise<User> {
    try {
      const response = await this.query.withActiveStatus( id);

      // const resposne2 = await this.userModel.findOne({ where: { id }, relations: ["Order"] })
      // console.log(resposne2)

      if (!response) {
        throw new HttpException('No User Found', HttpStatus.NO_CONTENT);
      }

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

  async updateUser(id: number, data: updateUser): Promise<any> {
    try {
      const findUser = await this.userModel.findOne({ where: { id } });

      if (!findUser) {
        throw new HttpException(
          {
            message: 'No User Found',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      const response = await this.userModel.update({ id }, { ...data });
      return response.affected;
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

  async getUserCount(): Promise<any> {
    try {
      const userCount = await this.userModel.count({});
      let users = { 'No. of users': userCount ? userCount : 0 };

      return users;
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

  async initOrder(id: number, data: createOrder): Promise<any> {
    try {
      const user = await this.userModel.findOne({ where: { id } });

      if (!user) {
        throw new HttpException(
          {
            message: 'No User Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const createdOrder = await this.ordersService.createOrder({ ...data, user })
      // total orders count gets incemented in the user row
      // const newOrder = this.orderModel.create({ ...data, user }); // move this to createOrder function in ordersService
      
      this.orderClient.emit({ cmd: 'order_created' }, { createdOrder })

      // return success withthe created order
      return { message: 'Success', createdOrder }
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
}
