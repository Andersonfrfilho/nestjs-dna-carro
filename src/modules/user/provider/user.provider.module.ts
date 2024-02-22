import { LoggerModule } from '@src/providers/logger/logger.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { USER_PROVIDER_CREATE_SERVICE } from './interfaces/user.provider.create.interface';
import { UserProviderCreateService } from './services/user.provider.create.service';
import { UserProviderController } from './user.provider.controller';
import { USER_PROVIDER_INTERNAL_DISABLE_SERVICE } from './interfaces/user.provider.internal-disable.interface';
import { UserProviderInternalDisableService } from './services/user.provider.internal-disable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProviderAvailableDay } from './entities/provider-available-days.entity';
import { ProviderAvailableHour } from './entities/provider-available-hours.entity';
import { Service } from './entities/services.entity';

import { UserProviderAvailableDaysRepository } from './repositories/user.provider.available-days.repository';
import {
  USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
  USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
} from './interfaces/user.provider.hours-available.interface';
import { UserProviderAvailableHoursRepository } from './repositories/user.provider.available-hours.repository';
import { USER_PROVIDER_REPOSITORY } from './interfaces/user.provider.repository.interface';
import { UserProviderRepository } from './repositories/user.provider.repository';
import { UserProviderHoursAvailableService } from './services/user.provider.hours-available.service';
import {
  USER_PROVIDER_CREATE_SERVICE_SERVICE,
  USER_PROVIDER_DISABLE_SERVICE_SERVICE,
  USER_PROVIDER_SERVICE_REPOSITORY,
} from './interfaces/user.provider.service.interface';
import { UserProviderCreateServiceService } from './services/user.provider.create-service.service';
import { UserProviderAppointmentConfirmService } from './services/user.provider.appointment-confirm.service';
import { USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE } from './interfaces/user.provider.appointment-confirm.interface';
import { UserModule } from '../user.module';
import { UserProviderServicesRepository } from './repositories/user.provider.services.repository';
import { AppointmentModule } from '@src/modules/appointment/appointment.module';
import { UserProviderDisableServiceService } from './services/user.provider.disable-service.service';
import { TokenModule } from '@src/providers/token/token.module';
import { GetUserInternalIdMiddleware } from '@src/modules/middlewares/get-user-internal-id.middleware';
import { GetUserProviderIdMiddleware } from '@src/modules/middlewares/get-user-provider-id.middleware';
import { USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE } from './interfaces/user.provider.get-appointments-by-status.interface';
import { UserProviderGetAppointmentsByStatusService } from './services/user.provider.get-appointments-by-status.service';
import { USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE } from './interfaces/user.provider.get-appointment-by-id.interface';
import { UserProviderGetAppointmentByIdService } from './services/user.provider.get-appointment-by-id.service';
import {
  USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY,
  USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE,
  USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE,
} from './interfaces/user.provider.available-days.interface';
import { UserProviderCreateAvailableDaysService } from './services/user.provider.create-available-days.service';
import { UserProviderGetAvailableDaysService } from './services/user.provider.get-available-days.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      ProviderAvailableDay,
      ProviderAvailableHour,
      Service,
    ]),
    UserModule,
    AppointmentModule,
    LoggerModule,
    TokenModule,
  ],
  providers: [
    {
      provide: USER_PROVIDER_CREATE_SERVICE,
      useClass: UserProviderCreateService,
    },
    {
      provide: USER_PROVIDER_INTERNAL_DISABLE_SERVICE,
      useClass: UserProviderInternalDisableService,
    },
    {
      provide: USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY,
      useClass: UserProviderAvailableDaysRepository,
    },
    {
      provide: USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE,
      useClass: UserProviderCreateAvailableDaysService,
    },
    {
      provide: USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE,
      useClass: UserProviderGetAvailableDaysService,
    },
    {
      provide: USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
      useClass: UserProviderAvailableHoursRepository,
    },
    {
      provide: USER_PROVIDER_REPOSITORY,
      useClass: UserProviderRepository,
    },
    {
      provide: USER_PROVIDER_SERVICE_REPOSITORY,
      useClass: UserProviderServicesRepository,
    },
    {
      provide: USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
      useClass: UserProviderHoursAvailableService,
    },
    {
      provide: USER_PROVIDER_CREATE_SERVICE_SERVICE,
      useClass: UserProviderCreateServiceService,
    },
    {
      provide: USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE,
      useClass: UserProviderAppointmentConfirmService,
    },
    {
      provide: USER_PROVIDER_DISABLE_SERVICE_SERVICE,
      useClass: UserProviderDisableServiceService,
    },
    {
      provide: USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE,
      useClass: UserProviderGetAppointmentsByStatusService,
    },
    {
      provide: USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE,
      useClass: UserProviderGetAppointmentByIdService,
    },
  ],
  controllers: [UserProviderController],
  exports: [
    USER_PROVIDER_REPOSITORY,
    USER_PROVIDER_SERVICE_REPOSITORY,
    USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY,
    USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
    USER_PROVIDER_CREATE_SERVICE,
    USER_PROVIDER_INTERNAL_DISABLE_SERVICE,
    USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE,
    USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
    USER_PROVIDER_CREATE_SERVICE_SERVICE,
    USER_PROVIDER_APPOINTMENT_CONFIRM_SERVICE,
    USER_PROVIDER_DISABLE_SERVICE_SERVICE,
    USER_PROVIDER_GET_APPOINTMENTS_BY_STATUS_SERVICE,
    USER_PROVIDER_GET_APPOINTMENT_BY_ID_SERVICE,
    USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE,
  ],
})
export class UserProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserInternalIdMiddleware).forRoutes(
      {
        path: 'user/provider',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/:userId',
        method: RequestMethod.DELETE,
      },
    );
    consumer.apply(GetUserProviderIdMiddleware).forRoutes(
      {
        path: 'user/provider/available-days',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/available-days',
        method: RequestMethod.GET,
      },
      {
        path: 'user/provider/hours/available',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/services',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/services/:serviceId/disable',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/services/:appointmentId/confirm',
        method: RequestMethod.POST,
      },
      {
        path: 'user/provider/appointments/status/:status',
        method: RequestMethod.GET,
      },
      {
        path: 'user/provider/appointments/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
