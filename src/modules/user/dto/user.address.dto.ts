import { IsUUID } from 'class-validator';
import { UserRelationshipDTO } from './user.dto';

export class UserAddressDTO extends UserRelationshipDTO {
  @IsUUID()
  addressId: string;
}
