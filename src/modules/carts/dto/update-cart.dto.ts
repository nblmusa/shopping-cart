import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
