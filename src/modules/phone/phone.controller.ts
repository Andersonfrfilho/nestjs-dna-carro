import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  PhoneSendCodeConfirmationCreateClientControllerParamsDto,
  PhoneSendCodeConfirmationCreateClientControllerResponseDto,
} from './dto/phone.send-code-confirmation-create-client.dto';
import {
  PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE,
  PhoneSendCodeConfirmationCreateClientServiceInterface,
} from './interfaces/phone.send-code-confirmation-create-client.interface';
import { PhoneVerifyCodeConfirmationCreateClientControllerParamsDto } from './dto/phone.verify-code-confirmation-create-client.dto';
import {
  PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE,
  PhoneVerifyCodeConfirmationCreateClientServiceInterface,
} from './interfaces/phone.verify-code-confirmation-create-client.interface';

@Controller('phone')
export class PhoneController {
  constructor(
    @Inject(PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE)
    private phoneSendCodeConfirmationCreateClient: PhoneSendCodeConfirmationCreateClientServiceInterface,
    @Inject(PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE)
    private phoneVerifyCodeConfirmationCreateClientService: PhoneVerifyCodeConfirmationCreateClientServiceInterface,
  ) {}
  @Post('/send/code/confirmation/create/client')
  async sendCodeConfirmationCreateClient(
    @Body()
    sendPhoneConfirmationsDto: PhoneSendCodeConfirmationCreateClientControllerParamsDto,
  ): Promise<PhoneSendCodeConfirmationCreateClientControllerResponseDto> {
    return this.phoneSendCodeConfirmationCreateClient.execute(
      sendPhoneConfirmationsDto,
    );
  }

  @Post('/verify/code/confirmation/create/client')
  async verifyCodeConfirmationCreateClient(
    @Body()
    verifyPhoneConfirmationsDto: PhoneVerifyCodeConfirmationCreateClientControllerParamsDto,
  ): Promise<void> {
    await this.phoneVerifyCodeConfirmationCreateClientService.execute(
      verifyPhoneConfirmationsDto,
    );
  }
}
