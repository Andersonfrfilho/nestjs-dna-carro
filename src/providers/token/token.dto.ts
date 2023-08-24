export interface TokenProviderAssignParamsDto<T> {
  payloadParams: T;
  expiresIn: number;
}

export interface TokenProviderVerifyParamsDto {
  token: string;
}
