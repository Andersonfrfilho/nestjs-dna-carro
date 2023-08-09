import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { UserRepositoryInterface } from '@modules/user/interfaces/repositories/user.repository.interface';
import { UserPhone } from '../entities/user.phone.entity';
import { UserFindByPhoneParamsDTO } from '../dto/user.repository.dto';
import {
  PHONE_REPOSITORY,
  PhoneRepositoryInterface,
} from '@src/modules/phone/interfaces/phone.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(PHONE_REPOSITORY)
    private phoneRepository: PhoneRepositoryInterface,
    @InjectRepository(UserPhone)
    private userPhoneRepository: Repository<UserPhone>,
  ) {}
  async findByCpf(cpfParam: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { cpf: cpfParam } });
  }
  async findByEmail(emailParam: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: emailParam } });
  }
  async findByPhone(
    phoneParams: UserFindByPhoneParamsDTO,
  ): Promise<UserPhone[] | null> {
    const phone = await this.phoneRepository.findByCountryCodeDDDNumberUser(
      phoneParams,
    );

    if (!phone) {
      return null;
    }

    return this.userPhoneRepository.find({
      where: {
        phoneId: phone.id,
      },
    });
  }
  async save(props: Partial<User>): Promise<User> {
    return this.userRepository.save(props);
  }
}
