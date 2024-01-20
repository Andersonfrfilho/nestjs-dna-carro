import { Controller, Get, Inject } from '@nestjs/common';
import {
  USER_GET_TYPES_SERVICE,
  UserGetTypesServiceInterface,
} from './interfaces/user.get-types.interface';
import { UserGetTypesControllerResponseDto } from './dto/user.dto';
import { RequestUserId } from './decorators/request-user-id';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_GET_TYPES_SERVICE)
    private userGetTypesService: UserGetTypesServiceInterface,
  ) {}
  @Get('/types')
  async getTypes(
    @RequestUserId() userId: string,
  ): Promise<UserGetTypesControllerResponseDto> {
    return this.userGetTypesService.execute({ userId });
  }
}
