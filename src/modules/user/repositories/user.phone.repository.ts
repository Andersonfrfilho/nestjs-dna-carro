import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPhone } from '@modules/user/entities/user.phone.entity';
import { UserPhoneRepositoryInterface } from '@modules/user/interfaces/repositories/user.phone.repository.interface';

@Injectable()
export class UserPhoneRepository implements UserPhoneRepositoryInterface {
  constructor(
    @InjectRepository(UserPhone)
    private userPhoneRepository: Repository<UserPhone>,
  ) {}
  async save({
    active,
    confirm,
    userId,
    phoneId,
  }: Partial<UserPhone>): Promise<UserPhone> {
    return this.userPhoneRepository.save({
      active,
      confirm,
      phoneId,
      userId,
    });
  }
}
