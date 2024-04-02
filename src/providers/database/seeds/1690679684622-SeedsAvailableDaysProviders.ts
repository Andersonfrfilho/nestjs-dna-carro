import { faker } from '@faker-js/faker';
import { User } from '../../../modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { DAYS_WEEK } from '../../../modules/user/provider/user.provider.constant';
import { random } from 'lodash';

export class SeedsAvailabilitiesDaysProviders1690679684622
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

    const providerDaysAvailablePromises = usersProviders.map(
      async (provider) => {
        const providerDaysAvailable = faker.helpers.arrayElements<DAYS_WEEK>(
          Object.values(DAYS_WEEK),
          random(1, Object.values(DAYS_WEEK).length - 1),
        );
        const providerDaysAvailableInstance = providerDaysAvailable.map(
          (day) => {
            return queryRunner.manager.create('providers_availabilities_days', {
              providerId: provider.id,
              day,
            });
          },
        );
        return queryRunner.manager.save(providerDaysAvailableInstance);
      },
    );

    await Promise.all(providerDaysAvailablePromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('provider_availabilities_days')
      .delete({});
  }
}
