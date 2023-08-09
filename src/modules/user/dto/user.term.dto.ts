import { IsUUID } from 'class-validator';
import { UserRelationshipDTO } from './user.dto';

export class UserTermDTO extends UserRelationshipDTO {
  @IsUUID()
  termId: string;
}
