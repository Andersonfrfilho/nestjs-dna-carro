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
import { randomUUID } from 'crypto';
import { CustomException } from '@src/error/custom.exception';
import { STORAGE_GOOGLE_BUCKET_ERROR } from './storage.error';

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
  async deleteImageProfile(fileName: string): Promise<void> {
    try {
      const name = fileName.replace(
        `https://storage.cloud.google.com/${config.storage.image.profile.name}/`,
        '',
      );
      await new Storage({
        keyFilename: config.storage.image.profile.keyFileJson,
      })
        .bucket(config.storage.image.profile.name)
        .file(name)
        .delete();
    } catch (error) {
      this.loggerProvider.error('StorageProvider - deleteImage', {
        error: error.message,
      });
      throw new CustomException(STORAGE_GOOGLE_BUCKET_ERROR);
    }
  }

  async uploadImageProfileBase64({
    imageBase64,
  }: StorageUploadBase64ParamsDto): Promise<string> {
    try {
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
      return `https://storage.cloud.google.com/${config.storage.image.profile.name}/${fileName}`;
    } catch (error) {
      this.loggerProvider.error('StorageProvider - uploadImageProfileBase64', {
        error: error.message,
      });
      throw new CustomException(STORAGE_GOOGLE_BUCKET_ERROR);
    }
  }
}
