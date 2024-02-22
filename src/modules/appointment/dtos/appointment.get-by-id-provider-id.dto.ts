import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AppointmentGetDto {
  @PrimaryGeneratedColumn()
  id: string;

  @IsString()
  providerId: string;
}

export class AppointmentGetByIdProviderIdRepositoryParamsDto extends AppointmentGetDto {}
