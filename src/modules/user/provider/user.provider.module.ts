import { LoggerModule } from '@src/providers/logger/logger.module';
import { UserModule } from '../user.module';
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
import { TokenModule } from '@src/providers/token/token.module';

@Module({
  imports: [UserModule, LoggerModule, TokenModule],
  providers: [
    {
      provide: USER_PROVIDER_CREATE_SERVICE,
      useClass: UserProviderCreateService,
    },
  ],
  controllers: [UserProviderController],
  exports: [USER_PROVIDER_CREATE_SERVICE],
})
export class UserProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserInternalMiddleware).forRoutes({
      path: 'user/provider',
      method: RequestMethod.POST,
    });
  }
}
