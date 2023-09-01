import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { UserRepositoryInterface } from '@modules/user/interfaces/repositories/user.repository.interface';
import { UserPhone } from '../entities/user.phone.entity';
import { UserFindByPhoneParamsDto } from '../dto/user.repository.dto';
import {
  PHONE_REPOSITORY,
  PhoneRepositoryInterface,
} from '@src/modules/phone/interfaces/phone.repository.interface';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import { UpdatePasswordByEmailParamsDto } from '../dto/user.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(PHONE_REPOSITORY)
    private phoneRepository: PhoneRepositoryInterface,
    @InjectRepository(UserPhone)
    private userPhoneRepository: Repository<UserPhone>,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async updatePasswordByEmailUserActive(
    data: UpdatePasswordByEmailParamsDto,
  ): Promise<void> {
    await this.userRepository.update(
      { email: data.email, active: true },
      { password_hash: data.passwordHash },
    );
  }
  async inactiveUserByEmail(emailParam: string): Promise<void> {
    await this.userRepository.update({ email: emailParam }, { active: false });
  }
  async findUserByPhoneActiveUserActive(
    phoneParams: UserFindByPhoneParamsDto,
  ): Promise<User | null> {
    const phone =
      await this.phoneRepository.findByCountryCodeDDDNumberUserActive(
        phoneParams,
      );

    if (!phone) {
      return null;
    }

    const [usersPhones] = await this.userPhoneRepository.find({
      where: {
        phoneId: phone.id,
        active: true,
        confirm: true,
        user: {
          active: true,
        },
      },
    });

    if (!usersPhones.user) {
      return null;
    }

    return usersPhones.user;
  }
  async findByIdActive(idParam: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: idParam, active: true },
    });
  }
  async findByEmailActive(emailParam: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: emailParam, active: true },
    });
  }
  async findByCpf(cpfParam: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { cpf: cpfParam } });
  }
  async findByEmail(emailParam: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: emailParam } });
  }
  async findByPhone(
    phoneParams: UserFindByPhoneParamsDto,
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
    try {
      const user = await this.userRepository.save(props);
      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - save -', {
        error,
      });

      throw error;
    }
  }
}
