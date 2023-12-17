import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import {
  USER_PROVIDER_CREATE_SERVICE,
  UserProviderCreateServiceInterface,
} from './interfaces/user.provider.create.interface';
import { UserProviderCreateControllerParamsDto } from './dtos/user.provider.create.dto';

@Controller('user/provider')
export class UserProviderController {
  constructor(
    @Inject(USER_PROVIDER_CREATE_SERVICE)
    private userProviderCreateService: UserProviderCreateServiceInterface,
  ) {}
  @Post('')
  async create(
    @Body(new ValidationPipe()) create: UserProviderCreateControllerParamsDto,
  ): Promise<void> {
    await this.userProviderCreateService.execute(create);
  }

  //   @Delete('/:userId')
  //   async desative() {

  //   }

  //   @Post('/hours/available') {

  // }

  // @Post('/services') {

  //   }

  // @Post('services/desative') {

  //   }

  // @Get('/:userId/appointments') {

  // }

  // @Get('/:userId/appointments/:appointmentId') {

  // }
}
