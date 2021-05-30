import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from './entities/product.entity';
import { Cart } from '../carts/entities/cart.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let findOne: jest.Mock;

  const mockCategories: Category[] = [
    { id: '1', name: 'food', description: 'test' },
    { id: '2', name: 'clothing', description: 'test' },
  ];

  const mockProducts: Product[] = [
    {
      id: 'a85bb6d7-a81b-40d6-915d-2e86cbf94a20',
      name: 'Apple',
      description: 'Pink lady apple',
      categoryId: 'fd829276-b918-400c-a56d-e8fff4ee607f',
      sellingPrice: 200,
      stockLevel: 100,
      expirationDate: new Date(),
      category: null,
    },
  ];

  beforeEach(async () => {
    findOne = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn().mockResolvedValue(mockCategories[0]),
            save: jest.fn().mockResolvedValue(mockCategories[0]),
            find: jest.fn().mockResolvedValue(mockCategories),
            count: jest.fn().mockResolvedValue(mockCategories.length),
            delete: jest.fn().mockResolvedValue({}),
            // createQueryBuilder: mockCreateQueryBuilder,
            findOne,
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProducts[0]),
            save: jest.fn().mockResolvedValue(mockProducts[0]),
            find: jest.fn().mockResolvedValue(mockProducts),
            count: jest.fn().mockResolvedValue(mockProducts.length),
            delete: jest.fn().mockResolvedValue({}),
            findOne,
          },
        },
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            save: jest.fn().mockResolvedValue([]),
            count: jest.fn().mockResolvedValue(0),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('when creating product', () => {
    describe('with valid details', () => {
      beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

      it('should return product object', async () => {
        const createProductDto: CreateProductDto = {
          name: 'Apple',
          description: 'Pink lady apple',
          categoryId: 'fd829276-b918-400c-a56d-e8fff4ee607f',
          sellingPrice: 200,
          stockLevel: 100,
          expirationDate: new Date(),
        };
        jest
          .spyOn(service, 'getByName')
          .mockImplementation(() => Promise.resolve(null));
        expect(await service.create(createProductDto)).toEqual(mockProducts[0]);
      });
    });

    describe('that already exists', () => {
      beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

      it('should throw an error', async () => {
        const createProductDto: CreateProductDto = {
          name: 'Apple',
          description: 'Pink lady apple',
          categoryId: 'fd829276-b918-400c-a56d-e8fff4ee607f',
          sellingPrice: 200,
          stockLevel: 100,
          expirationDate: new Date(),
        };
        jest
          .spyOn(service, 'getByName')
          .mockImplementation(() => Promise.resolve(mockProducts[0]));
        await expect(service.create(createProductDto)).rejects.toThrowError();
      });
    });

    describe('with invalid category', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        const createProductDto: CreateProductDto = {
          name: 'Apple',
          description: 'Pink lady apple',
          categoryId: 'fd829276-b918-400c-a56d-e8fff4ee607f',
          sellingPrice: 200,
          stockLevel: 100,
          expirationDate: new Date(),
        };
        jest
          .spyOn(service, 'getByName')
          .mockImplementation(() => Promise.resolve(mockProducts[0]));
        await expect(service.create(createProductDto)).rejects.toThrowError();
      });
    });
  });

  describe('when getting list of all products', () => {
    it('should return list of product object', async () => {
      expect(await service.findAll()).toEqual({
        items: mockProducts,
        totalCount: mockProducts.length,
      });
    });
  });

  describe('when getting product details', () => {
    describe('that exists', () => {
      beforeEach(() => findOne.mockReturnValue(mockProducts[0]));

      it('should return product object', async () => {
        expect(await service.findOne('1')).toEqual(mockProducts[0]);
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(service.findOne('3')).rejects.toThrowError();
      });
    });
  });

  describe('when updating product details', () => {
    describe('that exists', () => {
      beforeEach(() => {
        findOne.mockReturnValue({ ...mockProducts[0], name: 'test' });
      });

      it('should return updated product object', async () => {
        const result = await service.update('1', {
          name: 'test',
        } as UpdateProductDto);
        expect(typeof result).toEqual('object');
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(
          service.update('3', { name: 'test' } as UpdateProductDto),
        ).rejects.toThrowError();
      });
    });
  });

  describe('when removing a product', () => {
    beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

    describe('that exists and not in any cart', () => {
      it('should return removed object', async () => {
        jest
          .spyOn(service, 'checkIfProductIsInCart')
          .mockImplementation(() => Promise.resolve(Promise.resolve(false)));

        const result = await service.remove('1');
        expect(typeof result).toEqual('object');
      });
    });

    describe('that exists and in cart', () => {
      it('should throw an error', async () => {
        const productList: Product[] = [
          {
            id: 'a85bb6d7-a81b-40d6-915d-2e86cbf94a20',
            name: 'Apple',
            description: 'Pink lady apple',
            categoryId: 'fd829276-b918-400c-a56d-e8fff4ee607f',
            sellingPrice: 200,
            stockLevel: 100,
            expirationDate: new Date(),
            category: null,
          },
        ];

        jest
          .spyOn(service, 'checkIfProductIsInCart')
          .mockImplementation(() => Promise.resolve(true));
        await expect(service.remove('1')).rejects.toThrowError();
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(service.remove('3')).rejects.toThrowError();
      });
    });
  });
});
