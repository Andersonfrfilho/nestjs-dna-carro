import { Term } from '@modules/term/term.entity';

export const TERM_GET_LAST_SERVICE = 'TERM_GET_LAST_SERVICE';

export interface TermGetLastServiceInterface {
  execute(): Promise<Term>;
}
