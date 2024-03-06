import { PaginationResultDto } from '@src/modules/common/dtos/commons,pagination.dto';
import { IsString, IsUUID } from 'class-validator';
import { Service } from '../entities/services.entity';

export class UserProviderDeleteServiceParamsDto {
  @IsUUID()
  serviceId: string;
}

export class UserProviderDeleteServiceServiceParamsDto extends UserProviderDeleteServiceParamsDto {
  @IsUUID()
  providerId: string;
}

export class UserProviderDeleteServiceControllerParamsDto extends UserProviderDeleteServiceParamsDto {}

export class UserProviderDeleteServiceResultDto extends PaginationResultDto<Service> {}

export class UserProviderDeleteServiceServiceResultDto extends UserProviderDeleteServiceResultDto {}

export class UserProviderDeleteServiceControllerResultDto extends UserProviderDeleteServiceResultDto {}
