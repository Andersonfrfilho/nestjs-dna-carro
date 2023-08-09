type Milliseconds = number;

export interface GetParamsDTO<T> {
  payload: T;
  key: string;
  ttl: Milliseconds;
}
