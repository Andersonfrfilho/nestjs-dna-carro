import { IsUUID } from 'class-validator';
import { UserRelationshipDto } from './user.dto';

export class UserImageDto extends UserRelationshipDto {
  @IsUUID()
  imageId: string;
}
