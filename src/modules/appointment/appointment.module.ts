import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentAddress } from './entities/appointment.address.entity';
import { AppointmentClient } from './entities/appointment.client.entity';
import { AppointmentPaymentTypes } from './entities/appointment.payment-type.entity';
import { AppointmentProvider } from './entities/appointment.provider.entity';
import { AppointmentService } from './entities/appointment.service.entity';
import { AppointmentRepository } from './appointment.repository';
import { LoggerModule } from '@src/providers/logger/logger.module';
import { APPOINTMENT_REPOSITORY } from './interfaces/appointment.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AppointmentAddress,
      AppointmentClient,
      AppointmentPaymentTypes,
      AppointmentProvider,
      AppointmentService,
    ]),
    LoggerModule,
  ],
  providers: [
    {
      provide: APPOINTMENT_REPOSITORY,
      useClass: AppointmentRepository,
    },
  ],
  exports: [APPOINTMENT_REPOSITORY],
})
export class AppointmentModule {}
