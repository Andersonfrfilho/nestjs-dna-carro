import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AuthCreateSessionControllerParamsDto,
  AuthCreateSessionResponseDto,
} from './dtos/auth.create-session.dto';
import {
  AUTH_CREATE_SESSION_SERVICE,
  AuthCreateSessionServiceInterface,
} from './interfaces/auth.create-session.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_CREATE_SESSION_SERVICE)
    private authCreateSessionService: AuthCreateSessionServiceInterface,
  ) {}
  @Post('/session')
  async cacheCreate(
    @Body() authCreateSessionParams: AuthCreateSessionControllerParamsDto,
  ): Promise<AuthCreateSessionResponseDto> {
    return this.authCreateSessionService.execute(authCreateSessionParams);
  }
}
