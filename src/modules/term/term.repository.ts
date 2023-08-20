import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from './term.entity';
import { TermRepositoryInterface } from './interfaces/term.repository.interface';

@Injectable()
export class TermRepository implements TermRepositoryInterface {
  constructor(
    @InjectRepository(Term)
    private termRepository: Repository<Term>,
  ) {}
  async findByVersion(version: string): Promise<Term | null> {
    return this.termRepository.findOne({ where: { version } });
  }
  async findById(id: string): Promise<Term | null> {
    return this.termRepository.findOne({ where: { id } });
  }
  async save(props: Partial<Term>): Promise<Term> {
    return this.termRepository.save(props);
  }
}
