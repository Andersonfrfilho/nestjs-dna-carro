import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressRepositoryInterface } from './interfaces/address.repository.interface';

@Injectable()
export class AddressRepository implements AddressRepositoryInterface {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async save(props: Partial<Address>): Promise<Address> {
    return this.addressRepository.save(props);
  }
}
