import { MigrationInterface, QueryRunner } from 'typeorm';
import { PhonesFactory } from '../../../providers/factories/phones.factory';
import { faker } from '@faker-js/faker';
//1690679684616-UsersTable
export class SeedsUserPhone1690679684617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.manager.find('users');

    const phonesFactory = new PhonesFactory();
    const phones = phonesFactory.generate({
      quantity: users.length,
    });
    const phoneInstance = phones.map((phone) => {
      return queryRunner.manager.create('phones', phone);
    });

    await queryRunner.manager.save(phoneInstance);

    users.forEach(async (user, index) => {
      const phoneUsers = queryRunner.manager.create('users_phones', {
        userId: user.id,
        phoneId: phoneInstance[index].id,
        confirm: faker.datatype.boolean(),
        active: faker.datatype.boolean(),
      });
      await queryRunner.manager.save(phoneUsers);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users_phones').delete({});
    await queryRunner.manager.getRepository('phones').delete({});
  }
}
