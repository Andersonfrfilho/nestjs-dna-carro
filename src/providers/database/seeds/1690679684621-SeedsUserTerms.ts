import { MigrationInterface, QueryRunner } from 'typeorm';
import { Term } from '../../../modules/term/term.entity';
import { faker } from '@faker-js/faker';

export class SeedsUserTerms1690679684621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.manager.find('users');
    const term: Term = {
      id: 1,
      description: 'term',
      active: true,
      version: '1.0.0',
    };
    const termInstance = queryRunner.manager.create('terms', term);
    await queryRunner.manager.save(termInstance);

    users.forEach(async (user, index) => {
      const userTerm = queryRunner.manager.create('users_terms', {
        userId: user.id,
        termId: termInstance.id,
        accept: faker.datatype.boolean(),
      });
      await queryRunner.manager.save(userTerm);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users_terms').delete({});
    await queryRunner.manager.getRepository('terms').delete({});
  }
}
