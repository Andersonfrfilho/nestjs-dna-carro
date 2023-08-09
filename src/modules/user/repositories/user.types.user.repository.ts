import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypesUser } from '@modules/user/entities/user.types.user.entity';
import { UserTypesUserRepositoryInterface } from '@modules/user/interfaces/repositories/user.types.user.repository.interface';

@Injectable()
export class UserTypesUserRepository
  implements UserTypesUserRepositoryInterface
{
  constructor(
    @InjectRepository(UserTypesUser)
    private userTypesUserRepository: Repository<UserTypesUser>,
  ) {}
  async save(props: Partial<UserTypesUser>): Promise<UserTypesUser> {
    return this.userTypesUserRepository.save(props);
  }
}
