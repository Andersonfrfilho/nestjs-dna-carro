import { IsEnum, IsString } from 'class-validator';
import { NameSessionTypeFlow } from '../auth.constant';

export class AuthPathParamDto {
  @IsEnum(NameSessionTypeFlow)
  type: NameSessionTypeFlow;
}

export class AuthCreateSessionDto extends AuthPathParamDto {
  @IsString()
  user: string;

  @IsString()
  password: string;
}

export class AuthCreateSessionBodyControllerParamsDto {
  @IsString()
  user: string;

  @IsString()
  password: string;
}

export class AuthCreateSessionServiceParamsDto extends AuthCreateSessionDto {}

export class AuthCreateSessionResponseDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export class AuthCreateSessionServiceResponse extends AuthCreateSessionResponseDto {}

export class AuthCreateSessionControllerResponse extends AuthCreateSessionResponseDto {}
