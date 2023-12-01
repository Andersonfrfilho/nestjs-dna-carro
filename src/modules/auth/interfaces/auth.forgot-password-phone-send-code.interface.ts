import { AuthForgotPasswordPhoneSendCodeServiceParamsDto } from '../dtos/auth.forgot-password-phone-send-code.dto';

export const AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE =
  'AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE';

export interface AuthForgotPasswordPhoneSendCodeServiceInterface {
  execute(data: AuthForgotPasswordPhoneSendCodeServiceParamsDto): Promise<void>;
}
