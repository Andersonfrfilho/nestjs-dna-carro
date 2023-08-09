import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { TERM_REPOSITORY } from './interfaces/term.repository.interface';
import { TermRepository } from './term.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  providers: [
    {
      provide: TERM_REPOSITORY,
      useClass: TermRepository,
    },
  ],
  exports: [TERM_REPOSITORY],
})
export class TermModule {}
