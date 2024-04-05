import { In, MigrationInterface, Not, QueryRunner } from 'typeorm';

import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../../modules/user/entities/user.entity';

export class SeedsClientsAppointments1690679684638
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appointments = await queryRunner.manager.find<Appointment>(
      'appointments',
    );
    const usersClients = await queryRunner.manager.find<User>('users', {
      where: {
        userTypesUsers: {
          userTypeId: Not(In([2])),
        },
      },
      relations: ['userTypesUsers'],
    });

    const appointmentsClients = appointments.map((appointment) => {
      const randomNumberClient = faker.number.int({
        min: 0,
        max: usersClients.length - 1,
      });
      return queryRunner.manager.create('appointments_clients', {
        appointmentId: appointment.id,
        clientId: usersClients[randomNumberClient].id,
        active: faker.datatype.boolean(),
      });
    });
    await queryRunner.manager.save(appointmentsClients);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('appointments_clients').delete({});
  }
}
