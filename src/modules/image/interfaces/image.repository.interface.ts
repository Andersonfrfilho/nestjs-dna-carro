import { Image } from '@modules/image/image.entity';

export const IMAGE_REPOSITORY = 'IMAGE_REPOSITORY';

export interface ImageRepositoryInterface {
  save(props: Partial<Image>): Promise<Image>;
}
