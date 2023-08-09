import { IsUUID } from 'class-validator';
import { UserRelationshipDTO } from './user.dto';

export class UserImageDTO extends UserRelationshipDTO {
  @IsUUID()
  imageId: string;
}
