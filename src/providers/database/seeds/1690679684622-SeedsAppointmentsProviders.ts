import { faker } from '@faker-js/faker';
import { AppointmentStatus } from '../../../modules/appointment/appointment.constant';
import { User } from '../../../modules/user/entities/user.entity';
import { AppointmentFactory } from '../../../providers/factories/appointment.factory';
import { randomInt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedsAppointmentsProviders1690679684622
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersProviders = await queryRunner.manager.find<User>('users', {
      where: {
        userTypesUsers: {
          userTypeId: 2,
        },
      },
      relations: ['userTypesUsers'],
    });
    const appointments = usersProviders.map(async (user) => {
      const minQuantityAppointment = usersProviders.length;
      const maxQuantityAppointment = usersProviders.length * randomInt(2, 10);
      const appointmentsNumber = randomInt(
        minQuantityAppointment,
        maxQuantityAppointment,
      );

      const appointmentFactory = new AppointmentFactory();
      const appointmentsFakers = appointmentFactory.generate({
        quantity: appointmentsNumber,
      });
      const appointmentsInstance = appointmentsFakers.map((appointment) => {
        return queryRunner.manager.create('appointments', appointment);
      });
      await queryRunner.manager.save(appointmentsInstance);
      const appointmentProviders = appointmentsInstance.map((appointment) => {
        return queryRunner.manager.create('appointments_providers', {
          appointmentId: appointment.id,
          userId: user.id,
          active: faker.datatype.boolean(),
          status: faker.helpers.arrayElement(Object.values(AppointmentStatus)),
        });
      });
      await queryRunner.manager.save(appointmentProviders);
    });

    await Promise.all(appointments);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('appointments_providers')
      .delete({});
    await queryRunner.manager.getRepository('appointments').delete({});
  }
}
