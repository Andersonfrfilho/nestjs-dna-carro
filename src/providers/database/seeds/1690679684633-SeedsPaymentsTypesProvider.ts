import { faker } from '@faker-js/faker';
import { PaymentType } from '../../../modules/payments-types/payments-types.entity';
import { User } from '../../../modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { random } from 'lodash';

export class SeedsPaymentsTypesProvider1690679684633
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

    const paymentTypes = await queryRunner.manager.find<PaymentType>(
      'payments_types',
    );

    const providerPaymentsTypesProviderPromises = usersProviders.map(
      async (provider) => {
        const providerDaysAvailable = faker.helpers.arrayElements(
          paymentTypes,
          random(1, paymentTypes.length - 1),
        );
        const providerDaysAvailableInstance = providerDaysAvailable.map(
          (paymentType) => {
            return queryRunner.manager.create('providers_payments_types', {
              providerId: provider.id,
              paymentTypeId: paymentType.id,
            });
          },
        );
        return queryRunner.manager.save(providerDaysAvailableInstance);
      },
    );

    await Promise.all(providerPaymentsTypesProviderPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('provider_payments_types')
      .delete({});
  }
}
