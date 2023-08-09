import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToken } from '@modules/user/entities/user.token.entity';
import { UserTokenRepositoryInterface } from '@modules/user/interfaces/repositories/user.token.repository.interface';

@Injectable()
export class UserTokenRepository implements UserTokenRepositoryInterface {
  constructor(
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
  ) {}
  async save(props: Partial<UserToken>): Promise<UserToken> {
    return this.userTokenRepository.save(props);
  }
}
