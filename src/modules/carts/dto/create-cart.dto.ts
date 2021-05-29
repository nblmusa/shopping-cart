import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateCartDto {
  @ApiProperty({
    required: true,
    example: '30622f0c-06a9-44c4-be11-4e12f41e5191',
  })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @Optional()
  quantity: number;

  userId: string;
}
