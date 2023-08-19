import { IsNumber, IsString } from 'class-validator';

export class TermRelationshipDto {
  @IsNumber()
  termId: number;
}

export class TermDto {
  @IsString()
  version: string;

  @IsString()
  description: string;
}
