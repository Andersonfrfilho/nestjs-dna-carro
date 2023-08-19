import { Phone } from '@modules/phone/phone.entity';
import { PhoneRepositoryParamsDto } from '../phone.repository.dto';

export const PHONE_REPOSITORY = 'PHONE_REPOSITORY';

export interface PhoneRepositoryInterface {
  save(props: Partial<Phone>): Promise<Phone>;
  findByCountryCodeDDDNumberUser(
    props: PhoneRepositoryParamsDto,
  ): Promise<Phone | null>;
}
