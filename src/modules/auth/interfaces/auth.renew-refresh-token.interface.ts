import {
  AuthRenewRefreshTokenServiceParamsDto,
  AuthRenewRefreshTokenServiceResponse,
} from '../dtos/auth.renew-refresh-token.dto';

export const AUTH_RENEW_REFRESH_TOKEN_SERVICE =
  'AUTH_RENEW_REFRESH_TOKEN_SERVICE';

export interface AuthRenewRefreshTokenServiceInterface {
  execute(
    data: AuthRenewRefreshTokenServiceParamsDto,
  ): Promise<AuthRenewRefreshTokenServiceResponse>;
}
