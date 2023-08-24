import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageRepositoryInterface } from './interfaces/image.repository.interface';
import { Image } from './image.entity';

@Injectable()
export class ImageRepository implements ImageRepositoryInterface {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  async save(props: Partial<Image>): Promise<Image> {
    return this.imageRepository.save(props);
  }
}
