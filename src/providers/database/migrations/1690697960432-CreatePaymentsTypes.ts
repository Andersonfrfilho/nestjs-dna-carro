import { PaymentType } from '../../../modules/payments-types/payments-types.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { PaymentTypes } from '../../../modules/appointment/appointment.constant';

export class CreatePaymentsTypes1690697960432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<PaymentType>(PaymentType, {
        id: 1,
        active: true,
        name: PaymentTypes.credit,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<PaymentType>(PaymentType, {
        id: 2,
        active: true,
        name: PaymentTypes.debit,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<PaymentType>(PaymentType, {
        id: 3,
        active: true,
        name: PaymentTypes.money,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<PaymentType>(PaymentType, {
        id: 4,
        active: true,
        name: PaymentTypes.pix,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('payments_types');
  }
}
