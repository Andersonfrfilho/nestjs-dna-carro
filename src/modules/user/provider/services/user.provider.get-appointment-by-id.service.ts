import { Inject, Injectable } from '@nestjs/common';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { Appointment } from '@src/modules/appointment/entities/appointment.entity';
import { instanceToPlain } from 'class-transformer';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepositoryInterface,
} from '@src/modules/appointment/interfaces/appointment.repository.interface';
import {
  UserProviderGetAppointmentByIdServiceParamsDto,
  UserProviderGetAppointmentByIdServiceResultDto,
} from '../dtos/user.provider.get-appointment-by-id.dto';
import { UserProviderGetAppointmentByIdServiceInterface } from '../interfaces/user.provider.get-appointment-by-id.interface';
import { CustomException } from '@src/error/custom.exception';
import { APPOINTMENT_NOT_FOUND } from '@src/modules/appointment/appointment.error';

@Injectable()
export class UserProviderGetAppointmentByIdService
  implements UserProviderGetAppointmentByIdServiceInterface
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderGetAppointmentByIdServiceParamsDto,
  ): Promise<UserProviderGetAppointmentByIdServiceResultDto> {
    try {
      const appointment = await this.appointmentRepository.findByIdProviderId({
        id: params.appointmentId,
        providerId: params.providerId,
      });

      if (!appointment) {
        throw new CustomException(APPOINTMENT_NOT_FOUND);
      }

      const formattedAppointment = instanceToPlain<Appointment>(
        appointment,
      ) as Appointment;

      return formattedAppointment;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAppointmentStatusService - execute - error',
        {
          error: { ...error, params },
        },
      );
      throw error;
    }
  }
}
