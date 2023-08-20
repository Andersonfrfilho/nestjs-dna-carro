import { IsUUID } from 'class-validator';
import { UserRelationshipDto } from './user.dto';

export class UserTermDto extends UserRelationshipDto {
  @IsUUID()
  termId: string;
}
