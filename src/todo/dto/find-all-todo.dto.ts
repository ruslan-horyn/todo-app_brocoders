import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllTodoDto {
  @ApiProperty({
    example: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  todoListId: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  page: number;

  @ApiProperty({
    example: 20,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  limit: number;
}
