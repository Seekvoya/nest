import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entites/product.entity';
import { query } from 'express';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
        return this.productService.findAll(query)
    };
    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new Error('Product does not exist in stock');
        } else {
            return product;
        };
    };

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return await this.productService.create(product);
    };

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
        return this.productService.update(id, product);
    };
    
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new Error('Product does not exist in stock');
        }
        return this.productService.delete(id)
    };
}
