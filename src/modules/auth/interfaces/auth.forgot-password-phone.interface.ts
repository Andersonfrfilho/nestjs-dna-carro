import { AuthForgotPasswordPhoneServiceParamsDto } from '../dtos/auth.forgot-password-phone.dto';

export const AUTH_FORGOT_PASSWORD_PHONE_SERVICE =
  'AUTH_FORGOT_PASSWORD_PHONE_SERVICE';

export interface AuthForgotPasswordPhoneServiceInterface {
  execute(data: AuthForgotPasswordPhoneServiceParamsDto): Promise<void>;
}
