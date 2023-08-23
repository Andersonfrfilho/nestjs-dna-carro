import { PhoneVerifyCodeConfirmationServiceParamsDto } from '../dto/phone.verify-code-confirmation.dto';

export interface PhoneVerifyCodeConfirmationServiceInterface {
  execute(params: PhoneVerifyCodeConfirmationServiceParamsDto): Promise<void>;
}
