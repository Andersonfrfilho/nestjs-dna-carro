import { IsString } from 'class-validator';

export class ClientGetCacheInfoWithoutFlowByPhoneDto {
  @IsString()
  phone: string;
}

export class ClientGetCacheInfoWithoutFlowByPhoneDtoControllerParamsDto extends ClientGetCacheInfoWithoutFlowByPhoneDto {}

export class ClientGetCacheInfoWithoutFlowByPhoneDtoServiceParamsDto extends ClientGetCacheInfoWithoutFlowByPhoneDto {}

export interface ClientGetCacheInfoWithoutFlowByPhoneResponse {
  missingCacheInfo: Array<string>;
}

export type ClientGetCacheInfoWithoutFlowByPhoneServiceResponse =
  ClientGetCacheInfoWithoutFlowByPhoneResponse;

export type ClientGetCacheInfoWithoutFlowByPhoneControllerResponse =
  ClientGetCacheInfoWithoutFlowByPhoneResponse;
