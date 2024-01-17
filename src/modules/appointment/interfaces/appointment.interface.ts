import { AppointmentAddress } from '../entities/appointment.address.entity';
import { AppointmentClient } from '../entities/appointment.client.entity';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentPaymentTypes } from '../entities/appointment.payment-type.entity';
import { AppointmentProvider } from '../entities/appointment.provider.entity';
import { AppointmentService } from '../entities/appointment.service.entity';

export const APPOINTMENT_REPOSITORY = 'APPOINTMENT_REPOSITORY';

export interface AppointmentRepositoryInterface {
  save(params: Partial<Appointment>): Promise<Appointment>;
  findById(params: string): Promise<Appointment | null>;
  findByIdWithProviders(params: string): Promise<Appointment | null>;
  saveAddress(
    params: Partial<AppointmentAddress>,
  ): Promise<AppointmentAddress | null>;
  saveClient(
    params: Partial<AppointmentClient>,
  ): Promise<AppointmentClient | null>;
  savePaymentType(
    params: Partial<AppointmentPaymentTypes>,
  ): Promise<AppointmentPaymentTypes | null>;
  saveProvider(
    params: Partial<AppointmentProvider>,
  ): Promise<AppointmentProvider | null>;
  saveService(
    params: Partial<AppointmentService>,
  ): Promise<AppointmentService | null>;
  update(params: Partial<Appointment>): Promise<Appointment | null>;
}
