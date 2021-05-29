import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Add product and assign a category
   * @param createProductDto
   */
  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 201, description: 'Product Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Product Already Exists' })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ message: string }> {
    await this.productsService.create(createProductDto);
    return { message: 'Product created successfully.' };
  }

  /**
   * Retrieve all products
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  async findAll(): Promise<{ totalCount: number; items: Product[] }> {
    return await this.productsService.findAll();
  }

  /**
   * Retrieve a specific product
   * @param id
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  /**
   * Update a specific product
   * @param id
   * @param updateProductDto
   */
  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string }> {
    await this.productsService.update(id, updateProductDto);
    return { message: 'Product updated successfully.' };
  }

  /**
   * Remove a specific product
   * @param id
   */
  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productsService.remove(id);
    return { message: 'Product removed successfully.' };
  }
}