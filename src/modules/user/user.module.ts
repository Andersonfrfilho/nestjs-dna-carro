import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { USER_REPOSITORY } from '@modules/user/interfaces/repositories/user.repository.interface';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { USER_ADDRESS_REPOSITORY } from './interfaces/repositories/user.address.repository.interface';
import { UserAddressRepository } from './repositories/user.address.repository';
import { USER_PHONE_REPOSITORY } from './interfaces/repositories/user.phone.repository.interface';
import { UserPhoneRepository } from './repositories/user.phone.repository';
import { USER_TYPES_USER_REPOSITORY } from './interfaces/repositories/user.types.user.repository.interface';
import { UserTypesUserRepository } from './repositories/user.types.user.repository';
import { USER_IMAGE_PROFILE_REPOSITORY } from './interfaces/repositories/user.image.profile.repository.interface';
import { UserImageProfileRepository } from './repositories/user.image.profile.repository';
import { USER_TERM_REPOSITORY } from './interfaces/repositories/user.term.repository.interface';
import { UserTermRepository } from './repositories/user.term.repository';
import { USER_TOKEN_REPOSITORY } from './interfaces/repositories/user.token.repository.interface';
import { UserTokenRepository } from './repositories/user.token.repository';
import { UserAddress } from './entities/user.address.entity';
import { UserPhone } from './entities/user.phone.entity';
import { UserTypesUser } from './entities/user.types.user.entity';
import { UserTerm } from './entities/user.term.entity';
import { UserImageProfile } from './entities/user.image.profile.entity';
import { UserToken } from './entities/user.token.entity';
import { PhoneModule } from '../phone/phone.module';
import { AddressModule } from '../address/address.module';
import { TypesUserModule } from '../types-users/types-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      UserPhone,
      UserTypesUser,
      UserTerm,
      UserImageProfile,
      UserToken,
    ]),
    PhoneModule,
    AddressModule,
    TypesUserModule,
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_PHONE_REPOSITORY,
      useClass: UserPhoneRepository,
    },
    {
      provide: USER_ADDRESS_REPOSITORY,
      useClass: UserAddressRepository,
    },
    {
      provide: USER_TYPES_USER_REPOSITORY,
      useClass: UserTypesUserRepository,
    },
    {
      provide: USER_IMAGE_PROFILE_REPOSITORY,
      useClass: UserImageProfileRepository,
    },
    {
      provide: USER_TERM_REPOSITORY,
      useClass: UserTermRepository,
    },
    {
      provide: USER_TOKEN_REPOSITORY,
      useClass: UserTokenRepository,
    },
  ],
  exports: [
    USER_REPOSITORY,
    USER_PHONE_REPOSITORY,
    USER_ADDRESS_REPOSITORY,
    USER_IMAGE_PROFILE_REPOSITORY,
    USER_TERM_REPOSITORY,
    USER_TOKEN_REPOSITORY,
    USER_TYPES_USER_REPOSITORY,
  ],
})
export class UserModule {}
