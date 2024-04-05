import { MigrationInterface, QueryRunner } from 'typeorm';

import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { faker } from '@faker-js/faker';
import { PaymentType } from '../../../modules/payments-types/payments-types.entity';

export class SeedsPaymentTypesAppointments1690679684639
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appointments = await queryRunner.manager.find<Appointment>(
      'appointments',
    );
    const paymentsTypes = await queryRunner.manager.find<PaymentType>(
      'payments_types',
    );

    const appointmentsClients = appointments.map((appointment) => {
      const randomNumberPaymentTypes = faker.number.int({
        min: 0,
        max: paymentsTypes.length - 1,
      });
      return queryRunner.manager.create('appointments_payment_types', {
        appointmentId: appointment.id,
        paymentTypeId: paymentsTypes[randomNumberPaymentTypes].id,
        amount: faker.number.int({
          min: 100,
          max: 100000,
        }),
      });
    });
    await queryRunner.manager.save(appointmentsClients);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('appointments_payment_types')
      .delete({});
  }
}
