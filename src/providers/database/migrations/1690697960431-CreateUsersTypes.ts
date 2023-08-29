import { TypesUsers } from '../../../modules/types-users/types-users.constant';
import { TypesUser } from '../../../modules/types-users/types-users.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTypes1690697960431 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<TypesUser>(TypesUser, {
        active: true,
        name: TypesUsers.client,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<TypesUser>(TypesUser, {
        active: true,
        name: TypesUsers.providers,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<TypesUser>(TypesUser, {
        active: true,
        name: TypesUsers.internal,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<TypesUser>(TypesUser, {
        active: true,
        name: TypesUsers.admin,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('types_users');
  }
}
