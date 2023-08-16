interface ErrorCustomParamsDTO<T> {
  message: string;
  contents?: Array<T>;
  code: number;
  statusCode: number;
}
export class ErrorCustom<T> {
  public message: string;
  public code: number;
  public contents?: Array<T>;
  public statusCode: number;

  constructor({
    message,
    code,
    contents,
    statusCode,
  }: ErrorCustomParamsDTO<T>) {
    this.message = message;
    this.code = code;
    this.contents = contents ?? undefined;
    this.statusCode = statusCode;
  }
}
