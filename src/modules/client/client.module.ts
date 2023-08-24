import { Module } from '@nestjs/common';
import {
  CLIENT_CREATE_CACHE_SERVICE,
  CLIENT_CREATE_SERVICE,
} from './interfaces/client.interfaces';
import { ClientCreateService } from './services/client.create.service';
import { UserModule } from '../user/user.module';
import { PhoneModule } from '../phone/phone.module';
import { AddressModule } from '../address/address.module';
import { TermModule } from '../term/term.module';
import { TypesUserModule } from '../types-users/types-users.module';
import { CacheClientModule } from '@src/providers/cache/cache.module';
import { ClientController } from './client.controller';
import { ClientCreateCacheService } from './services/client.create.cache.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    UserModule,
    PhoneModule,
    AddressModule,
    ImageModule,
    TermModule,
    TypesUserModule,
    CacheClientModule,
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
  ],
  controllers: [ClientController],
  exports: [CLIENT_CREATE_SERVICE, CLIENT_CREATE_CACHE_SERVICE],
})
export class ClientModule {}
