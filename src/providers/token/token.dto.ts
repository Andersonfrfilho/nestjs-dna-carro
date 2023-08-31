export interface TokenProviderAssignParamsDto<T> {
  payloadParams: T;
  expiresIn: string;
}

export interface TokenProviderVerifyParamsDto {
  token: string;
}
