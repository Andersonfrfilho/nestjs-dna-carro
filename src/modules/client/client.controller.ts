import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientCacheCreateControllerParamsDTO } from './dto/client.controller.dto';
import { CLIENT_CREATE_CACHE_SERVICE } from './interfaces/client.interfaces';
import {
  ClientCreateCacheServiceInterface,
  KEY_CACHE,
} from './interfaces/client.create.cache.service.interface';
import { IsEnum } from 'class-validator';

export class CacheCreatePathParamDTO {
  @IsEnum(KEY_CACHE)
  key: string;
}

@Controller('client')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
  ) {}
  @Post('/cache/:key')
  async cacheCreate(
    @Param() path: CacheCreatePathParamDTO,
    @Body() createCache: ClientCacheCreateControllerParamsDTO,
  ): Promise<void> {
    await this.clientCreateCacheService.execute({
      ...createCache,
      key: path.key,
    });
  }
}
