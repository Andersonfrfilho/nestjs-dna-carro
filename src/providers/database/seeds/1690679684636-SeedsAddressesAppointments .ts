import { MigrationInterface, QueryRunner } from 'typeorm';

import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { AddressFactory } from '../../../providers/factories/address.factory';
import { faker } from '@faker-js/faker';

export class SeedsAddressesAppointments1690679684636
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appointments = await queryRunner.manager.find<Appointment>(
      'appointments',
    );
    const addressFactory = new AddressFactory();
    const addresses = addressFactory.generate({
      quantity: appointments.length,
    });
    const addressesInstance = addresses.map((address) => {
      return queryRunner.manager.create('addresses', address);
    });
    await queryRunner.manager.save(addressesInstance);

    const appointmentsProviders = appointments.map((appointment, index) => {
      return queryRunner.manager.create('appointments_addresses', {
        appointmentId: appointment.id,
        addressId: addressesInstance[index].id,
        amount: faker.number.int({
          min: 100,
          max: 1000,
        }),
      });
    });

    await queryRunner.manager.save(appointmentsProviders);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('appointments_addresses')
      .delete({});
  }
}
