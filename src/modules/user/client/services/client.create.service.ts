import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@modules/user/interfaces/repositories/user.repository.interface';
import {
  USER_PHONE_REPOSITORY,
  UserPhoneRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.phone.repository.interface';
import {
  PHONE_REPOSITORY,
  PhoneRepositoryInterface,
} from '@src/modules/phone/interfaces/phone.repository.interface';
import {
  ADDRESS_REPOSITORY,
  AddressRepositoryInterface,
} from '@src/modules/address/interfaces/address.repository.interface';
import {
  USER_ADDRESS_REPOSITORY,
  UserAddressRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.address.repository.interface';
import {
  TERM_REPOSITORY,
  TermRepositoryInterface,
} from '@src/modules/term/interfaces/term.repository.interface';
import {
  USER_TERM_REPOSITORY,
  UserTermRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.term.repository.interface';
import {
  USER_TYPES_USER_REPOSITORY,
  UserTypesUserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.types.user.repository.interface';
import {
  TYPES_USER_REPOSITORY,
  TypesUserRepositoryInterface,
} from '@src/modules/types-users/interfaces/types-users.repository.interface';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { CustomException } from '@src/error/custom.exception';
import {
  NOT_FOUND_CACHE_INFORMATION,
  TERM_NOT_FOUND,
  TYPE_USER_NOT_FOUND,
} from '@src/error/error.constant';
import {
  IMAGE_REPOSITORY,
  ImageRepositoryInterface,
} from '@src/modules/image/interfaces/image.repository.interface';
import {
  USER_IMAGE_PROFILE_REPOSITORY,
  UserImageProfileRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.image.profile.repository.interface';
import { TypesUsers } from '@src/modules/types-users/types-users.constant';
import { ClientCreateServiceInterface } from '../interfaces/client.create.interface';
import { NameCacheKeyFlow, USER_CLIENT_CACHE_KEYS } from '../client.constant';
import databaseSource from '@src/providers/database/database.local.source';
import { User } from '@src/modules/user/entities/user.entity';
import { PHONE_INFO_NOT_FOUND, USER_NOT_FOUND } from '../client.errors';
import { ClientCreateServiceParamsDto } from '../dto/client.create.dto';
import { ClientCacheCreateServiceParamsDto } from '../dto/client.create.cache.dto';
import {
  STORAGE_PROVIDER,
  StorageProviderInterface,
} from '@src/providers/storage/storage.provider.interface';
import { TYPE_NAME_IMAGE } from '@src/modules/image/image.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  HASH_PROVIDER,
  HashProviderInterface,
} from '@src/providers/hash/hash.provider.interface';
import { Phone } from '@src/modules/phone/phone.entity';
import { Address } from '@src/modules/address/address.entity';
import { COUNTRY_ADDRESS_CODE } from '@src/modules/address/address.constante';

import { Image } from '@src/modules/image/image.entity';

@Injectable()
export class ClientCreateService implements ClientCreateServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(PHONE_REPOSITORY)
    private phoneRepository: PhoneRepositoryInterface,
    @Inject(USER_PHONE_REPOSITORY)
    private userPhoneRepository: UserPhoneRepositoryInterface,
    @Inject(ADDRESS_REPOSITORY)
    private addressRepository: AddressRepositoryInterface,
    @Inject(USER_ADDRESS_REPOSITORY)
    private userAddressRepository: UserAddressRepositoryInterface,
    @Inject(IMAGE_REPOSITORY)
    private imageRepository: ImageRepositoryInterface,
    @Inject(USER_IMAGE_PROFILE_REPOSITORY)
    private userImageProfileRepository: UserImageProfileRepositoryInterface,
    @Inject(TERM_REPOSITORY)
    private termRepository: TermRepositoryInterface,
    @Inject(USER_TERM_REPOSITORY)
    private userTermRepository: UserTermRepositoryInterface,
    @Inject(TYPES_USER_REPOSITORY)
    private typesUserRepository: TypesUserRepositoryInterface,
    @Inject(USER_TYPES_USER_REPOSITORY)
    private userTypesUserRepository: UserTypesUserRepositoryInterface,
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(STORAGE_PROVIDER)
    private storageProvider: StorageProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
    @Inject(HASH_PROVIDER)
    private hashProvider: HashProviderInterface,
  ) {}
  async execute(params: ClientCreateServiceParamsDto): Promise<User> {
    if (!databaseSource.isInitialized) {
      databaseSource.initialize();
    }
    let imageProfileUrl: string | undefined;
    const queryRunner = databaseSource.createQueryRunner();
    try {
      if (!params.phone) {
        throw new CustomException(PHONE_INFO_NOT_FOUND);
      }
      const keyPhone = `${params.phone.countryCode}${params.phone.ddd}${params.phone.number}`;
      const key = USER_CLIENT_CACHE_KEYS.CLIENT_CREATE_SERVICE_ALL({
        phone: keyPhone,
      });

      const userCache =
        await this.cacheProvider.getAll<ClientCacheCreateServiceParamsDto>(key);

      if (!userCache) {
        throw new CustomException(NOT_FOUND_CACHE_INFORMATION());
      }

      if (!userCache.user) {
        throw new CustomException(
          NOT_FOUND_CACHE_INFORMATION(NameCacheKeyFlow.user),
        );
      }

      if (!userCache.phone) {
        throw new CustomException(
          NOT_FOUND_CACHE_INFORMATION(NameCacheKeyFlow.phone),
        );
      }

      if (!userCache.address) {
        throw new CustomException(
          NOT_FOUND_CACHE_INFORMATION(NameCacheKeyFlow.address),
        );
      }

      if (!userCache.term || !userCache.term.id) {
        throw new CustomException(
          NOT_FOUND_CACHE_INFORMATION(NameCacheKeyFlow.term),
        );
      }

      if (!userCache.image) {
        throw new CustomException(
          NOT_FOUND_CACHE_INFORMATION(NameCacheKeyFlow.image),
        );
      }

      const term = await this.termRepository.findById(userCache.term.id);

      if (!term) {
        throw new CustomException(TERM_NOT_FOUND);
      }

      const userType = await this.typesUserRepository.findByName(
        TypesUsers.client,
      );

      if (!userType) {
        throw new CustomException(TYPE_USER_NOT_FOUND);
      }
      await queryRunner.startTransaction();

      const password = await this.hashProvider.hash(userCache.user.password);

      await this.hashProvider.compare({
        hash: password,
        value: userCache.user.password,
      });

      const user = await queryRunner.manager.save(User, {
        ...userCache.user,
        password_hash: password,
        active: true,
      });

      const phone = await queryRunner.manager.save(Phone, {
        ...userCache.phone,
        active: true,
      });

      const address = await queryRunner.manager.save(Address, {
        ...userCache.address,
        country: COUNTRY_ADDRESS_CODE.BRAZIL,
      });

      imageProfileUrl = await this.storageProvider.uploadImageProfileBase64({
        imageBase64: userCache.image.base64,
      });

      const image: Image = await queryRunner.manager.save(Image, {
        name: TYPE_NAME_IMAGE.PROFILE,
        url: imageProfileUrl,
      });

      await queryRunner.commitTransaction();

      await this.userPhoneRepository.save({
        userId: user.id,
        phoneId: phone.id,
        active: true,
        confirm: true,
      });

      await this.userTypesUserRepository.save({
        userId: user.id,
        userTypeId: userType.id,
        active: true,
        confirm: true,
      });

      await this.userAddressRepository.save({
        userId: user.id,
        addressId: address.id,
        active: true,
      });

      await this.userImageProfileRepository.save({
        userId: user.id,
        userImageProfileId: image.id,
      });

      await this.userTermRepository.save({
        userId: user.id,
        termId: userCache.term.id,
        accept: true,
      });

      await this.cacheProvider.delete(key);
    } catch (error) {
      this.loggerProvider.error('ClientCreateService - execute - error', {
        error: error,
      });

      await queryRunner.rollbackTransaction();

      if (imageProfileUrl) {
        await this.storageProvider.deleteImageProfile(imageProfileUrl);
      }

      throw error;
    }
    const userFound = await this.userRepository.findByPhoneActiveUser(
      params.phone,
    );

    if (!userFound) {
      throw new CustomException(USER_NOT_FOUND);
    }

    return userFound;
  }
}
