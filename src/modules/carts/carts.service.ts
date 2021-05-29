import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  /**
   * Add product to cart
   * @param {CreateCartDto} createCartDto
   * @param {string} userId
   */
  async addItem(createCartDto: CreateCartDto, userId: string): Promise<Cart> {
    createCartDto.userId = userId;
    createCartDto.quantity = createCartDto.quantity
      ? createCartDto.quantity
      : 1;

    // Don't add duplicate product
    if (
      await this.cartsRepository.findOne({
        productId: createCartDto.productId,
        userId,
      })
    ) {
      throw new NotAcceptableException('Product is already in cart.');
    }

    // Check and throw exception if product doesn't exist
    await this.productsService.findOne(createCartDto.productId);

    return await this.cartsRepository.save(
      this.cartsRepository.create(createCartDto),
    );
  }

  /**
   * Retrieve all items in user's cart
   * @param userId
   */
  async findAllItems(userId: string,): Promise<{ totalCount: number; items: Cart[]; subTotal: number }> {
    const cartItems = await this.cartsRepository.find({
      where: { userId },
      relations: ['product'],
    });

    return {
      totalCount: cartItems.length,
      subTotal: this.calculateSubTotal(cartItems),
      items: cartItems,
    };
  }

  /**
   * Calculate sub total of the products in a cart by checking the selling price and quantity of each product
   * @param items
   */
  calculateSubTotal(items: Cart[]): number {
    let subTotal = 0;
    items.map((item: Cart) => (subTotal += item.product.sellingPrice * item.quantity));
    return subTotal;
  }

  /**
   * Update the item that's already in cart (e.g.: increase/decrease quantity)
   * @param productId
   * @param updateCartDto
   * @param userId
   */
  async updateItem(
    productId: string,
    updateCartDto: UpdateCartDto,
    userId: string,
  ): Promise<Cart> {
    // Check if product has been added to cart first
    const cart: Cart = await this.cartsRepository.findOne({
      productId,
      userId,
    });
    if (!cart) {
      throw new NotFoundException('Product is not in cart.');
    }

    // Check if there are enough product quantity available in stock
    if (updateCartDto.quantity) {
      const product: Product = await this.productsService.findOne(productId);

      if (updateCartDto.quantity > product.stockLevel) {
        throw new NotAcceptableException(
          'Not enough quantity available for this product.',
        );
      }
    }

    return await this.cartsRepository.save({ ...cart, ...updateCartDto });
  }

  /**
   * Remove an item from user's cart
   * @param {string} productId
   * @param {string} userId
   */
  async removeItem(productId: string, userId: string): Promise<Cart> {

    const cartItem: Cart = await this.cartsRepository.findOne({ productId, userId })
    if (!cartItem) {
      throw new NotFoundException('Product is not in cart.');
    }

    await this.cartsRepository.delete({ productId, userId });
    return cartItem;
  }

  /**
   * Clear all items in user's cart
   * @param {string} userId
   */
  clearItems(userId: string): Promise<DeleteResult> {
    return this.cartsRepository.delete({ userId });
  }
}
