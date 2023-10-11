import { AuthForgotPasswordPhoneVerifyCodeServiceParamsDto } from '../dtos/auth.forgot-password-phone-verify-code.dto';

export const AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE =
  'AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE';

export interface AuthForgotPasswordPhoneVerifyCodeServiceInterface {
  execute(
    data: AuthForgotPasswordPhoneVerifyCodeServiceParamsDto,
  ): Promise<void>;
}
