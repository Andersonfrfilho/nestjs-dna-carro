import { Inject, Injectable } from '@nestjs/common';

import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { CACHE_TTL } from '@src/providers/cache/constants/cache.constant.ttl';
import {
  ClientCreateCacheServiceInterface,
  KEY_CACHE,
} from '../interfaces/client.create.cache.service.interface';
import { ClientCacheCreateServiceParamsDto } from '../dto/client.service.dto';
import { CustomException } from '@src/error/custom.exception';
import { EMAIL_INFO_NOT_FOUND, KEY_PARAM_INVALID } from '../client.errors';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.repository.interface';
import { EMAIL_ALREADY_EXIST } from '@src/error/error.constant';
import { CLIENT_CACHE_KEYS } from '../client.constant';

@Injectable()
export class ClientCreateCacheService
  implements ClientCreateCacheServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
  ) {}
  async execute(params: ClientCacheCreateServiceParamsDto): Promise<void> {
    const email = params?.user?.email;
    if (!email) {
      throw new CustomException(EMAIL_INFO_NOT_FOUND);
    }

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new CustomException(EMAIL_ALREADY_EXIST);
    }

    const key = CACHE_KEYS.CLIENT_CREATE_SERVICE({
      email: params.user.email,
      key: params.key,
    });

    if (!CLIENT_CACHE_KEYS.includes(params.key)) {
      throw new CustomException(KEY_PARAM_INVALID);
    }
    const typeKey = params.key as KEY_CACHE;

    const data = params[typeKey];

    await this.cacheProvider.set({
      key,
      payload: data,
      ttl: CACHE_TTL.CLIENT_CREATE_SERVICE,
    });
  }
}
