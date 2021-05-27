import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) { }

  async getByName(name: string) {
    return await this.categoriesRepository
      .createQueryBuilder('categories')
      .where('categories.name = :name')
      .setParameter('name', name)
      .getOne();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.getByName(createCategoryDto.name);

    if (category) {
      throw new NotAcceptableException('Category already exists.');
    }

    return await this.categoriesRepository.save(this.categoriesRepository.create(createCategoryDto));
  }

  async findAll(): Promise<{totalCount: number, items: Category[]}> {

    return {
      totalCount: await this.categoriesRepository.count(),
      items: await this.categoriesRepository.find()
    }
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    for(const field in updateCategoryDto) {
      category[field] = updateCategoryDto[field];
    }

    return await this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    // TODO: check if there is product with category before removing

    await this.categoriesRepository.delete(id);
    return category;
  }
}
