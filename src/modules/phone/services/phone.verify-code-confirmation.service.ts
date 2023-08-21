import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@modules/user/interfaces/repositories/user.repository.interface';

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
  ): Promise<void> {
    return '';
  }
}
