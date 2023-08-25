import { Inject, Injectable } from '@nestjs/common';

import { CustomException } from '@src/error/custom.exception';

import { TermCreateServiceInterface } from '../interfaces/term.create.service.interface';
import {
  TERM_REPOSITORY,
  TermRepositoryInterface,
} from '../interfaces/term.repository.interface';
import { TERM_VERSION_ALREADY_EXIST } from '../term.error';
import { Term } from '../term.entity';
import { TermCreateServiceParamsDto } from '../dto/term.create.dto';

@Injectable()
export class TermCreateService implements TermCreateServiceInterface {
  constructor(
    @Inject(TERM_REPOSITORY)
    private termRepository: TermRepositoryInterface,
  ) {}
  async execute({
    version,
    description,
    active,
  }: TermCreateServiceParamsDto): Promise<Term> {
    const termFound = await this.termRepository.findByVersion(version);
    if (termFound) {
      throw new CustomException(TERM_VERSION_ALREADY_EXIST);
    }

    return this.termRepository.save({ version, description, active });
  }
}
