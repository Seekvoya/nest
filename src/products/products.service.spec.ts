import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      controllers:[ProductsController]
    })
    .overrideProvider(ProductsService)
    .useValue(mockProductsService)
    .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', () => {
    expect(service.create({id: 5, name: 'something2', cost: 5000, stock: 10, photos: []})).toEqual({
      cost: expect.any(Number),
      id: expect.any(Number), 
      name: 'something2',
      photos: expect.anything(),
      stock: expect.any(Number)
    })
  })
});
