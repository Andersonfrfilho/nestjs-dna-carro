export interface LoggerParamsDTO {
  message: string;
  params?: any;
}

export interface ParamsObfuscateInformation {
  keys: string[];
  obfuscateWith: (param: string | number) => string;
}

export interface ObfuscatorObjectParamsDTO {
  params: any[];
  obfuscatorConfigs: ParamsObfuscateInformation[];
  typeAcceptToFormats: string[];
}
