import { StorageUploadBase64ParamsDto } from './dtos/storage.uploadBase64.dto';

export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';

export interface StorageProviderInterface {
  uploadImageProfileBase64(data: StorageUploadBase64ParamsDto): Promise<any>;
}
