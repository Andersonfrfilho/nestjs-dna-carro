import { IsNumber, IsString } from 'class-validator';
import { Termdto } from './term.dto';

export class TermRelationshipdto {
  @IsNumber()
  termId: number;
}

export class TermCreateDto extends Termdto {
  @IsString()
  version: string;

  @IsString()
  description: string;
}
