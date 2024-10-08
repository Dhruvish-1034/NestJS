import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDTO, updateOrderDto } from './dtos/order.dto';
//import { FileInterceptor } from '@nestjs/platform-express';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //* --done you will need to create a basic order entity
  //* --done create a many-to-one relationship between orders and a single user
  //* --done create three routes, get, create, and update for orders
  //* --done pn:- 4 a user should be able to retrieve himself along with his orders
  //* --done create a global auth guard to restrict access to authenticated users only
  //* --done make use of @nestjs/jwt package to implement basic jwt token-based auth
  //* --done create a file upload interceptor for user to upload his profile pic
  //* --done create a cron job that runs every hour and simple logs the number of total users in the database
  //*        convert the orders app to a hybrid microservice
  //*        convert pn:- 4 to a TCP microservice call instead of a REST API call (curve:- avoid deep-diving into observables)
  //* --done define a DTO for update user API | Create an update user API endpoint (make use of class-validator package)
  //* --done create a default scope that only active users should be fetched
  //*        learn briefly about provide-inject pattern in nestjs; dependency injection; and what the IOC container does; types of providers
  
  //* let's do all this before 8th of October  
  // @UseInterceptors(FileInterceptor)
  
  @Post('create-order')
  async  createOrder(@Query('id', ParseIntPipe) id: number ,@Body() createOrderDTO: createOrderDTO){
    return await this.ordersService.createOrder(id, createOrderDTO)
  }

  @Get('/get-order')
  async getOrders(@Query('id', ParseIntPipe) id: number): Promise<any> {
    return this.ordersService.getOrders(id);
  }

  @Patch('/update-order')
  async updateOrder(@Query('id', ParseIntPipe) id: number, @Body() updateOrderDto: updateOrderDto): Promise<any> {
    return this.ordersService.updateOrder(id, updateOrderDto)
  }
} 
