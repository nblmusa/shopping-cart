import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

//TODO: add test cases
describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategories: Category[] = [
    { id: '1', name: 'food', description: 'test' },
    { id: '2', name: 'clothing', description: 'test' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            save: jest.fn().mockResolvedValue(mockCategories[0]),
            find: jest.fn().mockResolvedValue(mockCategories),
            count: jest.fn().mockResolvedValue(mockCategories.length),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = {
        items: [...mockCategories],
        totalCount: mockCategories.length,
      };

      expect(await controller.findAll()).toEqual(result);
    });
  });
});
