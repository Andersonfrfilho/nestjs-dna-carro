import { faker } from '@faker-js/faker/locale/pt_BR';
import { ParamsFactoryGeneric } from './interface.factory';
import { Phone } from '../../modules/phone/phone.entity';
import { COUNTRY_CODE_BRAZIL } from '../../modules/phone/phone.constant';

interface ParamsDto extends Partial<Phone>, ParamsFactoryGeneric {}

export class PhonesFactory {
  public generate({ quantity = 1, ...rest }: ParamsDto): Partial<Phone>[] {
    const numbers: string[] = [];
    const countryCode = '55';
    let number = '';
    let ddd = '';
    const items = Array.from({ length: quantity }, (): Partial<Phone> => {
      number = faker.string.numeric('########');
      ddd = faker.string.numeric('##');

      while (numbers.includes(countryCode + ddd + number)) {
        number = faker.string.numeric('########');
        ddd = faker.string.numeric('##');
      }

      numbers.push(countryCode + ddd + number);

      const dataFaker: Phone = {
        id: faker.string.uuid(),
        active: faker.datatype.boolean(),
        number,
        ddd,
        countryCode: COUNTRY_CODE_BRAZIL,
      };

      return {
        ...dataFaker,
        ...rest,
      };
    });
    return items;
  }
}
