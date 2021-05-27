import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsUUID, Length } from 'class-validator';
import { Column, ManyToOne, RelationId } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

export class UpdateProductDto {
  @ApiProperty({ required: false, example: 'Apple' })
  @IsOptional()
  @Length(3, 255)
  name?: string;

  @ApiProperty({ required: false, example: 'Pink lady apple' })
  @IsOptional()
  @Length(3, 255)
  description?: string;

  @ApiProperty({
    required: false,
    example: '30622f0c-06a9-44c4-be11-4e12f41e5191',
  })
  @IsOptional()
  @IsUUID()
  @IsNumber({ maxDecimalPlaces: 2 })
  categoryId: string;

  @ApiProperty({ required: false, example: 200.0 })
  @IsOptional()
  sellingPrice: number;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  stockLevel: number;

  @ApiProperty({ required: false, example: '2022-06-07' })
  @IsOptional()
  @IsDate()
  expirationDate: Date;
}
