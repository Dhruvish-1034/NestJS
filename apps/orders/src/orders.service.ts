import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/src/typeORM/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async getUsers(): Promise<any>{
    try{
      const users =  await this.userModel.find({})

      if(users?.length === 0){
        throw new HttpException('No User Found', HttpStatus.NO_CONTENT)
      }

      return users
    }catch(err){
      if(err?.message){
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
      }else{
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
