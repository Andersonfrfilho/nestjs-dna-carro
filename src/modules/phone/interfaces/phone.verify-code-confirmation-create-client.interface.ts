import { PhoneVerifyCodeConfirmationCreateClientServiceParamsDto } from '../dto/phone.verify-code-confirmation-create-client.dto';

export const PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE =
  'PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE';

export interface PhoneVerifyCodeConfirmationCreateClientServiceInterface {
  execute(
    params: PhoneVerifyCodeConfirmationCreateClientServiceParamsDto,
  ): Promise<void>;
}
