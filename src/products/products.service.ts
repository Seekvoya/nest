import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entites/product.entity';
import { Photo } from './entites/photo.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
         private readonly productRepository: Repository<Product>,
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>,
    ) {}

    async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
        return paginate(query, this.productRepository, {
            sortableColumns: ['id', 'name', 'stock', 'cost'],
            nullSort: 'last',
            defaultSortBy: [['id', 'DESC']],
            searchableColumns: ['name', 'cost'],
            select: ['id', 'name', 'cost', 'stock'],
            filterableColumns: {
                name: [FilterOperator.EQ, FilterSuffix.NOT],
                stock: true,
            },
        })
    };

    // async findAll(): Promise<Product[]> {
    //     return await this.productRepository.find()
    // };

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne( { where : {id}});
    };

    async create(product: Product): Promise<Product> {
        const newProduct = await this.productRepository.create(product);
        return await this.productRepository.save(newProduct)
    };

    async update(id: number, product: Product): Promise<Product> {
        await this.productRepository.update(id, product);
        return await this.productRepository.findOne( {where : { id } } ) 
    };

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id)
    };
};
