import { IsEmail } from 'class-validator';

export class ClientGetCacheInfoWithoutFlowByEmailDto {
  @IsEmail()
  email: string;
}

export class ClientGetCacheInfoWithoutFlowByEmailDtoControllerParamsDto extends ClientGetCacheInfoWithoutFlowByEmailDto {}

export class ClientGetCacheInfoWithoutFlowByEmailDtoServiceParamsDto extends ClientGetCacheInfoWithoutFlowByEmailDto {}

export interface ClientGetCacheInfoWithoutFlowByEmailResponse {
  missingCacheInfo: Array<string>;
}

export type ClientGetCacheInfoWithoutFlowByEmailServiceResponse =
  ClientGetCacheInfoWithoutFlowByEmailResponse;

export type ClientGetCacheInfoWithoutFlowByEmailControllerResponse =
  ClientGetCacheInfoWithoutFlowByEmailResponse;
