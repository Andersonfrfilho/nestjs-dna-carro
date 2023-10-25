import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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
import {
  ClientGetCacheInfoWithoutFlowByEmailControllerResponse,
  ClientGetCacheInfoWithoutFlowByEmailDtoControllerParamsDto,
} from './dto/client.get-cache-info-without-flow-by-email.dto';
import {
  CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE,
  ClientGetCacheInfoWithoutFlowByEmailServiceInterface,
} from './interfaces/client.get-cache-info-without-flow-by-email.interface';
import {
  ClientGetCacheInfoWithoutFlowByPhoneControllerResponse,
  ClientGetCacheInfoWithoutFlowByPhoneDtoControllerParamsDto,
} from './dto/client.get-cache-info-without-flow-by-phone.dto';
import {
  CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE,
  ClientGetCacheInfoWithoutFlowByPhoneServiceInterface,
} from './interfaces/client.get-cache-info-without-flow-by-phone.interface';

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
    @Inject(CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE)
    private clientGetCacheInfoWithoutFlowByEmailService: ClientGetCacheInfoWithoutFlowByEmailServiceInterface,
    @Inject(CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE)
    private clientGetCacheInfoWithoutFlowByPhoneService: ClientGetCacheInfoWithoutFlowByPhoneServiceInterface,
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

  @Get('/cache/emails/:email/without/flow')
  async getCacheInfoWithoutByEmailFlow(
    @Param() path: ClientGetCacheInfoWithoutFlowByEmailDtoControllerParamsDto,
  ): Promise<ClientGetCacheInfoWithoutFlowByEmailControllerResponse> {
    return this.clientGetCacheInfoWithoutFlowByEmailService.execute({
      ...path,
    });
  }

  @Get('/cache/phones/:phone/without/flow')
  async getCacheInfoWithoutByPhoneFlow(
    @Param() path: ClientGetCacheInfoWithoutFlowByPhoneDtoControllerParamsDto,
  ): Promise<ClientGetCacheInfoWithoutFlowByPhoneControllerResponse> {
    return this.clientGetCacheInfoWithoutFlowByPhoneService.execute({
      ...path,
    });
  }

  @Post('/')
  async create(@Body() create: ClientCreateControllerParamsDto): Promise<void> {
    await this.clientCreateService.execute({ email: create.email });
  }
}
