import {
  UserProviderGetAppointmentByStatusServiceResultDto,
  UserProviderGetAppointmentsByStatusServiceParamsDto,
} from '../dtos/user.provider.get-appointments-by-status.dto';

export const USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE =
  'USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE';

export interface UserProviderGetAppointmentsByStatusServiceInterface {
  execute(
    params: UserProviderGetAppointmentsByStatusServiceParamsDto,
  ): Promise<UserProviderGetAppointmentByStatusServiceResultDto>;
}
