import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClassClientCacheCreateParamsDTO } from './dto/client.controller.dto';
import { CLIENT_CREATE_CACHE_SERVICE } from './interfaces/client.interfaces';
import { ClientCreateCacheServiceInterface } from './interfaces/client.create.cache.service.interface';
import * as fastify from 'fastify';

@Controller('client')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
  ) {}
  @Post('/cache/:key')
  async cacheCreate(
    @Body() createCache: ClassClientCacheCreateParamsDTO,
    @Param() key: string,
  ): Promise<void> {
    await this.clientCreateCacheService.execute({ ...createCache, key });
  }
}
