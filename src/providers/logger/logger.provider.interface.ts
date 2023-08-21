import { LoggerService } from '@nestjs/common';

export const LOGGER_PROVIDER = 'LOGGER_PROVIDER';

export interface LoggerProviderInterface extends LoggerService {
  info(message: any, ...optionalParams: any[]): void;
  setRequestId(requestId: string): void;
}
