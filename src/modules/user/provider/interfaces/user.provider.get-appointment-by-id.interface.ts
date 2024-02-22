import {
  UserProviderGetAppointmentByIdServiceParamsDto,
  UserProviderGetAppointmentByIdServiceResultDto,
} from '../dtos/user.provider.get-appointment-by-id.dto';

export const USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE =
  'USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE';

export interface UserProviderGetAppointmentByIdServiceInterface {
  execute(
    params: UserProviderGetAppointmentByIdServiceParamsDto,
  ): Promise<UserProviderGetAppointmentByIdServiceResultDto>;
}
