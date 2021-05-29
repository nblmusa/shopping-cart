import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/v1/categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Add category
   * @param createCategoryDto
   */
  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 201, description: 'Category Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Category Already Exists' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<{ message: string }> {
    await this.categoriesService.create(createCategoryDto);
    return { message: 'Category created successfully.' };
  }

  /**
   * Get the list of all categories
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  async findAll(): Promise<{ totalCount: number; items: Category[] }> {
    return await this.categoriesService.findAll();
  }

  /**
   * Get the details of a category
   * @param id
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.findOne(id);
  }

  /**
   * Update the details of a category
   * @param id
   * @param updateCategoryDto
   */
  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ message: string }> {
    await this.categoriesService.update(id, updateCategoryDto);
    return { message: 'Category updated successfully.' };
  }

  /**
   * Remove a specific category
   * @param id
   */
  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoriesService.remove(id);
    return { message: 'Category removed successfully.' };
  }
}
