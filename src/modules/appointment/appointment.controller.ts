import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  APPOINTMENT_CREATE_SERVICE,
  AppointmentCreateServiceInterface,
} from './interfaces/appointment.create.interface';
import { AppointmentCreateControllerParamsBodyDto } from './dtos/appointment.create.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(
    @Inject(APPOINTMENT_CREATE_SERVICE)
    private appointmentCreateService: AppointmentCreateServiceInterface,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body()
    appointmentControllerParamsBody: AppointmentCreateControllerParamsBodyDto,
  ): Promise<Appointment> {
    return this.appointmentCreateService.execute(
      appointmentControllerParamsBody,
    );
  }
}
