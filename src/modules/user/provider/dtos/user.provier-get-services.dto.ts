import {
  PaginationParamsDto,
  PaginationResultDto,
} from '@src/modules/common/dtos/commons,pagination.dto';
import { Service } from '../entities/services.entity';
import { IsString } from 'class-validator';

export class UserProviderGetServicesParamsDto extends PaginationParamsDto<Service> {}

export class UserProviderGetServicesServiceParamsDto extends UserProviderGetServicesParamsDto {
  @IsString()
  providerId: string;

  @IsString({ message: 'url must be string' })
  url: string;
}

export class UserProviderGetServicesControllerParamsDto extends UserProviderGetServicesParamsDto {}

export class UserProviderGetServicesControllerResultDto extends PaginationResultDto<Service> {}

export class UserProviderGetServicesServiceResultDto extends UserProviderGetServicesControllerResultDto {}
