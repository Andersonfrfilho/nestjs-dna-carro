import config from '@src/config';
import {
  PaginationParamsDto,
  PaginationResultDto,
} from '../dtos/commons,pagination.dto';
import { first } from 'lodash';

interface FormatPaginationResultsParamsDto<T>
  extends Omit<PaginationParamsDto<T>, 'order' | 'filter'> {
  data: T[];
  total: number;
  url: string;
}

export function formatPaginationResults<T>(
  params: FormatPaginationResultsParamsDto<T>,
): PaginationResultDto<T> {
  const page = Number(params.page);
  const size = Number(params.size);
  const offset = page > 0 ? (page - 1) * size : 0;
  const url = config.api.baseUrl + params.url;

  const isLastPage = params.data.length < size;
  const result: PaginationResultDto<T> = {
    limit: params.size,
    offset: offset.toString(),
    results: params.data,
    size: params.total.toString(),
    _links: {
      next: {
        href: isLastPage ? '' : url + `?page=${page + 1}&size=${size}`,
      },
      previous: {
        href: page > 0 ? url + `?page=${page - 1}&size=${size}` : '',
      },
      last: {
        href: isLastPage
          ? ''
          : url + `?page=${params.total / size}&size=${size}`,
      },
      first: { href: page > 0 ? url + `?page=1&size=${size}` : '' },
    },
  };
  return result;
}
