import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { Photo } from './entites/photo.entity';
import { PhotoService } from './photo.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
