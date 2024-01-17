import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import { USER_NOT_FOUND } from '@src/modules/auth/auth.error';
import {
  USER_PROVIDER_REPOSITORY,
  UserProviderRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import { UserProviderAppointmentConfirmServiceInterface } from '../interfaces/user.provider.appointment-confirm.interface';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepositoryInterface,
} from '@src/modules/appointment/interfaces/appointment.interface';
import { UserProviderAppointmentConfirmServiceParamsDto } from '../dtos/user.provider.appointment-confirm.dto';
import {
  APPOINTMENT_NOT_FOUND,
  APPOINTMENT_NOT_HAS_PROVIDER,
} from '@src/modules/appointment/appointment.error';
import { PROVIDER_NOT_BELONGS_TO_APPOINTMENT } from '../user.provider.errors';

@Injectable()
export class UserProviderAppointmentConfirmService
  implements UserProviderAppointmentConfirmServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderAppointmentConfirmServiceParamsDto,
  ): Promise<void> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const appointment =
        await this.appointmentRepository.findByIdWithProviders(
          params.appointmentId,
        );

      if (!appointment) {
        throw new CustomException(APPOINTMENT_NOT_FOUND);
      }

      if (!appointment.appointmentProvider) {
        throw new CustomException(APPOINTMENT_NOT_HAS_PROVIDER);
      }

      const providerExistInAppointment = appointment?.appointmentProvider.some(
        (provider) => provider.providerId === params.providerId,
      );

      if (!providerExistInAppointment) {
        throw new CustomException(PROVIDER_NOT_BELONGS_TO_APPOINTMENT);
      }

      await this.appointmentRepository.update({
        id: appointment.id,
        confirm: true,
      });
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAppointmentConfirmService - execute - error',
        {
          error: error,
        },
      );
      throw error;
    }
  }
}
