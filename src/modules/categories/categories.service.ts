import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private productsService: ProductsService,
  ) {}

  /**
   * Search for a category by name
   * @param name
   */
  async getByName(name: string): Promise<Category> {
    return await this.categoriesRepository
      .createQueryBuilder('categories')
      .where('categories.name = :name')
      .setParameter('name', name)
      .getOne();
  }

  /**
   * Add a category
   * @param createCategoryDto
   */
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.getByName(createCategoryDto.name);

    if (category) {
      throw new NotAcceptableException('Category already exists.');
    }

    return await this.categoriesRepository.save(
      this.categoriesRepository.create(createCategoryDto),
    );
  }

  /**
   * Retrieve all categories
   */
  async findAll(): Promise<{ totalCount: number; items: Category[] }> {
    return {
      totalCount: await this.categoriesRepository.count(),
      items: await this.categoriesRepository.find(),
    };
  }

  /**
   * Retrieve a specific category
   * @param id
   */
  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return category;
  }

  /**
   * Update a specific category
   * @param id
   * @param updateCategoryDto
   */
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    for (const field in updateCategoryDto) {
      category[field] = updateCategoryDto[field];
    }

    return await this.categoriesRepository.save(category);
  }

  /**
   * Remove a specific category
   * @param id
   */
  async remove(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    // Check if category is currently used
    if (await this.productsService.getByCategoryId(id)) {
      throw new NotAcceptableException(
        'There are products currently assigned to this category.',
      );
    }

    await this.categoriesRepository.delete(id);
    return category;
  }
}
