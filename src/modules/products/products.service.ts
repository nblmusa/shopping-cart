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
import { Cart } from '../carts/entities/cart.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  /**
   * Search for a product by name in a specific category
   * @param name
   * @param categoryId
   */
  async getByName(name: string, categoryId: string): Promise<Product> {
    return await this.productsRepository
      .createQueryBuilder('products')
      .where('products.name = :name')
      .andWhere('products.category_id = :categoryId')
      .setParameters({ name, categoryId })
      .getOne();
  }

  /**
   * @param categoryId
   */
  async getCategoryById(categoryId: string): Promise<Category> {
    return await this.productsRepository
      .createQueryBuilder('categories')
      .where('categories.id = :categoryId')
      .setParameter('categoryId', categoryId)
      .getOne();
  }

  /**
   * Get all products in a category
   * @param categoryId
   */
  async getAllByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.productsRepository.find({ categoryId });
  }

  /**
   * Add product
   * @param createProductDto
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
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

  /**
   * Retrieve all products
   */
  async findAll(): Promise<{ totalCount: number; items: Product[] }> {
    return {
      totalCount: await this.productsRepository.count(),
      items: await this.productsRepository.find(),
    };
  }

  /**
   * Get product details
   * @param {string} id - product ID
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  /**
   * Update product details
   * @param id
   * @param updateProductDto
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    // Check if category exists before changing category
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

  /**
   * Remove a specific product
   * @param id
   */
  async remove(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    // Make sure product is not currently added to cart.
    if (await this.checkIfProductIsInCart(id)) {
      throw new NotAcceptableException('Product is currently added to cart.');
    }

    await this.productsRepository.delete(id);
    return product;
  }

  /**
   * @param productId
   */
  async checkIfProductIsInCart(productId: string): Promise<boolean> {
    return !!(await this.cartsRepository
      .createQueryBuilder('carts')
      .where('carts.productId = :productId')
      .setParameter('productId', productId)
      .getCount());
  }
}
