import { User } from '@src/modules/user/entities/user.entity';
import { ClientCreateServiceParamsDto } from '../dto/client.create.dto';

export interface ClientCreateServiceInterface {
  execute(params: ClientCreateServiceParamsDto): Promise<User>;
}
