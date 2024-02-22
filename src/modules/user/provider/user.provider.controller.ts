import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  USER_PROVIDER_CREATE_SERVICE,
  UserProviderCreateServiceInterface,
} from './interfaces/user.provider.create.interface';
import { UserProviderCreateControllerParamsDto } from './dtos/user.provider.create.dto';
import { UserProviderInternalDisableControllerParamsDto } from './dtos/user.provider.internal-disable.dto';
import {
  USER_PROVIDER_INTERNAL_DISABLE_SERVICE,
  UserProviderInternalDisableServiceInterface,
} from './interfaces/user.provider.internal-disable.interface';

import {
  USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
  UserProviderHoursAvailableServiceInterface,
} from './interfaces/user.provider.hours-available.interface';
import { RequestUserProviderId } from './decorators/request-user-provider-id';
import { UserProviderHoursAvailableControllerBodyParamsDto } from './dtos/user.provider.hours-available.dto';
import {
  USER_PROVIDER_CREATE_SERVICE_SERVICE,
  USER_PROVIDER_DISABLE_SERVICE_SERVICE,
  UserProviderCreateServiceServiceInterface,
  UserProviderDisableServiceServiceInterface,
} from './interfaces/user.provider.service.interface';
import { UserProviderServiceDisableControllerParamsDto } from './dtos/user.provider.disable-service.dto';
import { UserProviderCreateServiceControllerParamsBodyDto } from './dtos/user.provider.service.dto';
import { UserProviderAppointmentConfirmControllerParamsDto } from './dtos/user.provider.appointment-confirm.dto';
import {
  USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE,
  UserProviderAppointmentConfirmServiceInterface,
} from './interfaces/user.provider.appointment-confirm.interface';
import { GetRequestUrl } from '@src/modules/common/decorators/get-request-url';
import {
  USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE,
  UserProviderGetAppointmentsByStatusServiceInterface,
} from './interfaces/user.provider.get-appointments-by-status.interface';
import { UserProviderGetAppointmentsByStatusControllerParamsDto } from './dtos/user.provider.get-appointments-by-status.dto';
import {
  USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE,
  UserProviderGetAppointmentByIdServiceInterface,
} from './interfaces/user.provider.get-appointment-by-id.interface';
import { UserProviderGetAppointmentByIdControllerParamsDto } from './dtos/user.provider.get-appointment-by-id.dto';
import {
  USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE,
  USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE,
  UserProviderCreateAvailableDaysServiceInterface,
  UserProviderGetAvailableDaysServiceInterface,
} from './interfaces/user.provider.available-days.interface';
import { UserProviderCreateAvailableDaysControllerParamsBodyDto } from './dtos/user.provider.available-days.dto';

@Controller('user/provider')
export class UserProviderController {
  constructor(
    @Inject(USER_PROVIDER_CREATE_SERVICE)
    private userProviderCreateService: UserProviderCreateServiceInterface,
    @Inject(USER_PROVIDER_INTERNAL_DISABLE_SERVICE)
    private userProviderInternalDisableService: UserProviderInternalDisableServiceInterface,
    @Inject(USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE)
    private userProviderCreateAvailableDaysService: UserProviderCreateAvailableDaysServiceInterface,
    @Inject(USER_PROVIDER_HOURS_AVAILABLE_SERVICE)
    private userProviderHoursAvailableService: UserProviderHoursAvailableServiceInterface,
    @Inject(USER_PROVIDER_CREATE_SERVICE_SERVICE)
    private userProviderCreateServiceService: UserProviderCreateServiceServiceInterface,
    @Inject(USER_PROVIDER_DISABLE_SERVICE_SERVICE)
    private userProviderServiceDisableService: UserProviderDisableServiceServiceInterface,
    @Inject(USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE)
    private userProviderAppointmentConfirmService: UserProviderAppointmentConfirmServiceInterface,
    @Inject(USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE)
    private userProviderGetAppointmentByStatusService: UserProviderGetAppointmentsByStatusServiceInterface,
    @Inject(USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE)
    private userProviderGetAppointmentByIdService: UserProviderGetAppointmentByIdServiceInterface,
    @Inject(USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE)
    private userProviderGetAvailableDaysService: UserProviderGetAvailableDaysServiceInterface,
  ) {}

  @Post('')
  async create(
    @Body() propsBody: UserProviderCreateControllerParamsDto,
  ): Promise<void> {
    await this.userProviderCreateService.execute(propsBody);
  }

  @Delete('/:userId')
  async internalDesative(
    @Body() disable: UserProviderInternalDisableControllerParamsDto,
  ) {
    await this.userProviderInternalDisableService.execute(disable);
  }

  @Post('/available-days')
  async availableDays(
    @RequestUserProviderId() providerId: string,
    @Body()
    availableDays: UserProviderCreateAvailableDaysControllerParamsBodyDto,
  ) {
    await this.userProviderCreateAvailableDaysService.execute({
      days: availableDays.days,
      providerId,
    });
  }

  @Post('/hours/available')
  async availableHours(
    @RequestUserProviderId() providerId: string,
    @Body() availableHours: UserProviderHoursAvailableControllerBodyParamsDto,
  ) {
    await this.userProviderHoursAvailableService.execute({
      providerId,
      hours: availableHours.hours,
    });
  }

  @Post('/services')
  async createService(
    @RequestUserProviderId() providerId: string,
    @Body() serviceProps: UserProviderCreateServiceControllerParamsBodyDto,
  ) {
    await this.userProviderCreateServiceService.execute({
      ...serviceProps,
      providerId,
    });
  }

  @Delete('/services/:serviceId/disable')
  async disableService(
    @RequestUserProviderId() providerId: string,
    @Param()
    userProviderServiceDisableParams: UserProviderServiceDisableControllerParamsDto,
  ) {
    await this.userProviderServiceDisableService.execute({
      ...userProviderServiceDisableParams,
      providerId,
    });
  }

  @Post('/appointments/:appointmentId/confirm')
  async userProviderAppointmentConfirm(
    @RequestUserProviderId() providerId: string,
    @Param()
    userProviderAppointmentConfirm: UserProviderAppointmentConfirmControllerParamsDto,
  ) {
    return this.userProviderAppointmentConfirmService.execute({
      providerId,
      appointmentId: userProviderAppointmentConfirm.appointmentId,
    });
  }

  @Get('/appointments/status/:status')
  async userProviderAppointmentByStatus(
    @RequestUserProviderId() providerId: string,
    @GetRequestUrl() url: string,
    @Param()
    userProviderGetAppointmentsByStatus: UserProviderGetAppointmentsByStatusControllerParamsDto,
  ) {
    return this.userProviderGetAppointmentByStatusService.execute({
      providerId,
      url: url,
      ...userProviderGetAppointmentsByStatus,
    });
  }

  @Get('/appointments/:appointmentId')
  async userProviderAppointmentById(
    @RequestUserProviderId() providerId: string,
    @Param()
    path: UserProviderGetAppointmentByIdControllerParamsDto,
  ) {
    return this.userProviderGetAppointmentByIdService.execute({
      providerId,
      ...path,
    });
  }

  @Get('/available-days')
  async getProviderDaysAvailable(@RequestUserProviderId() providerId: string) {
    return this.userProviderGetAvailableDaysService.execute({
      providerId,
    });
  }
}
