import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

export class SeedsUsersTypes1690679684620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const types_users = await queryRunner.manager
      .getRepository('types_users')
      .find();
    const users = await queryRunner.manager.find('users');

    users.forEach(async (user, index) => {
      const numberRandom = randomInt(0, types_users.length - 1);
      const newArrayTypes = Array.from({ length: numberRandom }).map(
        async (item, indexParam) => {
          const typeUser = types_users[indexParam];
          const userType = queryRunner.manager.create('users_types_users', {
            userId: user.id,
            userTypeId: typeUser.id,
            active: faker.datatype.boolean(),
          });
          return queryRunner.manager.save(userType);
        },
      );
      await Promise.all(newArrayTypes);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users_profiles_images').delete({
      where: {
        name: 'profile',
      },
    });
    await queryRunner.manager.getRepository('images').delete({});
  }
}
