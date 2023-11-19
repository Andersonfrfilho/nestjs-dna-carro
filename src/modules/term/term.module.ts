import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { TERM_REPOSITORY } from './interfaces/term.repository.interface';
import { TermRepository } from './term.repository';
import { TermController } from './term.controller';
import { TermCreateService } from './services/term.create.service';
import { TERM_CREATE_SERVICE } from './interfaces/term.create.service.interface';
import { TERM_GET_LAST_SERVICE } from './interfaces/term.get-last.service.interface';
import { TermGetLastService } from './services/term.get-last.service';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  providers: [
    {
      provide: TERM_REPOSITORY,
      useClass: TermRepository,
    },
    {
      provide: TERM_CREATE_SERVICE,
      useClass: TermCreateService,
    },
    {
      provide: TERM_GET_LAST_SERVICE,
      useClass: TermGetLastService,
    },
  ],
  controllers: [TermController],
  exports: [TERM_REPOSITORY],
})
export class TermModule {}
