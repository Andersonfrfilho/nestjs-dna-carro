import {
  ClientGetCacheInfoWithoutFlowByEmailDtoServiceParamsDto,
  ClientGetCacheInfoWithoutFlowByEmailServiceResponse,
} from '../dto/client.get-cache-info-without-flow-by-email.dto';

export const CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE =
  'CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_EMAIL_SERVICE';

export interface ClientGetCacheInfoWithoutFlowByEmailServiceInterface {
  execute(
    params: ClientGetCacheInfoWithoutFlowByEmailDtoServiceParamsDto,
  ): Promise<ClientGetCacheInfoWithoutFlowByEmailServiceResponse>;
}
