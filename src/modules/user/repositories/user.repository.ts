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
import {
  FindByDocumentActiveUserParamsDto,
  FindByPhoneActiveUserParamsDto,
  UpdatePasswordByEmailParamsDto,
} from '../dto/user.dto';

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
  async findByIdActiveWithTypes(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          active: true,
          id,
        },
        relations: ['userTypesUsers'],
      });
      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByIdActiveWithTypes -', {
        error: { ...error, userId: id },
      });

      throw error;
    }
  }
  async findByDocumentActive(
    documentParamsDto: FindByDocumentActiveUserParamsDto,
  ): Promise<User | null> {
    try {
      const { document, documentType } = documentParamsDto;
      const user = await this.userRepository.findOne({
        where: {
          active: true,
          document,
          documentType,
        },
      });

      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByDocumentActive -', {
        error,
      });

      throw error;
    }
  }
  async findByPhoneActiveUser(
    phone: FindByPhoneActiveUserParamsDto,
  ): Promise<User | null> {
    try {
      const { countryCode, ddd, number } = phone;
      const user = await this.userRepository.findOne({
        where: {
          active: true,
          userPhones: {
            phone: {
              ddd,
              number,
              countryCode,
            },
          },
        },
      });

      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByPhoneActiveUser -', {
        error,
      });

      throw error;
    }
  }
  async updatePasswordByEmailUserActive(
    data: UpdatePasswordByEmailParamsDto,
  ): Promise<void> {
    try {
      await this.userRepository.update(
        { email: data.email, active: true },
        { password_hash: data.passwordHash },
      );
    } catch (error) {
      this.loggerProvider.error(
        'UserRepository - updatePasswordByEmailUserActive -',
        {
          error,
        },
      );

      throw error;
    }
  }
  async inactiveUserByEmail(emailParam: string): Promise<void> {
    try {
      await this.userRepository.update(
        { email: emailParam },
        { active: false },
      );
    } catch (error) {
      this.loggerProvider.error('UserRepository - inactiveUserByEmail -', {
        error,
      });

      throw error;
    }
  }

  async findByIdActive(idParam: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: idParam, active: true },
      });

      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByIdActive -', {
        error,
      });

      throw error;
    }
  }
  async findByEmailActive(emailParam: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: emailParam, active: true },
      });
      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByEmailActive -', {
        error,
      });

      throw error;
    }
  }
  async findByCpf(documentParam: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { document: documentParam },
      });

      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByEmail -', {
        error,
      });

      throw error;
    }
  }
  async findByEmail(emailParam: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: emailParam },
      });

      return user;
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByEmail -', {
        error,
      });

      throw error;
    }
  }
  async findByPhone(
    phoneParams: UserFindByPhoneParamsDto,
  ): Promise<UserPhone[] | null> {
    try {
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
    } catch (error) {
      this.loggerProvider.error('UserRepository - findByPhone -', {
        error,
      });

      throw error;
    }
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
