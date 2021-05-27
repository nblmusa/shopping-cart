import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Length(3, 255)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(3, 255)
  description?: string;
}
