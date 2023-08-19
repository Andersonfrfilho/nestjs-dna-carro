import { IsUUID } from 'class-validator';
import { UserRelationshipDto } from './user.dto';

export class UserPhoneDto extends UserRelationshipDto {
  @IsUUID()
  phoneId: string;
}
