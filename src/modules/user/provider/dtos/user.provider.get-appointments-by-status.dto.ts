import { AppointmentStatus } from '@src/modules/appointment/appointment.constant';
import { Appointment } from '@src/modules/appointment/entities/appointment.entity';
import {
  PaginationParamsDto,
  PaginationResultDto,
} from '@src/modules/common/dtos/commons,pagination.dto';
import { IsString } from 'class-validator';

export class UserProviderGetAppointmentsByStatusParamsDto extends PaginationParamsDto<Appointment> {}

export class UserProviderGetAppointmentsByStatusServiceParamsDto extends UserProviderGetAppointmentsByStatusParamsDto {
  @IsString({ message: 'ProviderId must be a string' })
  providerId: string;

  @IsString({ message: 'status required' })
  status: AppointmentStatus;

  @IsString({ message: 'url must be string' })
  url: string;
}
export class UserProviderGetAppointmentsByStatusControllerParamsDto extends UserProviderGetAppointmentsByStatusParamsDto {
  @IsString({ message: 'status required' })
  status: AppointmentStatus;
}

export class UserProviderGetAppointmentByStatusServiceResultDto extends PaginationResultDto<Appointment> {}
