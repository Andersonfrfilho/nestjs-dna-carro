import { UserGetTypesServiceParamsDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export const USER_GET_TYPES_SERVICE = 'USER_GET_TYPES_SERVICE';

export interface UserGetTypesServiceInterface {
  execute(params: UserGetTypesServiceParamsDto): Promise<User>;
}
