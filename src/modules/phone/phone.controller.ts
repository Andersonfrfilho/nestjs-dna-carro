import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PHONE_SEND_CODE_CONFIRMATION } from '@src/providers/sms/sms.constant';
import { PhoneSendCodeConfirmationCreateClientInterface } from './interfaces/phone.send-code-confirmation.service.interface';
import { PhoneSendCodeConfirmationCreateClientControllerParamsDto } from './dto/phone.send-code-confirmation.dto';

@Controller('phone')
export class PhoneController {
  constructor(
    @Inject(PHONE_SEND_CODE_CONFIRMATION)
    private phoneSendCodeConfirmationCreateClient: PhoneSendCodeConfirmationCreateClientInterface,
  ) {}
  @Post('/send/code/confirmation/create/client')
  async create(
    @Body()
    sendPhoneConfirmationsDto: PhoneSendCodeConfirmationCreateClientControllerParamsDto,
  ): Promise<void> {
    await this.phoneSendCodeConfirmationCreateClient.execute(
      sendPhoneConfirmationsDto,
    );
  }
}
