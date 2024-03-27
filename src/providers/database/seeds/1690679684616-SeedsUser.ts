import { UsersFactory } from '../../../providers/factories/user.factory';
import { randomInt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';
//1690679684616-UsersTable
export class SeedsUser1690679684616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const types_users = await queryRunner.manager
      .getRepository('types_users')
      .find();
    const min = types_users.length * 10;
    const max = 1000;
    const usersNumber = randomInt(min, max);
    const userFactory = new UsersFactory();
    const usersFaker = userFactory.generate({
      quantity: usersNumber,
    });
    const usersInstance = usersFaker.map((user) => {
      return queryRunner.manager.create('users', {
        ...user,
        passwordHash: '123123124123',
      });
    });

    await queryRunner.manager.save(usersInstance);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users').delete({});
  }
}
