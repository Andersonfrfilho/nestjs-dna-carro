import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
