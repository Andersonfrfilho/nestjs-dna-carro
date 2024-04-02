import { faker } from '@faker-js/faker';
import { User } from '../../../modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { random } from 'lodash';

export class SeedsServicesProvider1690679684634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersProviders = await queryRunner.manager.find<User>('users', {
      where: {
        userTypesUsers: {
          userTypeId: 2,
        },
      },
      relations: ['userTypesUsers'],
    });
    const MINIMUM_NUMBER_SERVICES = 1;
    const MAXIMUM_NUMBER_SERVICES = 10;
    const providerServicesProviderPromises = usersProviders.map(
      async (provider) => {
        const providerNumberServices = random(
          MINIMUM_NUMBER_SERVICES,
          MAXIMUM_NUMBER_SERVICES,
        );
        const providerServicesInstance = Array.from(
          { length: providerNumberServices },
          () => {
            return queryRunner.manager.create('services', {
              providerId: provider.id,
              name: faker.commerce.productName(),
              amount: faker.number.int(100),
              duration: faker.number.int(1000 * 60 * 15),
              active: faker.datatype.boolean(),
            });
          },
        );
        return queryRunner.manager.save(providerServicesInstance);
      },
    );

    await Promise.all(providerServicesProviderPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('providers_services').delete({});
  }
}
