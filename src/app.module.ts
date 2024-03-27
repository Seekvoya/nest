import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PhotoModule } from "./products/photo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Product } from "./products/entites/product.entity";
import { Photo } from "./products/entites/photo.entity";

@Module ( {
    imports: [
        ConfigModule.forRoot( {
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [Product, Photo],
          synchronize: true,
          autoLoadEntities: true
        }),
        ProductsModule, 
        PhotoModule,
      ],
      controllers: [AppController],
      providers: [AppService],
})
export class AppModule {}