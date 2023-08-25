import config from '@src/config';
import { Inject, Injectable } from '@nestjs/common';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';

import {
  HTTP_INTERCEPTOR_PROVIDER,
  HttpInterceptorProviderInterface,
} from '../http/http.interceptor.interface';
import { StorageProviderInterface } from './storage.provider.interface';
import { StorageUploadBase64ParamsDto } from './dtos/storage.uploadBase64.dto';
import { Storage } from '@google-cloud/storage';
import { Readable, Stream } from 'stream';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageProvider implements StorageProviderInterface {
  private bucketName: string;
  private pathKeyJson: string;
  constructor(
    @Inject(HTTP_INTERCEPTOR_PROVIDER)
    private readonly httpInterceptorProvider: HttpInterceptorProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {}

  async uploadImageProfileBase64({
    imageBase64,
  }: StorageUploadBase64ParamsDto): Promise<void> {
    try {
      const bufferStream = new Readable();
      bufferStream.push(Buffer.from(imageBase64, 'base64'));
      bufferStream.push(null); // Indique o fim do fluxo

      const storage = new Storage({
        keyFilename: config.storage.image.profile.keyFileJson,
      }).bucket(config.storage.image.profile.name);

      const fileName = `${randomUUID()}.png`;
      const file = storage.file(fileName);
      await file.save(
        Buffer.from(
          imageBase64.replace(/^data:image\/(png|gif|jpeg);base64,/, ''),
          'base64',
        ),
        {
          contentType: 'image/png',
          metadata: {
            custom: 'metadata',
          },
          public: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
}
