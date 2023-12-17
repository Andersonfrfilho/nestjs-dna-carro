import { IsNotEmpty, IsString } from 'class-validator';

export class UserProviderCreateParamsDto {
  @IsNotEmpty({ message: 'provider must be a string' })
  @IsString({ message: 'userId must be a string' })
  userId: string;
}

export type UserProviderCreateServiceParamsDto = UserProviderCreateParamsDto;
export type UserProviderCreateControllerParamsDto = UserProviderCreateParamsDto;
