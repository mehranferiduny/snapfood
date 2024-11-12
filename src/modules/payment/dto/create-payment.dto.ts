import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreatePaymentDto {
  @ApiProperty()
  addresId:number
  @ApiPropertyOptional()
  @IsString()
  discription?:string
}
