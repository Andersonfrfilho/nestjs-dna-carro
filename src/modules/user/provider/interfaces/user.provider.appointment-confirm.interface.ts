import { UserProviderAppointmentConfirmServiceParamsDto } from '../dtos/user.provider.appointment-confirm.dto';

export const USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE =
  'USER_PROVIDER_CONFIRM_SERVICE';

export interface UserProviderAppointmentConfirmServiceInterface {
  execute(
    params: UserProviderAppointmentConfirmServiceParamsDto,
  ): Promise<void>;
}
