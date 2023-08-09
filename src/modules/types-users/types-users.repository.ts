import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypesUserRepositoryInterface } from './interfaces/types-users.repository.interface';
import { TypesUser } from './types-users.entity';

@Injectable()
export class TypesUserRepository implements TypesUserRepositoryInterface {
  constructor(
    @InjectRepository(TypesUser)
    private typesUserRepository: Repository<TypesUser>,
  ) {}
  async findByName(name: string): Promise<TypesUser | null> {
    return this.typesUserRepository.findOne({
      where: {
        name,
      },
    });
  }
  async save(props: Partial<TypesUser>): Promise<TypesUser> {
    return this.typesUserRepository.save(props);
  }
}
