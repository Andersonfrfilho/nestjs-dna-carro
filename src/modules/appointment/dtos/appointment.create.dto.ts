import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

export class AppointmentCreateDto {
  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  initialDate: string;

  @IsString()
  finalDate: string;

  @IsBoolean()
  confirm: boolean;

  @IsNumber()
  duration: number;

  @IsObject()
  details: any;
}

export class AppointmentCreateServiceParamsDto extends AppointmentCreateDto {}
export class AppointmentCreateServiceResultDto extends Appointment {}
export class AppointmentCreateControllerParamsBodyDto extends AppointmentCreateDto {}
