import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //* you will need to create a basic order entity
  //* create a many-to-one relationship between orders and a single user
  //* create three routes, get, create, and update for orders
  //* pn:- 4 a user should be able to retrieve himself along with his orders
  //* create a global auth guard to restrict access to authenticated users only
  //* make use of @nestjs/jwt package to implement basic jwt token-based auth
  //* create a file upload interceptor for user to upload his profile pic
  //* create a cron job that runs every hour and simple logs the number of total users in the database
  //* convert the orders app to a hybrid microservice
  //* convert pn:- 4 to a TCP microservice call instead of a REST API call (curve:- avoid deep-diving into observables)
  //* define a DTO for update user API | Create an update user API endpoint (make use of class-validator package)
  //* create a default scope that only active users should be fetched
  //* learn briefly about provide-inject pattern in nestjs; dependency injection; and what the IOC container does; types of providers
  //* let's do all this before 8th of October  
  // @UseInterceptors(FileInterceptor)
  
  @Get()
  getUsers(): any {
    return this.ordersService.getUsers();
  }
} 
