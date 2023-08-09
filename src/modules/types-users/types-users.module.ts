import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesUser } from './types-users.entity';
import { TYPES_USER_REPOSITORY } from './interfaces/types-users.repository.interface';
import { TypesUserRepository } from './types-users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypesUser])],
  providers: [
    {
      provide: TYPES_USER_REPOSITORY,
      useClass: TypesUserRepository,
    },
  ],
  exports: [TYPES_USER_REPOSITORY],
})
export class TypesUserModule {}
