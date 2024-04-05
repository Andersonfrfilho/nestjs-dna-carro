import { faker } from '@faker-js/faker';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { random } from 'lodash';
import { AppointmentStatus } from '../../../modules/appointment/appointment.constant';
import {
  FIFTEEN_MINUTES,
  TWELVE_HOURS,
} from '../../../modules/common/commons.constants';
import { randomUUID } from 'crypto';
import { Provider } from '../../../modules/user/provider/entities/provider.entity';

export class SeedsAppointments1690679684635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersProviders = await queryRunner.manager.find<Provider>('users', {
      where: {
        userTypesUsers: {
          userTypeId: 2,
        },
      },
      relations: ['userTypesUsers', 'services'],
    });
    const MINIMUM_NUMBER_APPOINTMENTS = 1;
    const MAXIMUM_NUMBER_APPOINTMENTS = 10;
    const providerServicesProviderPromises = usersProviders.map(
      async (provider) => {
        const providerNumberAppointments = random(
          MINIMUM_NUMBER_APPOINTMENTS,
          MAXIMUM_NUMBER_APPOINTMENTS,
        );

        const appointmentsInstance = Array.from(
          { length: providerNumberAppointments },
          () => {
            return queryRunner.manager.create('appointments', {
              id: randomUUID(),
              initialDate: faker.date.past().getTime().toString(),
              finalDate: faker.date.past().getTime().toString(),
              confirm: faker.datatype.boolean(),
              duration: faker.number.int({
                min: FIFTEEN_MINUTES,
                max: TWELVE_HOURS,
              }),
              status: faker.helpers.arrayElement(
                Object.values(AppointmentStatus),
              ),
            });
          },
        );

        await queryRunner.manager.save(appointmentsInstance);

        const appointmentsProvidersInstance = appointmentsInstance.map(
          (appointment) => {
            return queryRunner.manager.create('appointments_providers', {
              providerId: provider.id,
              appointmentId: appointment.id,
              active: faker.datatype.boolean(),
              status: faker.helpers.arrayElement(
                Object.values(AppointmentStatus),
              ),
            });
          },
        );

        await queryRunner.manager.save(appointmentsProvidersInstance);

        if (provider?.services?.length && provider?.services?.length > 0) {
          const appointmentServices = appointmentsInstance.map(
            async (appointment) => {
              const servicesToAdd =
                provider.services &&
                faker.helpers.arrayElements(
                  provider.services,
                  random(1, provider?.services.length - 1),
                );
              const servicesToInstance = servicesToAdd?.map((service) => {
                return queryRunner.manager.create('appointments_services', {
                  serviceId: service.id,
                  appointmentId: appointment.id,
                });
              });
              return queryRunner.manager.save(servicesToInstance);
            },
          );
          await Promise.all(appointmentServices);
        }
      },
    );

    await Promise.all(providerServicesProviderPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('appointments_services').delete({});
    await queryRunner.manager
      .getRepository('appointments_providers')
      .delete({});
    await queryRunner.manager.getRepository('appointments').delete({});
  }
}
