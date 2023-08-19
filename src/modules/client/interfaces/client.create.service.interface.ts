import { Address } from '@src/modules/address/address.entity';
import { Image } from '@src/modules/image/image.entity';
import { Phone } from '@src/modules/phone/phone.entity';
import { Term } from '@src/modules/term/term.entity';
import { User } from '@src/modules/user/entities/user.entity';

export interface ClientCreateServiceParamsdto {
  user: Partial<User>;
  phone: Partial<Phone>;
  address: Partial<Address>;
  photo: Partial<Image>;
  term: Partial<Term>;
}

export interface ClientCreateServiceInterface {
  execute(params: ClientCreateServiceParamsdto): Promise<void>;
}
