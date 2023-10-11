import { AuthForgotPasswordPhoneResetServiceParamsDto } from '../dtos/auth.forgot-password-phone-reset.dto';

export const AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE =
  'AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE';

export interface AuthForgotPasswordPhoneResetServiceInterface {
  execute(data: AuthForgotPasswordPhoneResetServiceParamsDto): Promise<void>;
}
