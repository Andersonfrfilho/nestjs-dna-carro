import { IsString } from 'class-validator';

export class UserProviderAppointmentConfirmParamsDto {
  @IsString({ message: 'appointmentId must be a string' })
  appointmentId: string;
}

export class UserProviderAppointmentConfirmServiceParamsDto extends UserProviderAppointmentConfirmParamsDto {
  @IsString({ message: 'ProviderId must be a string' })
  providerId: string;
}
export class UserProviderAppointmentConfirmControllerParamsDto extends UserProviderAppointmentConfirmParamsDto {}
