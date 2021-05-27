import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let findOne: jest.Mock;

  const mockCategories: Category[] = [
    { id: '1', name: 'food', description: 'test' },
    { id: '2', name: 'clothing', description: 'test' },
  ];

  beforeEach(async () => {
    findOne = jest.fn();

    const getOne = jest.fn().mockReturnValue({});
    const setParameter = jest.fn(() => ({ getOne }));
    const where = jest.fn(() => ({ setParameter }));
    const mockCreateQueryBuilder = jest.fn(() => ({ where }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn().mockResolvedValue(mockCategories[0]),
            save: jest.fn().mockResolvedValue(mockCategories[0]),
            find: jest.fn().mockResolvedValue(mockCategories),
            count: jest.fn().mockResolvedValue(mockCategories.length),
            delete: jest.fn().mockResolvedValue({}),
            createQueryBuilder: mockCreateQueryBuilder,
            findOne,
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('when creating category', () => {
    describe('with valid details', () => {
      beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

      it('should return category object', async () => {
        const createCategoryDto: CreateCategoryDto = {
          name: 'food',
          description: 'test',
        };
        jest
          .spyOn(service, 'getByName')
          .mockImplementation(() => Promise.resolve(null));
        expect(await service.create(createCategoryDto)).toEqual(
          mockCategories[0],
        );
      });
    });

    describe('that already exists', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        const createCategoryDto: CreateCategoryDto = {
          name: 'food',
          description: 'test',
        };
        jest
          .spyOn(service, 'getByName')
          .mockImplementation(() => Promise.resolve(mockCategories[0]));
        await expect(service.create(createCategoryDto)).rejects.toThrowError();
      });
    });
  });

  describe('when getting list of all categories', () => {
    it('should return list of category object', async () => {
      expect(await service.findAll()).toEqual({
        items: mockCategories,
        totalCount: mockCategories.length,
      });
    });
  });

  describe('when getting category details', () => {
    describe('that exists', () => {
      beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

      it('should return category object', async () => {
        expect(await service.findOne('1')).toEqual(mockCategories[0]);
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(service.findOne('3')).rejects.toThrowError();
      });
    });
  });

  describe('when updating category details', () => {
    describe('that exists', () => {
      beforeEach(() => {
        findOne.mockReturnValue({ ...mockCategories[0], name: 'test' });
      });

      it('should return updated category object', async () => {
        const result = await service.update('1', {
          name: 'test',
        } as UpdateCategoryDto);
        expect(typeof result).toEqual('object');
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(
          service.update('3', { name: 'test' } as UpdateCategoryDto),
        ).rejects.toThrowError();
      });
    });
  });

  describe('when removing a category', () => {
    beforeEach(() => findOne.mockReturnValue(mockCategories[0]));

    describe('that exists', () => {
      it('should return removed object', async () => {
        const result = await service.remove('1');
        expect(typeof result).toEqual('object');
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => findOne.mockReturnValue(undefined));

      it('should throw an error', async () => {
        await expect(service.remove('3')).rejects.toThrowError();
      });
    });
  });

  describe('getByName', () => {
    beforeEach(() => findOne.mockReturnValue({}));

    it('should return an object', async () => {
      const result = await service.getByName('test');
      expect(typeof result).toEqual('object');
    });
  });
});
