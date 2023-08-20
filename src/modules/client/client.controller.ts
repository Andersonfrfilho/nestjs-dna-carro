import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientCacheCreateControllerParamsDto } from './dto/client.controller.dto';
import { CLIENT_CREATE_CACHE_SERVICE } from './interfaces/client.interfaces';
import { ClientCreateCacheServiceInterface } from './interfaces/client.create.cache.service.interface';
import { IsEnum } from 'class-validator';
import { NameCacheKeyFlow } from './client.constant';

export class CacheCreatePathParamDto {
  @IsEnum(NameCacheKeyFlow)
  key: NameCacheKeyFlow;
}

@Controller('client')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
  ) {}
  @Post('/cache/:key')
  async cacheCreate(
    @Param() path: CacheCreatePathParamDto,
    @Body() createCache: ClientCacheCreateControllerParamsDto,
  ): Promise<void> {
    await this.clientCreateCacheService.execute({
      ...createCache,
      key: path.key,
    });
  }
}
