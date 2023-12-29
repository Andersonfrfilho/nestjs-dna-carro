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
import { UserInternalMiddleware } from '@src/modules/middlewares/internal.middleware';
import { USER_PROVIDER_INTERNAL_DISABLE_SERVICE } from './interfaces/user.provider.internal-disable.interface';
import { UserProviderInternalDisableService } from './services/user.provider.internal-disable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProviderAvailableDay } from './entities/provider-available-days.entity';
import { ProviderAvailableHour } from './entities/provider-available-hours.entity';
import { Service } from './entities/services.entity';
import {
  USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY,
  USER_PROVIDER_DAYS_AVAILABLE_SERVICE,
} from './interfaces/user.provider.days-available.interface';
import { UserProviderAvailableDaysRepository } from './repositories/user.provider.available-days.repository';
import {
  USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
  USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
} from './interfaces/user.provider.hours-available.interface';
import { UserProviderAvailableHoursRepository } from './repositories/user.provider.available-hours.repository';
import { USER_PROVIDER_REPOSITORY } from './interfaces/user.provider.repository.interface';
import { UserProviderRepository } from './repositories/user.provider.repository';
import { UserProviderDaysAvailableService } from './services/user.provider.days-available.service';
import { UserProviderHoursAvailableService } from './services/user.provider.hours-available.service';
import { USER_PROVIDER_CREATE_SERVICE_SERVICE } from './interfaces/user.provider.service.interface';
import { UserProviderCreateServiceService } from './services/user.provider.create-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      ProviderAvailableDay,
      ProviderAvailableHour,
      Service,
    ]),
    LoggerModule,
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
      provide: USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
      useClass: UserProviderAvailableHoursRepository,
    },
    {
      provide: USER_PROVIDER_REPOSITORY,
      useClass: UserProviderRepository,
    },
    {
      provide: USER_PROVIDER_DAYS_AVAILABLE_SERVICE,
      useClass: UserProviderDaysAvailableService,
    },
    {
      provide: USER_PROVIDER_HOURS_AVAILABLE_SERVICE,
      useClass: UserProviderHoursAvailableService,
    },
    {
      provide: USER_PROVIDER_CREATE_SERVICE_SERVICE,
      useClass: UserProviderCreateServiceService,
    },
  ],
  controllers: [UserProviderController],
  exports: [
    USER_PROVIDER_CREATE_SERVICE,
    USER_PROVIDER_INTERNAL_DISABLE_SERVICE,
  ],
})
export class UserProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserInternalMiddleware).forRoutes({
      path: 'user/provider',
      method: RequestMethod.POST,
    });
  }
}
