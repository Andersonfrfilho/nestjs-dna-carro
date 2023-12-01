import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { TermCreateControllerParamsDto } from './dto/term.create.dto';
import {
  TERM_CREATE_SERVICE,
  TermCreateServiceInterface,
} from './interfaces/term.create.service.interface';
import { Term } from './term.entity';
import {
  TERM_GET_LAST_SERVICE,
  TermGetLastServiceInterface,
} from './interfaces/term.get-last.service.interface';

@Controller('term')
export class TermController {
  constructor(
    @Inject(TERM_CREATE_SERVICE)
    private termCreateService: TermCreateServiceInterface,
    @Inject(TERM_GET_LAST_SERVICE)
    private termGetLastService: TermGetLastServiceInterface,
  ) {}
  @Post('/')
  async create(
    @Body() createTerm: TermCreateControllerParamsDto,
  ): Promise<Term> {
    return this.termCreateService.execute(createTerm);
  }

  @Get('/last')
  async getLast(): Promise<Term> {
    return this.termGetLastService.execute();
  }
}
