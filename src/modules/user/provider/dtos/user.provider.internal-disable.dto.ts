import { IsString } from 'class-validator';

export class UserProviderInternalDisableParamsDto {
  @IsString({ message: 'userId must be a string' })
  userId: string;
}

export type UserProviderInternalDisableServiceParamsDto =
  UserProviderInternalDisableParamsDto;
export class UserProviderInternalDisableControllerParamsDto extends UserProviderInternalDisableParamsDto {}
