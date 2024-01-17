import { IsString } from 'class-validator';

export class UserProviderCreateParamsDto {
  @IsString({ message: 'userId must be a string' })
  userId: string;
}

export type UserProviderCreateServiceParamsDto = UserProviderCreateParamsDto;
export class UserProviderCreateControllerParamsDto extends UserProviderCreateParamsDto {}
