import { SmsSendParamsDto } from './sms.dto';

export const SMS_PROVIDER = 'SMS_PROVIDER';

export interface SmsProviderInterface {
  send(params: SmsSendParamsDto): Promise<void>;
}
