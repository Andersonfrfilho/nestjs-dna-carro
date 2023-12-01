import {
  ClientGetCacheInfoWithoutFlowByPhoneDtoServiceParamsDto,
  ClientGetCacheInfoWithoutFlowByPhoneServiceResponse,
} from '../dto/client.get-cache-info-without-flow-by-phone.dto';

export const CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE =
  'CLIENT_GET_CACHE_INFO_WITHOUT_FLOW_BY_PHONE_SERVICE';

export interface ClientGetCacheInfoWithoutFlowByPhoneServiceInterface {
  execute(
    params: ClientGetCacheInfoWithoutFlowByPhoneDtoServiceParamsDto,
  ): Promise<ClientGetCacheInfoWithoutFlowByPhoneServiceResponse>;
}
