import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
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

import { RequestUserProviderId } from './decorators/request-user-provider-id';
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
import {
  USER_PROVIDER_CREATE_AVAILABILITIES_HOURS_SERVICE,
  USER_PROVIDER_GET_AVAILABILITIES_HOURS_SERVICE,
  UserProviderCreateAvailabilitiesHoursServiceInterface,
  UserProviderGetAvailabilitiesHoursServiceInterface,
} from './interfaces/user.provider.availabilities-hours.interface';
import { UserProviderCreateAvailabilitiesHoursControllerBodyParamsDto } from './dtos/user.provider.availabilities-hours.dto';
import {
  USER_PROVIDER_DELETE_SERVICE_SERVICE,
  UserProviderDeleteServiceServiceInterface,
} from './interfaces/user.provider.delete-service.interface';
import {
  UserProviderDeleteServiceControllerParamsDto,
  UserProviderDeleteServiceServiceParamsDto,
} from './dtos/user.provier-delete-services.dto';
import { UserProviderGetServicesControllerParamsDto } from './dtos/user.provier-get-services.dto';
import {
  USER_PROVIDER_GET_SERVICES_SERVICE,
  UserProviderGetServicesServiceInterface,
} from './interfaces/user.provider.get-services.interface';

@Controller('user/provider')
export class UserProviderController {
  constructor(
    @Inject(USER_PROVIDER_CREATE_SERVICE)
    private userProviderCreateService: UserProviderCreateServiceInterface,
    @Inject(USER_PROVIDER_INTERNAL_DISABLE_SERVICE)
    private userProviderInternalDisableService: UserProviderInternalDisableServiceInterface,
    @Inject(USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE)
    private userProviderCreateAvailableDaysService: UserProviderCreateAvailableDaysServiceInterface,
    @Inject(USER_PROVIDER_CREATE_AVAILABILITIES_HOURS_SERVICE)
    private userProviderCreateAvailabilitiesHoursService: UserProviderCreateAvailabilitiesHoursServiceInterface,
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
    @Inject(USER_PROVIDER_GET_AVAILABILITIES_HOURS_SERVICE)
    private userProviderGetAvailabilitiesHoursService: UserProviderGetAvailabilitiesHoursServiceInterface,
    @Inject(USER_PROVIDER_DELETE_SERVICE_SERVICE)
    private userProviderDeleteServiceService: UserProviderDeleteServiceServiceInterface,
    @Inject(USER_PROVIDER_GET_SERVICES_SERVICE)
    private userProviderGetServicesService: UserProviderGetServicesServiceInterface,
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
    return this.userProviderCreateAvailableDaysService.execute({
      days: availableDays.days,
      providerId,
    });
  }

  @Post('/available-hours')
  async setAvailableHours(
    @RequestUserProviderId() providerId: string,
    @Body()
    availableHours: UserProviderCreateAvailabilitiesHoursControllerBodyParamsDto,
  ) {
    return this.userProviderCreateAvailabilitiesHoursService.execute({
      providerId,
      hours: availableHours.hours,
    });
  }

  @Get('/available-hours')
  async getAvailableHours(@RequestUserProviderId() providerId: string) {
    return this.userProviderGetAvailabilitiesHoursService.execute({
      providerId,
    });
  }

  @Get('/services')
  async getService(
    @RequestUserProviderId() providerId: string,
    @GetRequestUrl() url: string,
    @Param()
    userProviderGetServicesControllerParamsDto: UserProviderGetServicesControllerParamsDto,
  ) {
    return this.userProviderGetServicesService.execute({
      ...userProviderGetServicesControllerParamsDto,
      providerId,
      url,
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

  @Delete('/services/:serviceId')
  async deleteService(
    @RequestUserProviderId() providerId: string,
    @Param()
    userProviderDeleteServiceControllerParamsDto: UserProviderDeleteServiceControllerParamsDto,
  ) {
    await this.userProviderDeleteServiceService.execute({
      ...userProviderDeleteServiceControllerParamsDto,
      providerId,
    });
  }

  @Put('/services/:serviceId/disable')
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
