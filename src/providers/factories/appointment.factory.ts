import { faker } from '@faker-js/faker/locale/pt_BR';
import { ParamsFactoryGeneric } from './interface.factory';
import { Appointment } from '../../modules/appointment/entities/appointment.entity';
import { AppointmentStatus } from '../../modules/appointment/appointment.constant';

interface ParamsDto extends Partial<Appointment>, ParamsFactoryGeneric {}

export class AppointmentFactory {
  public generate({
    quantity = 1,
    ...rest
  }: ParamsDto): Partial<Appointment>[] {
    const arrayAppointments = Array.from(
      { length: quantity },
      (): Partial<Appointment> => {
        const dataFaker: Appointment = {
          id: faker.string.uuid(),
          initialDate: faker.date.past().getTime(),
          finalDate: faker.date.future().getTime(),
          confirm: faker.datatype.boolean(),
          status: faker.helpers.arrayElement(Object.values(AppointmentStatus)),
          duration: faker.number.int({
            min: 1000 * 60 * 15,
            max: 1000 * 60 * 60 * 8,
          }),
        } as any;

        return {
          ...dataFaker,
          ...rest,
        };
      },
    );
    return arrayAppointments;
  }
}
