import { Inject, Injectable } from '@nestjs/common';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { AppointmentCreateServiceInterface } from '../interfaces/appointment.create.interface';
import {
  AppointmentCreateServiceParamsDto,
  AppointmentCreateServiceResultDto,
} from '../dtos/appointment.create.dto';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepositoryInterface,
} from '../interfaces/appointment.repository.interface';

@Injectable()
export class AppointmentCreateSessionService
  implements AppointmentCreateServiceInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepositoryInterface,
  ) {}
  async execute(
    params: AppointmentCreateServiceParamsDto,
  ): Promise<AppointmentCreateServiceResultDto> {
    try {
      const appointment = await this.appointmentRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error(
        'AppointmentCreateSessionService - execute - error',
        {
          error: error.message,
        },
      );

      throw error;
    }
  }
}
