import { IsUUID } from 'class-validator';
import { UserRelationshipDto } from './user.dto';

export class UserTokenDto extends UserRelationshipDto {
  @IsUUID()
  tokenId: string;
}
