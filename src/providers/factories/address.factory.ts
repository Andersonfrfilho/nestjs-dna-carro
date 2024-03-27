import { faker } from '@faker-js/faker/locale/pt_BR';
import { ParamsFactoryGeneric } from './interface.factory';
import { Address } from '../../modules/address/address.entity';
import { COUNTRY_ADDRESS_CODE } from '../../modules/address/address.constante';

interface ParamsDto extends Partial<Address>, ParamsFactoryGeneric {}

export class AddressFactory {
  public generate({ quantity = 1, ...rest }: ParamsDto): Partial<Address>[] {
    const arrayUsers = Array.from(
      { length: quantity },
      (): Partial<Address> => {
        const dataFaker: Address = {
          id: faker.string.uuid(),
          city: faker.location.city(),
          complement: faker.location.streetAddress(),
          country: COUNTRY_ADDRESS_CODE.BRAZIL,
          district: faker.location.street(),
          latitude: faker.location.latitude().toString(),
          longitude: faker.location.longitude().toString(),
          number: faker.string.numeric('####'),
          state: faker.location.state(),
          street: faker.location.street(),
          zipcode: faker.location.zipCode(),
          reference: faker.lorem.paragraph(5),
          details: faker.lorem.paragraph(5),
        };

        return {
          ...dataFaker,
          ...rest,
        };
      },
    );
    return arrayUsers;
  }
}
