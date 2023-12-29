import { PaymentType } from '../payments-types.entity';

export const PAYMENTS_TYPES_REPOSITORY = 'PAYMENTS_TYPES_REPOSITORY';

export interface PaymentTypeRepositoryInterface {
  findByName(name: string): Promise<PaymentType | null>;
}
