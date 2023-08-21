import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { PhoneSendCodeConfirmationServiceParamsDto } from '../dto/phone.send-code-confirmation.dto';
import { PhoneSendCodeConfirmationServiceInterface } from '../interfaces/phone.send-code-confirmation.service.interface';

@Injectable()
export class PhoneSendCodeConfirmationService
  implements PhoneSendCodeConfirmationServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(SMS_PROVIDER)
    private smsProvider: SMSProviderInterface,
  ) {}
  async execute(
    params: PhoneSendCodeConfirmationServiceParamsDto,
  ): Promise<void> {
    const;
    return '';
  }
}
