import { faker } from '@faker-js/faker';
import { AppointmentStatus } from '../../../modules/appointment/appointment.constant';
import { User } from '../../../modules/user/entities/user.entity';
import { AppointmentFactory } from '../../../providers/factories/appointment.factory';
import { randomInt } from 'crypto';
import { MigrationInterface, Not, QueryRunner } from 'typeorm';

export class SeedsAppointmentsClients1690679684623
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersClients = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('foundUsersClients')
      .leftJoinAndSelect('foundUsersClients.userTypesUsers', 'userTypesUsers')
      .andWhere('userTypesUsers.userTypeId != :userTypeId', { userTypeId: 2 })
      .andWhere('userTypesUsers.userTypeId != :userTypeId', { userTypeId: 3 })
      .andWhere('userTypesUsers.userTypeId != :userTypeId', { userTypeId: 4 })
      .getMany();
    const appointments = queryRunner.manager.find('appointments');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository('appointments_providers')
      .delete({});
    await queryRunner.manager.getRepository('appointments').delete({});
  }
}
