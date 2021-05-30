import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/v1/cart')
@ApiTags('carts')
@ApiBearerAuth()
@Roles('admin', 'customer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Add item to user's cart
   * @param createCartDto
   * @param request
   */
  @Post('items')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({ status: 201, description: 'Product Added to Cart' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async addToCart(
    @Body() createCartDto: CreateCartDto,
    @Request() request,
  ): Promise<{ message: string }> {
    await this.cartsService.addItem(createCartDto, request.user.id);
    return { message: 'Product added to cart.' };
  }

  /**
   * List cart items of a user
   * @param request
   */
  @Get('items')
  @ApiOperation({ summary: 'List all products in user\'s cart' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 406,
    description: 'Quantity is more than stock level',
  })
  listCartItems(@Request() request): Promise<any> {
    return this.cartsService.findAllItems(request.user.id);
  }

  /**
   * Update item in user's cart (for example, increase/decrease quantity)
   * @param id
   * @param updateCartDto
   * @param request
   */
  @Patch('items/:id')
  @ApiOperation({ summary: 'Update cart (e.g: increase / decrease quantity' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product Not in Cart' })
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Request() request,
  ): Promise<{ message: string }> {
    await this.cartsService.updateItem(id, updateCartDto, request.user.id);
    return { message: 'Product updated.' };
  }

  /**
   * Remove an item from user's cart
   * @param {string} id
   * @param {Request} request
   */
  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove product from user\'s cart' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async removeItemFromCart(
    @Param('id') id: string,
    @Request() request,
  ): Promise<{ message: string }> {
    await this.cartsService.removeItem(id, request.user.id);
    return { message: 'Product removed from cart.' };
  }

  /**
   * Clear all cart items of a user
   * @param request
   */
  @Delete('items')
  @ApiOperation({ summary: 'Clear user\'s cart' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clearCartItems(@Request() request): Promise<{ message: string }> {
    await this.cartsService.clearItems(request.user.id);
    return { message: 'Cart cleared.' };
  }
}
