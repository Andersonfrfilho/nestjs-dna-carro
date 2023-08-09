import { Phone } from '@modules/phone/phone.entity';
import { PhoneRepositoryParamsDTO } from '../phone.repository.dto';

export const PHONE_REPOSITORY = 'PHONE_REPOSITORY';

export interface PhoneRepositoryInterface {
  save(props: Partial<Phone>): Promise<Phone>;
  findByCountryCodeDDDNumberUser(
    props: PhoneRepositoryParamsDTO,
  ): Promise<Phone | null>;
}
