import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../src/typeORM/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Query {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async withActiveStatus(id: number): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.status = :status', { status: 'Active' })
      .andWhere('user.id = :id', { id })
      .getOne();
  }
}
