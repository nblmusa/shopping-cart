import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('api/categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Category Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Category Already Exists' })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<{ message: string }> {
    await this.categoriesService.create(createCategoryDto);
    return { message: 'Category created successfully.' };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  async findAll(): Promise<{ totalCount: number, items: Category[] }> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<{ message: string }> {
    await this.categoriesService.update(id, updateCategoryDto);
    return { message: 'Category updated successfully.' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 404, description: 'Category Not Found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoriesService.remove(id);
    return { message: 'Category removed successfully.' };
  }
}
