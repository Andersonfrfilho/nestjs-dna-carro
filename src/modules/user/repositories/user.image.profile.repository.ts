import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserImageProfile } from '@modules/user/entities/user.image.profile.entity';
import { UserImageProfileRepositoryInterface } from '@modules/user/interfaces/repositories/user.image.profile.repository.interface';

@Injectable()
export class UserImageProfileRepository
  implements UserImageProfileRepositoryInterface
{
  constructor(
    @InjectRepository(UserImageProfile)
    private userImageRepository: Repository<UserImageProfile>,
  ) {}
  async save(props: Partial<UserImageProfile>): Promise<UserImageProfile> {
    return this.userImageRepository.save(props);
  }
}
