import { Inject, Injectable } from '@nestjs/common';
import {
  HTTP_INTERCEPTOR_PROVIDER,
  HttpInterceptorProviderInterface,
} from '../http/http.interceptor.interface';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import config from '@src/config';
import { SmsProviderInterface } from './sms.provider.interface';
import { SmsSendParamsDto } from './sms.dto';
import { firstValueFrom } from 'rxjs';
import { CustomException } from '@src/error/custom.exception';
import { SMS_ERROR } from './sms.error';

@Injectable()
export class SmsProvider implements SmsProviderInterface {
  private baseURL: string;
  private accountId: string;
  private authToken: string;
  private from: string;

  constructor(
    @Inject(HTTP_INTERCEPTOR_PROVIDER)
    private readonly httpInterceptorProvider: HttpInterceptorProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {
    this.baseURL = 'https://api.twilio.com/2010-04-01/Accounts';
    this.accountId = config.sms.accountId;
    this.authToken = config.sms.authToken;
    this.from = config.sms.number;
  }
  async send({ to, message }: SmsSendParamsDto): Promise<void> {
    const url = new URL(
      `${this.baseURL}/${this.accountId}/Messages.json`,
    ).toString();
    console.log(to);
    const params = new URLSearchParams({
      To: to,
      From: this.from,
      Body: message,
    });

    const auth = {
      auth: {
        username: this.accountId,
        password: this.authToken,
      },
    };
    try {
      await firstValueFrom(
        this.httpInterceptorProvider.post(url, params, auth),
      );
    } catch (error) {
      this.loggerProvider.error('SmsProvider - send', {
        response: error?.response?.data,
        requestPath: error?.request?.path,
        message: error?.message,
      });
      throw new CustomException(SMS_ERROR);
    }
  }
}
