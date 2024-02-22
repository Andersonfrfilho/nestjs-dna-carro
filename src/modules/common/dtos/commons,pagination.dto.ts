import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ORDER } from '../enums/commons.pagination.enum';

class Order<T> {
  @IsOptional()
  @IsString({
    message: 'element by size',
  })
  field: string; //keyof T;
  @IsOptional()
  @IsEnum(ORDER, {
    message: 'element by size',
  })
  order: ORDER;
}
export class PaginationParamsDto<T> {
  @IsOptional()
  @IsString({ message: 'page number' })
  page: string;
  @IsOptional()
  @IsString({
    message: 'element by size',
  })
  size: string;
  @IsOptional()
  @IsEnum({
    message: 'element by size',
  })
  order: Order<T>;
  @IsOptional()
  @IsObject({
    message: 'filter',
  })
  filter: any | T;
}
class Link {
  @IsString({
    message: 'Link to move pages',
  })
  href: string;
}
class Links {
  @IsOptional()
  @IsString({
    message: 'Link to next page',
  })
  next: Link;

  @IsOptional()
  @IsString({
    message: 'Link to next page',
  })
  previous: Link;

  @IsOptional()
  @IsString({
    message: 'Link to last page',
  })
  last: Link;

  @IsOptional()
  @IsString({
    message: 'Link to first page',
  })
  first: Link;
}

export class PaginationResultDto<T> {
  @IsString({ message: 'page number' })
  offset: string;
  @IsString({
    message: 'element by size',
  })
  limit: string;
  @IsString({
    message: 'totals elements registers',
  })
  size: string;
  @IsOptional()
  @IsObject({
    message: 'filter',
  })
  _links: Links;

  @IsArray()
  results: Array<T>;
}
