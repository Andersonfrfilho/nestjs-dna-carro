import { Term } from '@modules/term/term.entity';

export const TERM_CREATE_SERVICE = 'TERM_CREATE_SERVICE';

export interface TermCreateServiceInterface {
  execute(props: Partial<Term>): Promise<Term>;
}
