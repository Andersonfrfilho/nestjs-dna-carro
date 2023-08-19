export interface LoggerParamsDto {
  message: string;
  params?: any;
}

export interface ParamsObfuscateInformation {
  keys: string[];
  obfuscateWith: (param: string | number) => string;
}

export interface ObfuscatorObjectParamsDto {
  params: any[];
  obfuscatorConfigs: ParamsObfuscateInformation[];
  typeAcceptToFormats: string[];
}
