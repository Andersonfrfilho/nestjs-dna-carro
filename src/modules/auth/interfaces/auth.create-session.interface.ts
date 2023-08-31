import {
  AuthCreateSessionServiceParamsDto,
  AuthCreateSessionServiceResponse,
} from '../dtos/auth.create-session.dto';

export const AUTH_CREATE_SESSION_SERVICE = 'AUTH_CREATE_SESSION_SERVICE';
export interface AuthCreateSessionServiceInterface {
  execute(
    data: AuthCreateSessionServiceParamsDto,
  ): Promise<AuthCreateSessionServiceResponse>;
}
