interface ErrorCustomParamsDTO<T> {
  message: string;
  contents?: Array<T>;
  code: number;
}
export class ErrorCustom<T> {
  public message: string;
  public code: number;
  public contents?: Array<T>;

  constructor({ message, code, contents }: ErrorCustomParamsDTO<T>) {
    this.message = message;
    this.code = code;
    this.contents = contents ?? undefined;
  }
}
