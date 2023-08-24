import { IsUUID } from 'class-validator';
import { UserRelationshipDto } from './user.dto';

export class UserAddressDto extends UserRelationshipDto {
  @IsUUID()
  addressId: string;
}
