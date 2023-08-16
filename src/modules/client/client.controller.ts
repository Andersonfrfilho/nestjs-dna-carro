import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ClientCacheCreateControllerParamsDTO } from './dto/client.controller.dto';
import { CLIENT_CREATE_CACHE_SERVICE } from './interfaces/client.interfaces';
import { ClientCreateCacheServiceInterface } from './interfaces/client.create.cache.service.interface';

@Controller('client')
export class ClientController {
  constructor(
    @Inject(CLIENT_CREATE_CACHE_SERVICE)
    private clientCreateCacheService: ClientCreateCacheServiceInterface,
  ) {}
  @Post('/cache/:key')
  async cacheCreate(
    @Param('key') key: string,
    @Body() createCache: ClientCacheCreateControllerParamsDTO,
  ): Promise<void> {
    console.log(key);
    await this.clientCreateCacheService.execute({ ...createCache, key });
  }
}
