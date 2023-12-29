import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentType } from './payments-types.entity';
import { PAYMENTS_TYPES_REPOSITORY } from './interfaces/payments-types.repository.interface';
import { PaymentTypeRepository } from './payments-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  providers: [
    {
      provide: PAYMENTS_TYPES_REPOSITORY,
      useClass: PaymentTypeRepository,
    },
  ],
  exports: [PAYMENTS_TYPES_REPOSITORY],
})
export class TypesUserModule {}
