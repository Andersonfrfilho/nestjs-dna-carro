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
  USER_TOKEN_REPOSITORY,
  UserTokenRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.token.repository.interface';
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
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { CustomException } from '@src/error/custom.exception';
import {
  NOT_FOUND_CACHE_INFORMATION,
  NameErrorCacheInformationFlow,
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
import {
  ClientCreateServiceInterface,
  ClientCreateServiceParamsDTO,
} from '../interfaces/client.create.service.interface';

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
    @Inject(USER_TOKEN_REPOSITORY)
    private userTokenRepository: UserTokenRepositoryInterface,
    @Inject(TYPES_USER_REPOSITORY)
    private typesUserRepository: TypesUserRepositoryInterface,
    @Inject(USER_TYPES_USER_REPOSITORY)
    private userTypesUserRepository: UserTypesUserRepositoryInterface,
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
  ) {}
  async execute(params: ClientCreateServiceParamsDTO): Promise<void> {
    const key = `${CACHE_KEYS.CLIENT_CREATE_SERVICE}:${params.user.cpf}`;

    const userCache =
      await this.cacheProvider.get<ClientCreateServiceParamsDTO>(key);

    if (!userCache) {
      throw new CustomException(NOT_FOUND_CACHE_INFORMATION());
    }

    if (!userCache.user) {
      throw new CustomException(
        NOT_FOUND_CACHE_INFORMATION(NameErrorCacheInformationFlow.user),
      );
    }

    if (!userCache.phone) {
      throw new CustomException(
        NOT_FOUND_CACHE_INFORMATION(NameErrorCacheInformationFlow.phone),
      );
    }

    if (!userCache.address) {
      throw new CustomException(
        NOT_FOUND_CACHE_INFORMATION(NameErrorCacheInformationFlow.address),
      );
    }

    if (!userCache.term || !userCache.term.id) {
      throw new CustomException(
        NOT_FOUND_CACHE_INFORMATION(NameErrorCacheInformationFlow.term),
      );
    }

    if (!userCache.photo) {
      throw new CustomException(
        NOT_FOUND_CACHE_INFORMATION(NameErrorCacheInformationFlow.photo),
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

    const user = await this.userRepository.save(userCache.user);

    const phone = await this.phoneRepository.save(userCache.phone);

    const address = await this.addressRepository.save(userCache.address);

    const photo = await this.imageRepository.save(userCache.photo);

    await this.userPhoneRepository.save({
      userId: user.id,
      phoneId: phone.id,
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
      userImageProfileId: photo.id,
    });

    await this.userTermRepository.save({
      userId: user.id,
      termId: userCache.term.id,
      accept: true,
      active: true,
    });

    await this.userTypesUserRepository.save({
      userId: user.id,
      userTypeId: userType.id,
      active: true,
      confirm: true,
    });

    await this.userTermRepository.save({
      userId: user.id,
      termId: term.id,
      accept: true,
      active: true,
      confirm: true,
    });

    return user as any;
  }
}
