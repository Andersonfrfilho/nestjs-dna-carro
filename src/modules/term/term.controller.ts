import { Body, Controller, Inject, Post } from '@nestjs/common';

import { TermCreateControllerParamsDto } from './dto/term.create.dto';
import {
  TERM_CREATE_SERVICE,
  TermCreateServiceInterface,
} from './interfaces/term.create.service.interface';

@Controller('term')
export class ClientController {
  constructor(
    @Inject(TERM_CREATE_SERVICE)
    private termCreateService: TermCreateServiceInterface,
  ) {}
  @Post()
  async cacheCreate(
    @Body() createTerm: TermCreateControllerParamsDto,
  ): Promise<void> {
    await this.termCreateService.execute(createTerm);
  }
}
