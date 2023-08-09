import { IsUUID } from 'class-validator';
import { UserRelationshipDTO } from './user.dto';

export class UserTokenDTO extends UserRelationshipDTO {
  @IsUUID()
  tokenId: string;
}
