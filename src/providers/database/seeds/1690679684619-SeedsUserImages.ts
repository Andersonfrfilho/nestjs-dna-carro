import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ImagesFactory } from '../../../providers/factories/images.factory';

export class SeedsUserImages1690679684619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.manager.find('users');

    const imagesFactory = new ImagesFactory();
    const images = imagesFactory.generate({
      quantity: users.length,
      type: 'profile',
    });
    const imagesInstance = images.map((image) => {
      return queryRunner.manager.create('images', image);
    });

    await queryRunner.manager.save(imagesInstance);

    users.forEach(async (user, index) => {
      const imagesProfileUsers = queryRunner.manager.create(
        'users_profiles_images',
        {
          userId: user.id,
          userImageProfileId: imagesInstance[index].id,
          active: faker.datatype.boolean(),
        },
      );
      await queryRunner.manager.save(imagesProfileUsers);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users_profiles_images').delete({});
    await queryRunner.manager.getRepository('images').delete({
      where: {
        type: 'profile',
      },
    });
  }
}
