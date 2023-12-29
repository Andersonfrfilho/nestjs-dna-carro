import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
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
  USER_PROVIDER_DAYS_AVAILABLE_SERVICE,
  UserProviderDaysAvailableServiceInterface,
} from './interfaces/user.provider.days-available.interface';
import {
  USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
  UserProviderHoursAvailableServiceInterface,
} from './interfaces/user.provider.hours-available.interface';
import { UserProviderDaysAvailableControllerParamsBodyDto } from './dtos/user.provider.days-available.dto';
import { RequestUserProviderId } from './decorators/request-provider-user-id';
import { UserProviderHoursAvailableControllerBodyParamsDto } from './dtos/user.provider.hours-available.dto';
import { UserProviderCreateServiceControllerParamsBodyDto } from './dtos/user.provider.create-service.dto';
import {
  USER_PROVIDER_CREATE_SERVICE_SERVICE,
  UserProviderCreateServiceServiceInterface,
} from './interfaces/user.provider.service.interface';
import {
  UserProviderServiceDisableControllerParamsDto,
  UserProviderServiceDisableServiceParamsDto,
} from './dtos/user.provider.disable-service.dto';

@Controller('user/provider')
export class UserProviderController {
  constructor(
    @Inject(USER_PROVIDER_CREATE_SERVICE)
    private userProviderCreateService: UserProviderCreateServiceInterface,
    @Inject(USER_PROVIDER_INTERNAL_DISABLE_SERVICE)
    private userProviderInternalDisableService: UserProviderInternalDisableServiceInterface,
    @Inject(USER_PROVIDER_DAYS_AVAILABLE_SERVICE)
    private userProviderDaysAvailableService: UserProviderDaysAvailableServiceInterface,
    @Inject(USER_PROVIDER_HOURS_AVAILABLE_SERVICE)
    private userProviderHoursAvailableService: UserProviderHoursAvailableServiceInterface,
    @Inject(USER_PROVIDER_CREATE_SERVICE_SERVICE)
    private userProviderCreateServiceService: UserProviderCreateServiceServiceInterface,
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

  @Post('/days/available')
  async availableDays(
    @RequestUserProviderId() providerId: string,
    @Body() availableDays: UserProviderDaysAvailableControllerParamsBodyDto,
  ) {
    await this.userProviderDaysAvailableService.execute({
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

  @Delete('services/:serviceId/disable')
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

  // @Post('/:providerId/appointments/:appointmentId/confirm') {

  // }

  // @Get('/:userId/appointments') {

  // }

  // @Get('/:userId/appointments/:appointmentId') {

  // }
}
