import { PaginationParamsDto } from '@src/modules/common/dtos/commons,pagination.dto';
import { Service } from '../entities/services.entity';
import { IsString } from 'class-validator';

export class FindByProvidersIdActiveWithPaginationParamsDto extends PaginationParamsDto<Service> {
  @IsString()
  providerId: string;
}

export class FindByProvidersIdActiveWithPaginationResultDto {
  data: Service[];
  total: number;
  page: string;
  size: string;
}

export class DeleteServiceByProviderIdParamsDto {
  providerId: string;
  serviceId: string;
}
