import { MigrationInterface, QueryRunner } from 'typeorm';

import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { faker } from '@faker-js/faker';
import { AppointmentStatus } from '../../../modules/appointment/appointment.constant';

export class SeedsEventsAppointments1690679684640
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appointments = await queryRunner.manager.find<Appointment>(
      'appointments',
    );

    const appointmentsEvents = appointments
      .map((appointment) => {
        const randomNumberEvents = faker.number.int({
          min: 1,
          max: Object.values(AppointmentStatus).length,
        });

        const events = Array.from(
          { length: randomNumberEvents },
          (_, index) => {
            return queryRunner.manager.create('appointments_events', {
              appointmentId: appointment.id,
              status: Object.values(AppointmentStatus)[index],
              participant: faker.string.uuid(),
            });
          },
        );
        return events;
      })
      .reduce((acc, val) => acc.concat(val), []);
    console.log(appointmentsEvents);
    await queryRunner.manager.save(appointmentsEvents);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('appointments_events').delete({});
  }
}
