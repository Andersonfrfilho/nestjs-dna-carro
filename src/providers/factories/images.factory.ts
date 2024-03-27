import { faker } from '@faker-js/faker/locale/pt_BR';
import { ParamsFactoryGeneric } from './interface.factory';
import { Image } from '../../modules/image/image.entity';

interface ParamsDto extends Partial<Image>, ParamsFactoryGeneric {
  type: string;
}

export class ImagesFactory {
  public generate({ quantity = 1, ...rest }: ParamsDto): Partial<Image>[] {
    const arrayImages = Array.from({ length: quantity }, (): Partial<Image> => {
      const dataFaker: Image = {
        id: faker.string.uuid(),
        url: faker.image.url(),
        type: rest.type,
      };

      return {
        ...dataFaker,
        ...rest,
      };
    });
    return arrayImages;
  }
}
