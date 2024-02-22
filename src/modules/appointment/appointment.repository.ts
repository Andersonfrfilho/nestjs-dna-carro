import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentAddress } from './entities/appointment.address.entity';
import { AppointmentClient } from './entities/appointment.client.entity';
import { AppointmentPaymentTypes } from './entities/appointment.payment-type.entity';
import { AppointmentProvider } from './entities/appointment.provider.entity';
import { AppointmentService } from './entities/appointment.service.entity';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  FindByIdWithProvidersByStatusWithPaginationRepositoryParamsDto,
  FindByIdWithProvidersByStatusWithPaginationRepositoryResultDto,
} from './interfaces/appointment.create.interface';
import { ORDER } from '../common/enums/commons.pagination.enum';
import { AppointmentStatus } from './appointment.constant';
import { AppointmentRepositoryInterface } from './interfaces/appointment.repository.interface';
import { AppointmentGetByIdProviderIdRepositoryParamsDto } from './dtos/appointment.get-by-id-provider-id.dto';

@Injectable()
export class AppointmentRepository implements AppointmentRepositoryInterface {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(AppointmentAddress)
    private appointmentAddressRepository: Repository<AppointmentAddress>,
    @InjectRepository(AppointmentClient)
    private appointmentClientRepository: Repository<AppointmentClient>,
    @InjectRepository(AppointmentProvider)
    private appointmentProviderRepository: Repository<AppointmentProvider>,
    @InjectRepository(AppointmentService)
    private appointmentServiceRepository: Repository<AppointmentService>,
    @InjectRepository(AppointmentPaymentTypes)
    private appointmentPaymentTypesRepository: Repository<AppointmentPaymentTypes>,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async findByIdProviderId(
    params: AppointmentGetByIdProviderIdRepositoryParamsDto,
  ): Promise<Appointment | null> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: {
          id: params.id,
          appointmentProvider: {
            providerId: params.providerId,
          },
        },
        relations: [
          'appointmentProvider',
          'appointmentProvider.provider',
          'appointmentAddresses',
          'appointmentAddresses.address',
          'appointmentClients',
          'appointmentClients.client.userClientImageProfiles.imageProfile',
          'appointmentService',
          'appointmentService.service',
          'events',
        ],
      });
      return appointment;
    } catch (error) {
      this.loggerProvider.error(
        'AppointmentRepository - findByIdProviderId -',
        {
          error,
        },
      );
      throw error;
    }
  }
  async findByIdWithProvidersByStatusWithPagination({
    page = '0',
    size = '10',
    status = AppointmentStatus.created,
    order = {
      field: 'createdAt',
      order: ORDER.ASC,
    },
    providerId,
  }: FindByIdWithProvidersByStatusWithPaginationRepositoryParamsDto): Promise<FindByIdWithProvidersByStatusWithPaginationRepositoryResultDto> {
    try {
      const appointments = await this.appointmentRepository.findAndCount({
        where: {
          status,
          appointmentProvider: {
            providerId,
          },
        },
        relations: [
          'appointmentProvider',
          'appointmentProvider.provider',
          'appointmentAddresses',
          'appointmentAddresses.address',
          'appointmentClients',
          'appointmentClients.client.userClientImageProfiles.imageProfile',
          'appointmentService',
          'appointmentService.service',
          'events',
        ],
        take: Number(size),
        skip: Number(page),
        order: {
          [order.field]: ORDER.ASC,
        },
      });
      return {
        data: appointments[0],
        total: appointments[1],
        page,
        size,
      };
    } catch (error) {
      this.loggerProvider.error(
        'AppointmentRepository - findByIdWithProvidersByStatusWithPagination -',
        {
          error,
        },
      );

      throw error;
    }
  }

  async findByIdWithProviders(providerId: string): Promise<Appointment | null> {
    try {
      const appointmentWithProviders = await this.appointmentRepository.findOne(
        {
          where: {
            id: providerId,
          },
          relations: ['providers'],
        },
      );
      return appointmentWithProviders;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - findByIdProviders -', {
        error,
      });

      throw error;
    }
  }
  async save(params: Partial<Appointment>): Promise<Appointment> {
    try {
      const appointment = await this.appointmentRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - save -', {
        error,
      });

      throw error;
    }
  }
  async findById(appointmentId: string): Promise<Appointment | null> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId },
      });
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - save -', {
        error,
      });

      throw error;
    }
  }
  async saveAddress(
    params: Partial<AppointmentAddress>,
  ): Promise<AppointmentAddress | null> {
    try {
      const appointment = await this.appointmentAddressRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - saveAddress -', {
        error,
      });

      throw error;
    }
  }
  async saveClient(
    params: Partial<AppointmentClient>,
  ): Promise<AppointmentClient | null> {
    try {
      const appointment = await this.appointmentClientRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - saveClient -', {
        error,
      });

      throw error;
    }
  }

  async savePaymentType(
    params: Partial<AppointmentPaymentTypes>,
  ): Promise<AppointmentPaymentTypes | null> {
    try {
      const appointment = await this.appointmentPaymentTypesRepository.save(
        params,
      );
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - savePaymentType -', {
        error,
      });

      throw error;
    }
  }

  async saveProvider(
    params: Partial<AppointmentProvider>,
  ): Promise<AppointmentProvider | null> {
    try {
      const appointment = await this.appointmentProviderRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - saveProvider -', {
        error,
      });

      throw error;
    }
  }

  async saveService(
    params: Partial<AppointmentService>,
  ): Promise<AppointmentService | null> {
    try {
      const appointment = await this.appointmentServiceRepository.save(params);
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - saveService -', {
        error,
      });

      throw error;
    }
  }

  async update(params: Partial<Appointment>): Promise<Appointment | null> {
    try {
      await this.appointmentServiceRepository.update({ id: params.id }, params);
      const appointment = await this.appointmentRepository.findOne({
        where: { id: params.id },
      });
      return appointment;
    } catch (error) {
      this.loggerProvider.error('AppointmentRepository - update -', {
        error,
      });

      throw error;
    }
  }
}
