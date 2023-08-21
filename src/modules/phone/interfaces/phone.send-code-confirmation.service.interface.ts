import { PhoneSendCodeConfirmationServiceParamsDto } from '../dto/phone.send-code-confirmation.dto';

export interface PhoneSendCodeConfirmationServiceInterface {
  execute(params: PhoneSendCodeConfirmationServiceParamsDto): Promise<void>;
}
