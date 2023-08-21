import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './phone.entity';
import { PhoneRepositoryInterface } from './interfaces/phone.repository.interface';
import { PhoneRepositoryParamsDto } from './phone.repository.dto';

@Injectable()
export class PhoneRepository implements PhoneRepositoryInterface {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}
  async findByCountryCodeDDDNumberUser({
    ddd,
    countryCode,
    number,
  }: PhoneRepositoryParamsDto): Promise<Phone | null> {
    return this.phoneRepository.findOne({
      where: {
        ddd,
        countryCode,
        number,
      },
      relations: ['users'],
    });
  }
  async save(props: Partial<Phone>): Promise<Phone> {
    return this.phoneRepository.save(props);
  }
}
