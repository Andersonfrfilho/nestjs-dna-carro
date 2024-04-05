import { en, faker } from '@faker-js/faker';
import { User } from '../../../modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD } from '../../../modules/user/provider/user.provider.constant';
import { randomInt } from 'crypto';
import { reducePeriodsByIntervalsBetween } from '../../../utils/reduceTimePeriods';

export class SeedsAvailabilitiesHoursProviders1690679684622
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
    const MINIMUM_HOURS_PER_DAY = 4;
    const providerHoursAvailablePromises = usersProviders.map(
      async (provider) => {
        let randomNumberSelect = randomInt(
          MINIMUM_HOURS_PER_DAY,
          Object.values(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD).length - 8,
        );

        if (randomNumberSelect % 2 !== 0) {
          randomNumberSelect += 1;
        }

        const hours = faker.helpers.arrayElements(
          Object.values(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD),
          randomNumberSelect,
        );
        const formattedHours = reducePeriodsByIntervalsBetween(hours);
        const providerDaysAvailableInstance = formattedHours.map((hour) => {
          return queryRunner.manager.create('providers_availabilities_hours', {
            providerId: provider.id,
            start: hour.start,
            end: hour.end ?? '23:59',
          });
        });
        return queryRunner.manager.save(providerDaysAvailableInstance);
      },
    );

    await Promise.all(providerHoursAvailablePromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('providers_availabilities_hours')
      .delete({});
  }
}
