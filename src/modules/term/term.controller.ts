import { Body, Controller, Inject, Post } from '@nestjs/common';

import { TermCreateControllerParamsDto } from './dto/term.create.dto';
import {
  TERM_CREATE_SERVICE,
  TermCreateServiceInterface,
} from './interfaces/term.create.service.interface';
import { Term } from './term.entity';

@Controller('term')
export class TermController {
  constructor(
    @Inject(TERM_CREATE_SERVICE)
    private termCreateService: TermCreateServiceInterface,
  ) {}
  @Post()
  async create(
    @Body() createTerm: TermCreateControllerParamsDto,
  ): Promise<Term> {
    return this.termCreateService.execute(createTerm);
  }
}
