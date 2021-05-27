import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getByName(name: string, categoryId: string) {
    return await this.productsRepository
      .createQueryBuilder('products')
      .where('products.name = :name')
      .andWhere('products.category_id = :categoryId')
      .setParameters({ name, categoryId })
      .getOne();
  }

  async getCategoryById(categoryId: string) {
    return await this.productsRepository
      .createQueryBuilder('categories')
      .where('categories.id = :categoryId')
      .setParameter('categoryId', categoryId)
      .getOne();
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.getByName(
      createProductDto.name,
      createProductDto.categoryId,
    );

    if (product) {
      throw new NotAcceptableException('Product already exist in category.');
    }

    if (createProductDto.categoryId) {
      const category = await this.categoriesRepository.findOne(
        createProductDto.categoryId,
      );

      if (!category) {
        throw new NotFoundException('Category does not exist.');
      }
    }

    return await this.productsRepository.save(
      this.productsRepository.create(createProductDto),
    );
  }

  async findAll(): Promise<{ totalCount: number; items: Product[] }> {
    return {
      totalCount: await this.productsRepository.count(),
      items: await this.productsRepository.find(),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (updateProductDto.categoryId) {
      const category = await this.getCategoryById(updateProductDto.categoryId);

      if (!category) {
        throw new NotFoundException('Category does not exist.');
      }
    }

    for (const field in updateProductDto) {
      product[field] = updateProductDto[field];
    }

    return await this.productsRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    //todo: check product in cart

    await this.productsRepository.delete(id);
    return product;
  }
}
