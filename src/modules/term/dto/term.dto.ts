import { IsNumber, IsString } from 'class-validator';

export class TermRelationshipdto {
  @IsNumber()
  termId: number;
}

export class Termdto {
  @IsString()
  version: string;

  @IsString()
  description: string;
}
