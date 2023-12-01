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
  async findById(id: number): Promise<Term | null> {
    return this.termRepository.findOne({ where: { id } });
  }
  async findLatest(): Promise<Term> {
    const [last] = await this.termRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return last;
  }
  async save(props: Partial<Term>): Promise<Term> {
    return this.termRepository.save(props);
  }
}
