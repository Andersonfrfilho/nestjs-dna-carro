import { IsUUID } from 'class-validator';
import { UserRelationshipDTO } from './user.dto';

export class UserPhoneDTO extends UserRelationshipDTO {
  @IsUUID()
  phoneId: string;
}
