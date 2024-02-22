import { PaginationParamsDto } from '@src/modules/common/dtos/commons,pagination.dto';
import { AppointmentCreateServiceParamsDto } from '../dtos/appointment.create.dto';
import { Appointment } from '../entities/appointment.entity';
import { IsString } from 'class-validator';
import { AppointmentStatus } from '../appointment.constant';

export const APPOINTMENT_CREATE_SERVICE = 'APPOINTMENT_CREATE_SERVICE';

export interface AppointmentCreateServiceInterface {
  execute(data: AppointmentCreateServiceParamsDto): Promise<Appointment>;
}

export class FindByIdWithProvidersByStatusWithPaginationParamsDto extends PaginationParamsDto<Appointment> {}

export class FindByIdWithProvidersByStatusWithPaginationRepositoryParamsDto extends FindByIdWithProvidersByStatusWithPaginationParamsDto {
  @IsString({ message: 'ProviderId must be a string' })
  providerId: string;

  @IsString({ message: 'status required' })
  status: AppointmentStatus;
}

export class FindByIdWithProvidersByStatusWithPaginationRepositoryResultDto {
  data: Appointment[];
  total: number;
  page: string;
  size: string;
}
