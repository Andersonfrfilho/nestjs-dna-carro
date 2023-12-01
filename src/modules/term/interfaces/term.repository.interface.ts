import { Term } from '@modules/term/term.entity';

export const TERM_REPOSITORY = 'TERM_REPOSITORY';

export interface TermRepositoryInterface {
  save(props: Partial<Term>): Promise<Term>;
  findById(id: number): Promise<Term | null>;
  findByVersion(version: string): Promise<Term | null>;
  findLatest(): Promise<Term>;
}
