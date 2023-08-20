import { Term } from '@modules/term/term.entity';
import { TermCreateServiceParamsDto } from '../dto/term.create.dto';

export const TERM_CREATE_SERVICE = 'TERM_CREATE_SERVICE';

export interface TermCreateServiceInterface {
  execute(props: TermCreateServiceParamsDto): Promise<Term>;
}
