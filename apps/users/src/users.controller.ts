import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { signInDto, signUpDto, updateUserDto, createOrderDTO } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from 'apps/shared/src/typeORM/entities/user.entity';
import { Public } from './common/global.decorator';
import { Cron, Interval } from '@nestjs/schedule';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'apps/shared/common/storage.config';
import { AuthGuard } from './auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/signup')
  @UseInterceptors(FileInterceptor('profile_image',  { storage: storage }))
  async signup(@Body(ValidationPipe) signUpDto: signUpDto, @UploadedFile() profile_image: Express.Multer.File): Promise<User> {
    return await this.usersService.signUp({ ...signUpDto, profile_image});
  }

  @Public()
  @Post('/signin')
  async signIn(
    @Body() signInDto: signInDto,
    @Req() res: Response,
  ): Promise<User> {
    return await this.usersService.signIn(signInDto, res);
  }

  @Get('/get-all-users')
  async getAllUsers(@Req() request: Request): Promise<User> {
    return await this.usersService.getAllUsers();
  }

  @Public()
  @Get('/get-single-user')
  async getSingleUser(@Query('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.getSingleUser(id);
  }

  @Public()
  @Patch('/update-user')
  async updateUser(
    @Query('id', ParseIntPipe) id: number,
    @Body() updateUserDto: updateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Public()
  @Cron("0 0-23/1 * * *")
  async getUserCount(): Promise<any> {
    console.log(await this.usersService.getUserCount());
  }

  @Public()
  @Post('/init-order')
  async  initOrder(@Query('id', ParseIntPipe) id: number, @Body() createOrderDTO: createOrderDTO){
    return await this.usersService.initOrder(id, createOrderDTO)
  }
}
