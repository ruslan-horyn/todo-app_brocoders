import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
