interface CustomExceptionParamsDTO<T> {
  message: string;
  contents?: Array<T>;
  code: number;
  statusCode: number;
}
export class CustomException<T> {
  public message: string;
  public code: number;
  public contents?: Array<T>;
  public statusCode: number;

  constructor({
    message,
    code,
    contents,
    statusCode,
  }: CustomExceptionParamsDTO<T>) {
    this.message = message;
    this.code = code;
    this.contents = contents ?? undefined;
    this.statusCode = statusCode;
  }
}
