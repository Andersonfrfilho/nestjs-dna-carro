import { Appointment } from '@src/modules/appointment/entities/appointment.entity';

import { IsString } from 'class-validator';

export class UserProviderGetAppointmentByIdParamsDto {
  @IsString({ message: 'appointmentId must be string' })
  appointmentId: string;
}

export class UserProviderGetAppointmentByIdServiceParamsDto extends UserProviderGetAppointmentByIdParamsDto {
  @IsString({ message: 'ProviderId must be a string' })
  providerId: string;
}
export class UserProviderGetAppointmentByIdControllerParamsDto extends UserProviderGetAppointmentByIdParamsDto {}

export class UserProviderGetAppointmentByIdServiceResultDto extends Appointment {}
