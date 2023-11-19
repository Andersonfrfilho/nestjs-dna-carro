import { Inject, Injectable } from '@nestjs/common';

import { CustomException } from '@src/error/custom.exception';

import {
  TERM_REPOSITORY,
  TermRepositoryInterface,
} from '../interfaces/term.repository.interface';
import { TERM_NOT_FOUND } from '../term.error';
import { Term } from '../term.entity';
import { TermGetLastServiceInterface } from '../interfaces/term.get-last.service.interface';

@Injectable()
export class TermGetLastService implements TermGetLastServiceInterface {
  constructor(
    @Inject(TERM_REPOSITORY)
    private termRepository: TermRepositoryInterface,
  ) {}
  async execute(): Promise<Term> {
    const last = await this.termRepository.findLatest();
    if (!last) {
      throw new CustomException(TERM_NOT_FOUND);
    }

    return last;
  }
}
