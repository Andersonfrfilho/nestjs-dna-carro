type Milliseconds = number;

export interface GetParamsDto<T> {
  payload: T;
  key: string;
  ttl: Milliseconds;
}
