import { IsEmail, IsString } from 'class-validator';

export class AuthCreateSessionDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AuthCreateSessionServiceParamsDto extends AuthCreateSessionDto {}

export class AuthCreateSessionControllerParamsDto extends AuthCreateSessionDto {}

export class AuthCreateSessionResponseDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export class AuthCreateSessionServiceResponse extends AuthCreateSessionResponseDto {}

export class AuthCreateSessionControllerResponse extends AuthCreateSessionResponseDto {}
