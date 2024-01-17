import { AppointmentCreateServiceParamsDto } from '../dtos/appointment.create.dto';
import { Appointment } from '../entities/appointment.entity';

export const APPOINTMENT_CREATE_SERVICE = 'APPOINTMENT_CREATE_SERVICE';

export interface AppointmentCreateServiceInterface {
  execute(data: AppointmentCreateServiceParamsDto): Promise<Appointment>;
}
