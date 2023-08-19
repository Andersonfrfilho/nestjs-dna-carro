import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientCacheCreateControllerParamsdto } from './dto/client.controller.dto';
import { CLIENT_CREATE_CACHE_SERVICE } from './interfaces/client.interfaces';
import {
  ClientCreateCacheServiceInterface,
  KEY_CACHE,
} from './interfaces/client.create.cache.service.interface';
import { IsEnum } from 'class-validator';

export class CacheCreatePathParamdto {
  @IsEnum(KEY_CACHE)
  key: string;
}

@Controller('term')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
  ) {}
  @Post()
  async cacheCreate(
    @Param() path: CacheCreatePathParamdto,
    @Body() createCache: ClientCacheCreateControllerParamsdto,
  ): Promise<void> {
    await this.clientCreateCacheService.execute({
      ...createCache,
      key: path.key,
    });
  }
}
