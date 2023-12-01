import {
  PhoneSendCodeConfirmationCreateClientParamsDto,
  PhoneSendCodeConfirmationCreateClientServiceResponseDto,
} from '../dto/phone.send-code-confirmation-create-client.dto';

export const PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE =
  'PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE';

export interface PhoneSendCodeConfirmationCreateClientServiceInterface {
  execute(
    params: PhoneSendCodeConfirmationCreateClientParamsDto,
  ): Promise<PhoneSendCodeConfirmationCreateClientServiceResponseDto>;
}
