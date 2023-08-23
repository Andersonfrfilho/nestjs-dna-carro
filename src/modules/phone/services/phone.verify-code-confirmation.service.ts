import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@modules/user/interfaces/repositories/user.repository.interface';
import {
  PHONE_REPOSITORY,
  PhoneRepositoryInterface,
} from '../interfaces/phone.repository.interface';
import { PhoneVerifyCodeConfirmationServiceInterface } from '../interfaces/phone.verify-code-confirmation.interface';
import { PhoneVerifyCodeConfirmationServiceParamsDto } from '../dto/phone.verify-code-confirmation.dto';

@Injectable()
export class PhoneVerifyCodeConfirmationService
  implements PhoneVerifyCodeConfirmationServiceInterface
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(PHONE_REPOSITORY)
    private phoneRepository: PhoneRepositoryInterface,
  ) {}
  async execute(
    params: PhoneVerifyCodeConfirmationServiceParamsDto,
  ): Promise<void> {}
}
