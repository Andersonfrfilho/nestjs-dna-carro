import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import {
  CLIENT_CREATE_CACHE_SERVICE,
  CLIENT_CREATE_SERVICE,
} from './interfaces/client.interfaces';
import { IsEnum } from 'class-validator';
import { NameCacheKeyFlow } from './client.constant';
import { ClientCacheCreateControllerParamsDto } from './dto/client.create.cache.dto';
import { ClientCreateControllerParamsDto } from './dto/client.create.dto';
import { ClientCreateServiceInterface } from './interfaces/client.create.interface';
import { ClientCreateCacheServiceInterface } from './interfaces/client.create.cache.interface';

export class CacheCreatePathParamDto {
  @IsEnum(NameCacheKeyFlow)
  key: NameCacheKeyFlow;
}

@Controller('user/client')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
    @Inject(CLIENT_CREATE_SERVICE)
    private clientCreateService: ClientCreateServiceInterface,
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

  @Post('/')
  async create(@Body() create: ClientCreateControllerParamsDto): Promise<void> {
    await this.clientCreateService.execute({ email: create.email });
  }
}
