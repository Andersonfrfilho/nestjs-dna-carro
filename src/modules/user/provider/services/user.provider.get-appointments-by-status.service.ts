import { Inject, Injectable } from '@nestjs/common';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { Appointment } from '@src/modules/appointment/entities/appointment.entity';
import { formatPaginationResults } from '@src/modules/common/utils/formatPagination';
import { instanceToPlain } from 'class-transformer';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepositoryInterface,
} from '@src/modules/appointment/interfaces/appointment.repository.interface';
import {
  UserProviderGetAppointmentByStatusServiceResultDto,
  UserProviderGetAppointmentsByStatusServiceParamsDto,
} from '../dtos/user.provider.get-appointments-by-status.dto';
import { UserProviderGetAppointmentsByStatusServiceInterface } from '../interfaces/user.provider.get-appointments-by-status.interface';

@Injectable()
export class UserProviderGetAppointmentsByStatusService
  implements UserProviderGetAppointmentsByStatusServiceInterface
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderGetAppointmentsByStatusServiceParamsDto,
  ): Promise<UserProviderGetAppointmentByStatusServiceResultDto> {
    try {
      const appointments =
        await this.appointmentRepository.findByIdWithProvidersByStatusWithPagination(
          params,
        );

      const formattedAppointments = instanceToPlain<Appointment[]>(
        appointments.data,
      ) as Appointment[];

      const formatPagination = formatPaginationResults<Appointment>({
        ...appointments,
        data: formattedAppointments,
        url: params.url,
      });

      return formatPagination;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderGetAppointmentsByStatusService - execute - error',
        {
          error: { ...error, params },
          params,
        },
      );
      throw error;
    }
  }
}
