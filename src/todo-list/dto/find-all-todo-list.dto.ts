import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BASE_LIMIT, DEFAULT_PAGE } from 'src/common/constants';

export class FindAllTodoListDto {
  @ApiProperty({
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  page: number = DEFAULT_PAGE;

  @ApiProperty({
    example: 20,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  limit: number = BASE_LIMIT;
}
