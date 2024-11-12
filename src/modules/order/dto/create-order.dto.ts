import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateOrderDto {
  @ApiProperty()
  addresId:number
  @ApiPropertyOptional()
  @IsString()
  discription:string
}


