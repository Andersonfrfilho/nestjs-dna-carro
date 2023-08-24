import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from '@modules/user/entities/user.address.entity';
import { UserAddressRepositoryInterface } from '@modules/user/interfaces/repositories/user.address.repository.interface';

@Injectable()
export class UserAddressRepository implements UserAddressRepositoryInterface {
  constructor(
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
  ) {}
  async save(props: Partial<UserAddress>): Promise<UserAddress> {
    return this.userAddressRepository.save(props);
  }
}
