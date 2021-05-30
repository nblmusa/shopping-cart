import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ required: true, example: 'Food' })
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({ required: true, example: 'Groceries' })
  @IsNotEmpty()
  @Length(3, 255)
  description: string;
}
