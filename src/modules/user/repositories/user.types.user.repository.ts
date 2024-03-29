import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypesUser } from '@modules/user/entities/user.types.user.entity';
import { UserTypesUserRepositoryInterface } from '@modules/user/interfaces/repositories/user.types.user.repository.interface';
import { USER_PROVIDER_TYPE_ID } from './constants/user-types-users.constant';

@Injectable()
export class UserTypesUserRepository
  implements UserTypesUserRepositoryInterface
{
  constructor(
    @InjectRepository(UserTypesUser)
    private userTypesUserRepository: Repository<UserTypesUser>,
  ) {}
  async findTypesUserByIdAndActive(
    userId: string,
  ): Promise<UserTypesUser | null> {
    return this.userTypesUserRepository.findOne({
      where: {
        userId: userId,
        userTypeId: USER_PROVIDER_TYPE_ID,
        active: true,
      },
    });
  }

  async disableUserTypeUserByUserId(props: UserTypesUser): Promise<void> {
    await this.userTypesUserRepository.update(props.id, {
      active: false,
    });
  }

  async findTypesUserById(id: string): Promise<UserTypesUser[]> {
    return this.userTypesUserRepository.find({
      where: {
        userId: id,
      },
    });
  }
  async createUserProvider(
    props: Partial<UserTypesUser>,
  ): Promise<UserTypesUser> {
    return this.userTypesUserRepository.save({
      ...props,
      userTypeId: USER_PROVIDER_TYPE_ID,
    });
  }
  async save(props: Partial<UserTypesUser>): Promise<UserTypesUser> {
    return this.userTypesUserRepository.save(props);
  }
}
