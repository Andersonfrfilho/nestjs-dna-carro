import { Inject, Injectable } from '@nestjs/common';

import { CustomException } from '@src/error/custom.exception';

import { TermCreateServiceInterface } from '../interfaces/term.create.service.interface';
import {
  TERM_REPOSITORY,
  TermRepositoryInterface,
} from '../interfaces/term.repository.interface';
import { TermCreateParamsDto } from '../dto/term.create.dto';
import { TERM_VERSION_ALREADY_EXIST } from '../term.error';
import { Term } from '../term.entity';

@Injectable()
export class TermCreateService implements TermCreateServiceInterface {
  constructor(
    @Inject(TERM_REPOSITORY)
    private termRepository: TermRepositoryInterface,
  ) {}
  async execute({ version, description }: TermCreateParamsDto): Promise<Term> {
    const termFound = await this.termRepository.findByVersion(version);

    if (termFound) {
      throw new CustomException(TERM_VERSION_ALREADY_EXIST);
    }

    return this.termRepository.save({ version, description });
  }
}
