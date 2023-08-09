import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTerm } from '@modules/user/entities/user.term.entity';
import { UserTermRepositoryInterface } from '@modules/user/interfaces/repositories/user.term.repository.interface';

@Injectable()
export class UserTermRepository implements UserTermRepositoryInterface {
  constructor(
    @InjectRepository(UserTerm)
    private userTermRepository: Repository<UserTerm>,
  ) {}
  async save(props: Partial<UserTerm>): Promise<UserTerm> {
    return this.userTermRepository.save(props);
  }
}
