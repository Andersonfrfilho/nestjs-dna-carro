import { Module } from '@nestjs/common';
import {
  CLIENT_CREATE_CACHE_SERVICE,
  CLIENT_CREATE_SERVICE,
} from './interfaces/client.interfaces';
import { ClientCreateService } from './services/client.create.service';

import { CacheClientModule } from '@src/providers/cache/cache.module';
import { ClientController } from './client.controller';
import { ClientCreateCacheService } from './services/client.create.cache.service';
import { UserModule } from '../user.module';
import { PhoneModule } from '@src/modules/phone/phone.module';
import { AddressModule } from '@src/modules/address/address.module';
import { TermModule } from '@src/modules/term/term.module';
import { TypesUserModule } from '@src/modules/types-users/types-users.module';
import { ImageModule } from '@src/modules/image/image.module';
import { StorageModule } from '@src/providers/storage/storage.module';
import { LoggerModule } from '@src/providers/logger/logger.module';
import { HashModule } from '@src/providers/hash/hash.module';
import { ClientGetCacheInfoWithoutFlowByEmailService } from './services/client.get-cache-info-without-flow-by-email.service';
import { CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE } from './interfaces/client.get-cache-info-without-flow-by-email.interface';
import { CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE } from './interfaces/client.get-cache-info-without-flow-by-phone.interface';
import { ClientGetCacheInfoWithoutFlowByPhoneService } from './services/client.get-cache-info-without-flow-by-phone.service';

@Module({
  imports: [
    UserModule,
    PhoneModule,
    AddressModule,
    ImageModule,
    TermModule,
    TypesUserModule,
    CacheClientModule,
    StorageModule,
    LoggerModule,
    HashModule,
  ],
  providers: [
    {
      provide: CLIENT_CREATE_SERVICE,
      useClass: ClientCreateService,
    },
    {
      provide: CLIENT_CREATE_CACHE_SERVICE,
      useClass: ClientCreateCacheService,
    },
    {
      provide: CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE,
      useClass: ClientGetCacheInfoWithoutFlowByEmailService,
    },
    {
      provide: CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE,
      useClass: ClientGetCacheInfoWithoutFlowByPhoneService,
    },
  ],
  controllers: [ClientController],
  exports: [CLIENT_CREATE_SERVICE, CLIENT_CREATE_CACHE_SERVICE],
})
export class ClientModule {}
