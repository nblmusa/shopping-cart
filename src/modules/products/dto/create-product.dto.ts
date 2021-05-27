import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true, example: 'Apple' })
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({ required: true, example: 'Pink lady apple' })
  @IsNotEmpty()
  @Length(3, 255)
  description: string;

  @ApiProperty({
    required: true,
    example: '30622f0c-06a9-44c4-be11-4e12f41e5191',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ required: true, example: 200.0 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  sellingPrice: number;

  @ApiProperty({ required: true, example: 100 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  stockLevel: number;

  @ApiProperty({ required: true, example: '2022-06-07' })
  @IsDate()
  @IsNotEmpty()
  expirationDate: Date;
}
