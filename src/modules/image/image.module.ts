import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { IMAGE_REPOSITORY } from './interfaces/image.repository.interface';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [
    {
      provide: IMAGE_REPOSITORY,
      useClass: ImageRepository,
    },
  ],
  exports: [IMAGE_REPOSITORY],
})
export class ImageModule {}
