import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entites/product.entity';
import { Photo } from './entites/photo.entity';
import { PhotoService } from './photo.service';
import { PhotoModule } from './photo.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product, Photo])],
  // exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService, PhotoService]
})
export class ProductsModule {}
