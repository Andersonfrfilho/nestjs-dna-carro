import { PhoneSendCodeConfirmationCreateClientParamsDto } from '../dto/phone.send-code-confirmation.dto';

export interface PhoneSendCodeConfirmationCreateClientInterface {
  execute(
    params: PhoneSendCodeConfirmationCreateClientParamsDto,
  ): Promise<void>;
}
