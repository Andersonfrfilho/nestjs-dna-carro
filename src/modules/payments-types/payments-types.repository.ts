import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from './payments-types.entity';
import { PaymentTypeRepositoryInterface } from './interfaces/payments-types.repository.interface';

@Injectable()
export class PaymentTypeRepository implements PaymentTypeRepositoryInterface {
  constructor(
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>,
  ) {}
  async findByName(name: string): Promise<PaymentType | null> {
    return this.paymentTypeRepository.findOne({
      where: {
        name,
      },
    });
  }
}
