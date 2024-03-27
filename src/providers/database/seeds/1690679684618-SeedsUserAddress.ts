import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AddressFactory } from '../../../providers/factories/address.factory';
//1690679684616-UsersTable
export class SeedsUserAddress1690679684618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.manager.find('users');

    const addressFactory = new AddressFactory();
    const addresses = addressFactory.generate({
      quantity: users.length,
    });
    const addressInstance = addresses.map((address) => {
      return queryRunner.manager.create('addresses', address);
    });
    await queryRunner.manager.save(addressInstance);

    users.forEach(async (user, index) => {
      const addressUsers = queryRunner.manager.create('users_addresses', {
        userId: user.id,
        addressId: addressInstance[index].id,
        active: faker.datatype.boolean(),
      });
      await queryRunner.manager.save(addressUsers);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users_addresses').delete({});
    await queryRunner.manager.getRepository('addresses').delete({});
  }
}
